import { useAuthenticator } from "@aws-amplify/ui-react";
import Link from "next/link";
import Button from "./button";

export default function NavBar() {
  const { user, signOut } = useAuthenticator((context) => [context.user]);

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
        </ul>
      </nav>
      {user ? (
        <>
          <p>{user.username}</p>
          <Button onClick={signOut}>Sign out</Button>
        </>
      ) : null}
    </>
  );
}
