import Head from "next/head";
import Link from "next/link";
import { FunctionComponent } from "react";

export const Header: FunctionComponent<{ title: string | null }> = ({
  title,
}) => {
  return (
    <>
      <Head>
        <title>{title ? title + " - " : ""}Coding Rules</title>
      </Head>
      <header>
        <h1>
          <Link href="/">Coding Rules</Link>
        </h1>
        <div>Rules for writing robust, maintainable code</div>

        <ul>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contributing">Contributing</Link>
          </li>
        </ul>
      </header>
    </>
  );
};
