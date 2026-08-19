import { NextRequest, NextResponse } from "next/server";
import loadStytch from "@/lib/loadStytch";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const response = NextResponse.next();
  const session = request.cookies.get("stytch_session");

  if (typeof session?.value !== "string") {
    if (request.nextUrl.pathname === "/") {
      return response;
    }

    return NextResponse.redirect(new URL("/signin", request.url));
  }

  const stytchClient = loadStytch();

  try {
    await stytchClient.sessions.authenticate({
      session_duration_minutes: 527040,
      session_token: session.value,
    });

    return response;
  } catch {
    await stytchClient.sessions.revoke({
      session_token: session.value,
    });

    if (request.nextUrl.pathname === "/") {
      return response;
    }

    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

export const config = {
  // icon.png などの metadata ルートも除外する。favicon.ico しか
  // 挙げていなかったため、未ログイン時に /signin へ飛ばされて
  // アイコンの代わりにサインイン画面の HTML が返っていた。
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|opengraph-image|twitter-image|robots.txt|sitemap.xml|authenticate|signin|signout).*)",
  ],
};
