import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Hello world</h1>
        <div className="bg-purple-400">
          <p>Quick Tailwind example</p>
        </div>
        <Link href="/create-note">Create a new note</Link>
      </main>
    </>
  );
}
