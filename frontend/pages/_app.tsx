import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Amplify } from "aws-amplify";
import config from "../amplify.config";

export default function App({ Component, pageProps }: AppProps) {
  Amplify.configure({
    Storage: {
      region: config.s3.REGION,
      bucket: config.s3.BUCKET,
    },
    API: {
      endpoints: [
        {
          name: "notes",
          endpoint: config.apiGateway.URL,
          region: config.apiGateway.REGION,
        },
      ],
    },
  });
  return <Component {...pageProps} />;
}
