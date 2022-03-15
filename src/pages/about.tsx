import { NextPage } from "next";
import { Header } from "../components/header";

const About: NextPage = () => {
  return (
    <div>
      <Header title="About" />
      <main className="content">
        <h2>About</h2>
        <p>
          Coding Rules is a collection of rules that will help you write more
          robust, more maintainable code. Although the site is pretty new and
          only has a few rules, we aim to collect every useful rule there is!
        </p>
        <h2>Contributing</h2>
        <p>Contributions are appreciated ! You can:</p>
        <ul>
          <li>Add a new rule</li>
          <li>
            Improve an existing rule: improve the wording, add examples...
          </li>
          <li>Discuss existing rules</li>
          <li>Improve the website</li>
          <li>Anything else you want!</li>
        </ul>
        <p>
          Everything happens on the GitHub repo:{" "}
          <a href="https://github.com/n-e/codingrules.dev">
            n-e/codingrules.dev
          </a>
          . Feel free to create an issue or a pull request.{" "}
          <p>
            If you want to contribute to the rules, have a look in the{" "}
            <a href="https://github.com/n-e/codingrules.dev/tree/main/rules">
              rules
            </a>{" "}
            folder.
          </p>
        </p>
        <h2>Sharing</h2>
        <p>
          The rules are licensed under the{" "}
          <a href="https://creativecommons.org/licenses/by-sa/4.0/">
            CC BY-SA 4.0
          </a>{" "}
          license. You can share and adapt them as long as you follow the terms
          of the license, which mainly means that you should do that with the
          same license, credit the authors and link to this website.
        </p>
      </main>
    </div>
  );
};

export default About;
