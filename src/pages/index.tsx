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
              <span className="ruleNum">Rule {r.id}: </span>
              {r.title}
            </h2>
            <div className="ruleContents">
              <div dangerouslySetInnerHTML={{ __html: r.summary }}></div>
              <div className="ruleLink">
                <span className="likeALink">
                  {r.details.length}{" "}
                  {r.details.length >= 2 ? "examples" : "example"}
                </span>
              </div>
            </div>
          </a>
        </Link>
      ))}
      <div className="footerLink">
        You&apos;ve seen all the rules.{" "}
        <Link href="/about">
          <a>Contribute a new one?</a>
        </Link>
      </div>
    </div>
  );
};

export default Home;
