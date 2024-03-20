import Authenticate, { AuthenticateProps } from "@/components/Authenticate";
import prisma from "@/lib/prisma";

export default function Page(): JSX.Element {
  const createUser: AuthenticateProps["createUser"] = async ({ userId }) => {
    "use server";

    await prisma.user.create({
      data: {
        stytchUserId: userId,
      },
    });
  };
  const findUser: AuthenticateProps["findUser"] = async ({ userId }) => {
    "use server";

    const user = await prisma.user.findUnique({
      where: {
        stytchUserId: userId,
      },
    });

    return !!user;
  };

  return <Authenticate createUser={createUser} findUser={findUser} />;
}
