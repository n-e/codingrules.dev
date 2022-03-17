import clsx from "clsx";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";

export const Header: FunctionComponent<{ title: string | null }> = ({
  title,
}) => {
  const { pathname } = useRouter();
  return (
    <>
      <Head>
        <title>{title ? title + " - " : ""}Coding Rules</title>
        <link
          rel="icon"
          type="image/png"
          href="https://www.codingrules.dev/favicon.ico"
        ></link>
      </Head>
      <header>
        <h1>
          <Link href="/">Coding Rules</Link>
        </h1>
        <div>Rules for writing robust, maintainable code</div>

        <ul>
          <li>
            <Link href="/">
              <a className={clsx(pathname === "/" && "currentPage")}>Rules</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a className={clsx(pathname === "/about" && "currentPage")}>
                About/Contributing
              </a>
            </Link>
          </li>
          <li>
            <Link href="https://twitter.com/coding_rules">
              <a>Twitter</a>
            </Link>
          </li>
          <li>
            <Link href="https://github.com/n-e/codingrules.dev">
              <a>GitHub</a>
            </Link>
          </li>
        </ul>
      </header>
    </>
  );
};
