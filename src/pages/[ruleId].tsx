import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { resetIdCounter, Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Header } from "../components/header";
import { FullRule, listFullRules, listRules } from "../utils/rules";
import css from "./[ruleId].module.css";
interface Props {
  rule: FullRule;
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const rules = await listRules();
  return {
    paths: rules.map((r) => ({
      params: { ruleId: "rule-" + r.id },
    })),
    fallback: false, // 404 when asking for a rule not in paths
  };
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  // That's unnecessarily slow but for now we don't have too many rules + this is run at build-time
  const rules = await listFullRules();

  const ruleId = ctx.params?.ruleId;
  if (!ruleId || typeof ruleId !== "string" || !ruleId.startsWith("rule-"))
    return { notFound: true };

  const ruleIdInt = parseInt(ruleId.split("-")[1], 10);

  const rule = rules.find((r) => r.id === ruleIdInt);
  if (!rule) return { notFound: true };

  return {
    props: { rule },
  };
};

const Rule: NextPage<Props> = ({ rule }) => {
  // TODO: apparently there is a matching problem between ssr / client-side
  resetIdCounter();
  const textTitle = `Rule ${rule.id}: ${rule.title}`;
  return (
    <div className={css.ruleId}>
      <Head>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@coding_rules" />
        <meta name="og:title" content={textTitle} />
        <meta
          name="og:image"
          content={"https://www.codingrules.dev/logo-256.png"}
        />
        <meta
          name="twitter:image"
          content={"https://www.codingrules.dev/logo-256.png"}
        />
        <meta name="og:type" content="article" />
        <meta
          name="og:url"
          content={"https://www.codingrules.dev/rule-" + rule.id}
        />
        <meta
          name="og:description"
          content={rule.summary.replace(/<br>/g, "\n\n")}
        />
      </Head>
      <Header title={textTitle} />
      <div className="rule" key={rule.title}>
        <h2>
          <span className="ruleNum">Rule {rule.id}: </span>
          {rule.title}
        </h2>
        <div dangerouslySetInnerHTML={{ __html: rule.summary }}></div>
        <Tabs>
          <TabList>
            {rule.details.map((r) => (
              <Tab key={r.title}>{r.title}</Tab>
            ))}
          </TabList>

          {rule.details.map((d) => (
            <TabPanel key={d.title}>
              <h3>{d.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: d.text }}></div>
            </TabPanel>
          ))}
        </Tabs>
      </div>
      <div className="footerLink">
        <Link href="/">
          <a>See all the rules</a>
        </Link>
      </div>
    </div>
  );
};

export default Rule;
