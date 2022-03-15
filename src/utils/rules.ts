import assert from "assert";
import { readdir, readFile } from "fs/promises";
import hljs from "highlight.js";
import MarkdownIt from "markdown-it";
import { cwd } from "process";

export interface RuleMetadata {
  id: number;

  /** the filename without the folder */
  filename: string;
}

export interface RuleData {
  title: string;
  summary: string;
  details: { title: string; text: string }[];
}

export interface FullRule extends RuleData, RuleMetadata {}

const rulesDir = cwd() + "/rules";

export const listRules = async () => {
  const filenames = await readdir(rulesDir);

  const re = /^([0-9]+)\.md$/;
  return filenames.flatMap((filename) => {
    const match = re.exec(filename);
    if (!match) return [];
    else return [{ id: parseInt(match[0]), filename }];
  });
};

export const getRuleByFileName = async (filename: string) => {
  const f = await readFile(rulesDir + "/" + filename, { encoding: "utf-8" });
  return parseRule(f);
};

export const listFullRules = async (): Promise<FullRule[]> => {
  const rules = await listRules();

  return Promise.all(
    rules.map(async (r) => {
      const fr = await getRuleByFileName(r.filename);
      return { ...r, ...fr };
    })
  );
};

export const parseRule = (rule: string): RuleData => {
  const breakToken = "---- BRBRBR ----";

  let ruleTitle: string | null = null;
  const detailsTitles: string[] = [];

  const md = MarkdownIt({
    highlight: (str, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch {}
      }

      return ""; // use external default escaping
    },
  });
  let skip = false;
  md.renderer.rules.heading_open = function (tokens, idx) {
    const headingOpen = tokens[idx];
    const headingText = tokens[idx + 1].content;
    switch (headingOpen.tag) {
      case "h1":
        assert(
          ruleTitle === null,
          "There should be only one h1 (# title), for the rule title"
        );
        skip = true;
        ruleTitle = headingText;
        return "";
      case "h2":
        skip = true;
        detailsTitles.push(headingText);
        return breakToken;
      default:
        return "<" + headingOpen.tag + ">";
    }
  };

  const ogText = md.renderer.rules.text;
  md.renderer.rules.text = (...args) => {
    return skip ? "" : ogText!(...args);
  };

  md.renderer.rules.heading_close = function (tokens, idx) {
    const headingClose = tokens[idx];

    if (skip) {
      skip = false;
      return "";
    } else return "<" + headingClose.tag + ">";
  };

  const rendered = md.render(rule);

  const split = rendered.split(breakToken);

  assert(
    ruleTitle,
    "Rule should contain a heading (# heading) with the rule name"
  );

  return {
    title: ruleTitle,
    summary: split[0],
    details: split
      .slice(1)
      .map((s, i) => ({ title: detailsTitles[i], text: s })),
  };
};
