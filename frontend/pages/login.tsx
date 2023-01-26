import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const { route } = useAuthenticator((context) => [context.route]);

  if (route === "authenticated") {
    // TODO add logic to go back either the previous screen or the home page
    router.replace("/");
  }

  return <Authenticator hideSignUp></Authenticator>;
}
