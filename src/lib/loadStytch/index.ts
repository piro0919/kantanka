import { Client, envs } from "stytch";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
let client: Client;

/*
loadStytch initializes the Stytch Backend SDK using your project's id and secret. The Backend SDK can be used
on any code paths that run server side. In a Next.js app that typically means in getServerSideProps and API routes.

In this example, we use the Backend SDK in getServerSideProps for the protected page /profile which can only be viewed if the user has an active Stytch session.
*/
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const loadStytch = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (!client) {
    client = new Client({
      env: process.env.STYTCH_PROJECT_ENV === "live" ? envs.live : envs.test,
      project_id: process.env.STYTCH_PROJECT_ID || "",
      secret: process.env.STYTCH_SECRET || "",
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return client;
};

export default loadStytch;
