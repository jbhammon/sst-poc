import NavBar from "@/components/nav-bar";
import "@/styles/globals.css";
import { Authenticator } from "@aws-amplify/ui-react";
import { Hub } from "aws-amplify";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import configAmplify from "../amplify.config";

export default function App({ Component, pageProps }: AppProps) {
  configAmplify();
  const router = useRouter();
  Hub.listen("auth", (data) => {
    switch (data.payload.event) {
      // When a user signs out we reload the page they're on. Each page is
      // responsible for routing away unauth'ed users if need be
      case "signOut":
        router.reload();
    }
  });

  return (
    <Authenticator.Provider>
      <NavBar />
      <Component {...pageProps} />
    </Authenticator.Provider>
  );
}
