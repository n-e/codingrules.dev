import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { Header } from "../components/header";
import { FullRule, listFullRules } from "../utils/rules";

// import { className } from "./index.module.css";

interface Props {
  rules: FullRule[];
}

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  return {
    props: {
      rules: await listFullRules(),
    },
  };
};

const Home: NextPage<Props> = ({ rules }) => {
  return (
    <div>
      <Header title={null} />
      {rules.map((r) => (
        <Link href={"/rule-" + r.id} key={r.title}>
          <a className="rule">
            <h2>
              <span>Rule {r.id}: </span>
              {r.title}
            </h2>
            <div dangerouslySetInnerHTML={{ __html: r.summary }}></div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Home;
