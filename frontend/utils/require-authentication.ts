import configAmplify from "@/amplify.config";
import { withSSRContext } from "aws-amplify";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

/**
 * A higher-order function to use with getServerSideProps that will protect a
 * page from unauthenticated users.
 */
export default function requireAuthentication(gssp: GetServerSideProps) {
  return async (context: GetServerSidePropsContext) => {
    configAmplify();
    const { Auth } = withSSRContext(context);
    try {
      await Auth.currentAuthenticatedUser();
      return await gssp(context);
    } catch (err) {
      console.log("error, user not authenticated");
      // SSR redirect
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    }
  };
}
