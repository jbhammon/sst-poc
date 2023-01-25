import requireAuthentication from "@/utils/require-authentication";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (context) => {
    return {
      props: {},
    };
  }
);

export default function Protected() {
  return <h1>This is a protected page</h1>;
}
