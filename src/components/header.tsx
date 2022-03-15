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
        </ul>
      </header>
    </>
  );
};
