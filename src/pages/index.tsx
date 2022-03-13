import { readFileSync } from "fs";
import { readdir } from "fs/promises";
import MarkdownIt from "markdown-it";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { cwd } from "process";

interface Props {
  data: string[];
}

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const rulesDir = cwd() + "/rules";
  const rules = await readdir(rulesDir);
  const md = MarkdownIt();
  return {
    props: {
      data: rules.map((r) => {
        const f = readFileSync(rulesDir + "/" + r, { encoding: "utf-8" });
        return md.render(f);
      }),
    },
  };
};

const Home: NextPage<Props> = ({ data }) => {
  return (
    <div className="m-10">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {data.map((d) => (
        <div
          key={d}
          className="prose mx-auto"
          dangerouslySetInnerHTML={{ __html: d }}
        ></div>
      ))}
    </div>
  );
};

export default Home;
