import "@/styles/globals.css";
import { Authenticator } from "@aws-amplify/ui-react";
import type { AppProps } from "next/app";
import Link from "next/link";
import configAmplify from "../amplify.config";

export default function App({ Component, pageProps }: AppProps) {
  configAmplify();
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/create-note">Create Note</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/protected">Protected</Link>
          </li>
        </ul>
      </nav>
      <Component {...pageProps} />
    </>
  );
}
