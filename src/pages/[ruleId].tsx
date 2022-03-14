import { GetStaticPaths, GetStaticProps, NextPage } from "next";
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

  return (
    <div className={css.ruleId}>
      <Header title={null} />
      <div className="rule" key={rule.title}>
        <h2>
          <span>Rule {rule.id}: </span>
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
      <Link href="/">
        <a className={css.allTheRules}>See all the rules</a>
      </Link>
    </div>
  );
};

export default Rule;