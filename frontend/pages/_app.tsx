import "@/styles/globals.css";
import type { AppProps } from "next/app";
import configAmplify from "../amplify.config";

export default function App({ Component, pageProps }: AppProps) {
  configAmplify();
  return <Component {...pageProps} />;
}
