> **A free bonus online-only guide for *OpenAI Codex Visual Bible*, not included in the print edition**

> **[FIGURE PLACEHOLDER: Hero image]**
> **File:** `Bonus-Chapter-Beyond-Codex-Hero.png`
> **Alt text:** Beyond Codex: five coding assistants arranged around a laptop
> **Purpose:** Title image for the bonus guide.
> **Image prompt:** A clean, friendly flat-style illustration for a beginner's book. In the center, a laptop showing a simple website being built. Around it, five distinct but unbranded terminal-and-chat windows, each with a small icon (a blue hexagon, an orange spark, a rainbow prism, a wind-swept flame, a whale). A soft pastel background. No real logos, no readable text except the title "Beyond Codex". Wide landscape format, 16:9.
<!-- ![Beyond Codex](Bonus-Chapter-Beyond-Codex-Hero.png) -->

- [Introduction](#introduction)
- [Chapter 1: Comparing Codex to Claude Code](#chapter-1-comparing-codex-to-claude-code)
  - [What makes each one distinct](#what-makes-each-one-distinct)
  - [Same idea, different name](#same-idea-different-name)
  - [Cost and plans](#cost-and-plans)
  - [Who is actually using which one](#who-is-actually-using-which-one)
  - [Try it now](#try-it-now)
    - [Check the result](#check-the-result)
- [Chapter 2: Google Antigravity as a backup coding assistant](#chapter-2-google-antigravity-as-a-backup-coding-assistant)
  - [What makes it distinct](#what-makes-it-distinct)
  - [Weighing it against Codex and Claude Code](#weighing-it-against-codex-and-claude-code)
  - [Cost and how to sign up](#cost-and-how-to-sign-up)
  - [Try it now](#try-it-now-1)
    - [Check the result](#check-the-result-1)
- [Chapter 3: Mistral Vibe as an EU-based coding assistant](#chapter-3-mistral-vibe-as-an-eu-based-coding-assistant)
  - [What makes it distinct](#what-makes-it-distinct-1)
  - [Weighing it against Codex and Claude Code](#weighing-it-against-codex-and-claude-code-1)
  - [Cost and how to sign up](#cost-and-how-to-sign-up-1)
  - [Try it now](#try-it-now-2)
    - [Check the result](#check-the-result-2)
- [Chapter 4: Qwen Code, Kimi Code, and DeepSeek as low-cost coding assistants](#chapter-4-qwen-code-kimi-code-and-deepseek-as-low-cost-coding-assistants)
  - [What makes them distinct](#what-makes-them-distinct)
  - [Weighing them against Codex and Claude Code](#weighing-them-against-codex-and-claude-code)
  - [Cost and how to sign up](#cost-and-how-to-sign-up-2)
  - [Try it now](#try-it-now-3)
    - [Check the result](#check-the-result-3)
- [Chapter 5: Choosing the right coding assistant for the job](#chapter-5-choosing-the-right-coding-assistant-for-the-job)
  - [How to trial another assistant safely](#how-to-trial-another-assistant-safely)
  - [Other names you will meet](#other-names-you-will-meet)
  - [Comparison of popularity of coding assistants](#comparison-of-popularity-of-coding-assistants)
  - [Try it now](#try-it-now-4)

# Introduction

In *OpenAI Codex Visual Bible*, *Book 1* to *Book 3* taught you to work with Codex. This bonus book adds one more skill: knowing when a different coding assistant is the better tool for a specific job, or a backup when Codex is unavailable, over its usage limit, or too expensive for what you want to do.

You will meet four alternatives:
1. **Anthropic Claude Code** is the assistant you are most likely to hear mentioned alongside Codex. It is the closest like-for-like rival.
2. **Google Antigravity** is Google's coding platform, which replaced Gemini CLI in 2026. It works with Google's Gemini models and can run several agents at once.
3. **Mistral Vibe**, from the French company Mistral AI, matters if you care about European companies and data rules, or want an open-source tool.
4. **Qwen Code**, **Kimi Code**, and **DeepSeek** trade a smaller support ecosystem for a lower price, with a privacy trade-off worth understanding first.

This guide is not a recommendation to leave Codex. It is also not a full buyer's guide to every coding assistant on the market. Treat it as a short field guide: enough to recognize each tool by name, know its one or two strongest uses, and decide for yourself when it earns a place next to Codex on your computer.

Everything you learned in Book 1 still applies. Whichever assistant you use, you write a brief, ask for one small slice at a time, review the changes, test, and save working versions with Git. Those habits work with every tool in this guide, and they are what protect you when an assistant gets something wrong.

> **Watch out:** Coding assistants change faster than almost any other kind of software. Plan names, prices, model names, and even whole products come and go. Google replaced one of its own coding tools in 2026, only months after many people had learned it. Treat every name, price, and limit in this guide as a snapshot, and check the official pages linked in each chapter before you sign up.

# Chapter 1: Comparing Codex to Claude Code

Claude Code is the coding assistant you are most likely to hear mentioned alongside Codex. Both are coding agents: you give them access to a project folder, describe what you want, and they read files, edit them, run commands, and report back. The differences show up in where each one is strongest and how you pay for it.

## What makes each one distinct

OpenAI built Codex into the ChatGPT ecosystem. If you already use ChatGPT, you can use Codex with the same account in the ChatGPT desktop app, in a code editor, on the web, and from the command line. It is a natural step up from the research and writing work in *ChatGPT Visual Bible*, and it shares the plan you already pay for.

Anthropic built Claude Code first for professional software developers, and it has a reputation for careful, step-by-step reasoning about large codebases. It started life in the terminal, and many of its fans still prefer working there. Anthropic has since made it available in more places, including a desktop app and a code editor extension.

For the websites, games, and small tools in this book, both are capable. The main differences are habits and ecosystem, not whether one can do the job.

> **[FIGURE PLACEHOLDER: Codex versus Claude Code]**
> **File:** `Bonus-Chapter-Beyond-Codex-Compare.png`
> **Alt text:** Codex compared to Claude Code across two axes: ecosystem and strengths
> **Purpose:** One conceptual picture showing that the two tools do the same job but sit in different ecosystems.
> **Image prompt:** A simple flat infographic for beginners. Two large panels side by side. Left panel labeled "Codex" with a ChatGPT-style chat bubble and a laptop; right panel labeled "Claude Code" with a terminal window and a laptop. Between them, a large shared area labeled "Both can: read files, edit code, run tests, explain changes". Below each panel, two short captions: "Best if you already use ChatGPT" and "Best if you prefer working in a terminal". No real logos. Clean pastel palette, large readable text, landscape 16:9.
<!-- ![Codex compared to Claude Code across two axes: ecosystem and strengths](Bonus-Chapter-Beyond-Codex-Compare.png) -->

## Same idea, different name

Codex and Claude Code often solve the same problem with a feature that carries a different name. The table below maps the closest matches.

| What you want to do | Codex calls it | Claude Code calls it |
| --- | --- | --- |
| Give the assistant standing instructions for a project | `AGENTS.md` | `CLAUDE.md` |
| Use it in a desktop app | Codex in the ChatGPT desktop app | Claude Code in the Claude desktop app |
| Use it from a terminal | Codex CLI | Claude Code |
| Use it inside a code editor | Codex IDE extension | Claude Code editor extensions |
| Run a task in the cloud while you do something else | Cloud tasks | Claude Code on the web |
| Limit what the assistant may change or run | Sandbox and approval policy | Permissions and permission modes |
| Look at a plan before any files change | Ask for a plan first | Plan mode |
| Package a reusable procedure | Skills | Skills |
| Install an extension | Plugins | Plugins |
| Connect to external systems | MCP | MCP |

> **Good practice:** Many of your Book 1 habits transfer directly. If a tool reads a different instructions file (`CLAUDE.md` instead of `AGENTS.md`), copy your rules into it. The rules you wrote in plain language work in both.

## Cost and plans

Both companies sell their coding assistant as part of a subscription, with extra usage available by paying for the underlying model by the token. Codex is included in paid ChatGPT plans, and Free and Go include only a limited trial. Claude Code is included in paid Claude plans and has no free tier of its own.

Here is the official pricing page for each:

- **Codex / ChatGPT**: [openai.com/chatgpt/pricing](https://openai.com/chatgpt/pricing) covers Free, Go, Plus, and Pro. A separate [Business pricing page](https://openai.com/business/chatgpt-pricing/) covers Business and Enterprise. Codex's own limits are explained on [developers.openai.com/codex/pricing](https://developers.openai.com/codex/pricing).
- **Claude Code / Claude**: [claude.com/pricing](https://claude.com/pricing) covers Pro, Max, Team, and Enterprise.

## Who is actually using which one

Popularity figures for coding assistants shift from month to month, so treat any specific number as a snapshot rather than a permanent ranking. The companies also count different things: weekly active developers, paid subscribers, or revenue.

OpenAI reported more than 4 million weekly active developers using Codex in April 2026, up from around 600,000 in January. Anthropic has not published an absolute user count for Claude Code, but said in May 2026 that Claude Code usage had roughly doubled since January. In professional surveys, Claude models are especially popular with people who write code for a living, while ChatGPT has the widest reach among beginners and casual users.

To summarize: Codex has the advantage if you already live in the ChatGPT world, and Claude Code has built a strong following among professional developers.

## Try it now

Send the same request to Codex and Claude Code. Use a new, empty folder for each tool so they can't see each other's work:

```
Create a single index.html file containing a simple tip calculator. The user enters a bill amount and a tip percentage, and the page shows the tip and the total. If the input is not a number, show a friendly message instead. Don't use any external libraries. Don't change any other files.
```

Open both results in your browser and compare them side by side before you decide which one you would keep.

### Check the result
- [ ] Did each assistant produce a page that works when you open it?
- [ ] Did both handle a bad input, such as the word "ten", without breaking?
- [ ] Which explanation of what it built was easier for you to follow?
- [ ] Which result would you rather keep building on?

Now let's look at Google's coding assistant as a third choice.

# Chapter 2: Google Antigravity as a backup coding assistant

Google's coding tools are worth a second look once you outgrow your Codex usage limits, especially if you already use Google's products. Think of Google Antigravity as a second opinion you keep on hand, not a replacement for the assistant you already trust.

## What makes it distinct

In 2026, Google replaced its earlier command-line tool, Gemini CLI, with **Antigravity**, a larger platform for working with coding agents. Antigravity comes as a desktop app and as a command-line tool, and both share the same underlying agent. Its headline idea is running several agents in the background at once, so a long task such as a big cleanup or a round of research doesn't tie up your session. It works with Google's Gemini models, which can read very large amounts of code and documents in one go.

> **[FIGURE PLACEHOLDER: Google Antigravity]**
> **File:** `Bonus-Chapter-Beyond-Codex-Antigravity.png`
> **Alt text:** Google Antigravity as a backup coding assistant, running several agents in the background
> **Purpose:** Show the "several agents at once" idea in a way beginners can grasp.
> **Image prompt:** A flat, friendly illustration. One person at a laptop in the center. Three small, simple robot-like helper icons floating around the laptop, each holding a different small task card ("Fix a bug", "Write tests", "Check the design"), connected by thin lines to one shared project folder icon. A rainbow-colored prism shape in the top corner to hint at Google without using a logo. Pastel palette, no readable brand names, landscape 16:9.
<!-- ![Google Antigravity as a backup coding assistant](Bonus-Chapter-Beyond-Codex-Antigravity.png) -->

> **Watch out:** Many online tutorials still teach Gemini CLI. For individual users, Gemini CLI stopped working on 18 June 2026, and Antigravity does not match it feature for feature. If a guide tells you to install Gemini CLI, check its date first. This is a good example of why this book teaches skills that outlast any one tool.

## Weighing it against Codex and Claude Code

Choosing between Codex, Claude Code, and Antigravity can feel a little like choosing between familiar soft drinks: all three do the core job well, and the right pick often comes down to which ecosystem you are already standing in. If you pay for a Google plan, use Google Cloud, or want several agents working in parallel, Antigravity is worth a trial.

## Cost and how to sign up

Antigravity is offered with a free tier tied to a Google account, alongside paid Google AI plans and Google Cloud options for businesses. Because most readers already have a Google account, signing up takes only a few minutes. Free limits change often, so check the current plan names and prices: [one.google.com/about/google-ai-plans](https://one.google.com/intl/en_us/about/google-ai-plans/)

> **Good practice:** Reach for Antigravity when you want to compare a second tool's answer to a hard problem, or when you have run out of Codex usage for the day.

> **Watch out:** Google's default privacy and data-handling settings differ from OpenAI's, including what Google may use to improve its models. Review the current settings before you let any assistant read a project that contains private information, the same habit Book 1 recommends for Codex.

## Try it now

Copy a small project you already built, such as the Guess My Number game from Book 1, into a new folder. Ask Antigravity to explain it without changing anything:

```
Read the files in this folder and explain in plain language what this project does and how to run it. List anything that looks incomplete, confusing, or risky. Don't change any files.
```

Then ask Codex the same question about the same folder and compare the two explanations.

### Check the result
- [ ] Did the assistant explain what the project does accurately?
- [ ] Did it find anything you had not already noticed?
- [ ] Did you confirm that no files were changed? (Check with `git status`.)

Now let's look at a European option.

# Chapter 3: Mistral Vibe as an EU-based coding assistant

If you work with clients or colleagues in Europe, or you simply prefer open-source tools, you will eventually hear the name Mistral. Mistral AI is a French company. In 2026 it renamed its consumer assistant from Le Chat to **Mistral Vibe**, and it also offers **Vibe CLI**, an open-source coding agent for your terminal.

## What makes it distinct

Mistral is headquartered in Paris. Its coding agent runs in the terminal and is powered by Mistral's **Devstral** family of coding models. Mistral releases several of its models as open weights, meaning any organization with the right technical skill can download and run them on its own hardware instead of sending code to Mistral's servers at all. The Vibe CLI is also open source, which means anyone can read exactly how it works.

> **[FIGURE PLACEHOLDER: Mistral Vibe]**
> **File:** `Bonus-Chapter-Beyond-Codex-Mistral.png`
> **Alt text:** Mistral Vibe as an EU-based, open-source coding assistant
> **Purpose:** Show the "open source and European" idea.
> **Image prompt:** A flat, friendly illustration. A laptop with a terminal window, and next to it a transparent glass box containing the same code and gears to suggest "open and inspectable". In the background, a simple outline map of Europe with a small pin on Paris and a ring of twelve small stars. A warm orange-and-sunset color palette. No real logos, no readable brand text. Landscape 16:9.
<!-- ![Mistral Vibe as an EU-based, open-source coding assistant](Bonus-Chapter-Beyond-Codex-Mistral.png) -->

## Weighing it against Codex and Claude Code

Mistral Vibe's ecosystem and feature set are smaller than those of Codex or Claude Code. What it offers instead is openness and a European home: an EU-based company, an open-source tool you can inspect, and models you can run yourself. That matters more to a privacy-minded or regulated organization than an extra built-in feature does.

> **Watch out:** Being an EU company does not automatically mean your code stays in the EU. Where data is processed can depend on the specific product and plan. If this matters to you, read Mistral's Trust Center and data-processing documents before you start.

## Cost and how to sign up

Vibe is included with Mistral's paid Pro and Team plans, and you can continue past the plan limits by paying for usage or bringing your own API key. If you or your organization also build software on top of Mistral's models directly, that use is billed separately as API access. Check this page for current plan names and prices: [mistral.ai/pricing](https://mistral.ai/pricing)

> **Good practice:** If your organization operates in the EU or handles the personal data of EU residents, ask your compliance or legal team whether Mistral's European hosting and open-source tools change what you are allowed to do with a coding assistant.

> **Learn more online:** New EU AI Act transparency rules took effect on August 2, 2026, requiring AI-generated content to be marked as artificial in most cases. See the European Commission's AI Act policy page at digital-strategy.ec.europa.eu for the current requirements and how they apply to general-purpose AI systems.

This European angle returns in *Chapter 4*, when we look at the opposite end of the spectrum: assistants where your code may travel to servers under very different rules.

## Try it now

Open a small code file you wrote, and ask Mistral Vibe and Codex the same question in a European language other than English, such as French or German:

```
Explain what this code does in French, in simple words for a beginner. Then suggest one small improvement, but don't change the file.
```

If you have a fluent speaker available, ask them to compare how natural each explanation sounds.

### Check the result
- [ ] Did both assistants answer in the requested language without switching back to English?
- [ ] Was the explanation technically correct when you compare it with the code?
- [ ] Did one response read more naturally than the other to a fluent speaker?
- [ ] Did you find where each provider says your code would be processed?

Now let's review the low-cost options.

# Chapter 4: Qwen Code, Kimi Code, and DeepSeek as low-cost coding assistants

Qwen Code, Kimi Code, and DeepSeek are the names you are most likely to encounter when someone mentions a cheap, surprisingly capable alternative to the assistants covered so far. All three come from Chinese technology companies, and all three are worth understanding, including the trade-off that comes with their low price.

## What makes them distinct

- **Qwen Code** comes from Alibaba. It is an open-source command-line coding agent built around Alibaba's Qwen models.
- **Kimi Code** comes from Moonshot AI. It is a command-line coding agent and subscription built around the Kimi models.
- **DeepSeek** is best known for its models, which many other coding tools can use when you connect them with an API key. DeepSeek is a model provider more than a polished coding application, so you usually use it through another tool.

All three compete aggressively on price, often charging a fraction of what OpenAI or Anthropic charge for comparable use. Each also releases open-weight versions of its models, meaning any organization can download and run them independently. All three release new versions frequently.

> **[FIGURE PLACEHOLDER: Low-cost coding assistants]**
> **File:** `Bonus-Chapter-Beyond-Codex-Low-Cost.png`
> **Alt text:** Qwen Code, Kimi Code, and DeepSeek as low-cost coding assistants, with a data-travel warning
> **Purpose:** Show the price advantage and the privacy trade-off together.
> **Image prompt:** A flat, friendly illustration split into two halves. Left half: three simple coding windows with small price tags showing a low number and a piggy bank, labeled "Low cost" and "Open weights". Right half: a laptop with a dotted arrow labeled "your code" leaving the screen, traveling across a globe to a distant server icon, with a small yellow caution sign on the path. Pastel palette, no real logos, no readable brand names. Landscape 16:9.
<!-- ![Qwen Code, Kimi Code, and DeepSeek as low-cost coding assistants](Bonus-Chapter-Beyond-Codex-Low-Cost.png) -->

## Weighing them against Codex and Claude Code

The appeal is real: low cost, openness, and rapid improvement. The trade-offs are real too. Their support ecosystems are smaller, their free offers change quickly, and the more serious concern is where your code goes. When you use these services through their hosted apps and APIs, your prompts and the code you share are processed on servers in China and fall under Chinese data law, including requirements that companies cooperate with government security requests. Several governments, including US federal agencies, have restricted the DeepSeek app on official devices for exactly this reason.

## Cost and how to sign up

Free offers change quickly in this part of the market. For example, Qwen Code's free sign-in tier reportedly ended in April 2026, and what remains is mainly paid plans, API keys, and running models yourself. Organizations with the technical resources can self-host an open-weight model on their own hardware or a Western cloud provider and avoid sending any code to Chinese servers at all, though that setup is outside the scope of this guide.

> **Watch out:** Do not send private code, customer data, passwords, API keys, or any other confidential or regulated information through the hosted Qwen, Kimi, or DeepSeek services. Once that data reaches a server in China, it falls under Chinese law rather than the privacy rules you may already follow for other tools. This same caution applies to any hosted AI service outside your own country whose data-handling rules you have not checked.

> **Watch out:** Install a coding assistant only by following the instructions on its official website or official GitHub page. Copycat packages and unofficial "desktop" versions exist for popular tools, and a fake one could steal the keys and files you give it. If a package name or an install command doesn't match the official page, don't run it.

These companies publish their pricing mainly on developer pages, because they expect their models to be used by connecting them to a coding tool with an API key, priced by the token:

- **Qwen Code**: [github.com/QwenLM/qwen-code](https://github.com/QwenLM/qwen-code) is the official project page. Alibaba's model pricing is at [alibabacloud.com/help/en/model-studio/model-pricing](https://www.alibabacloud.com/help/en/model-studio/model-pricing).
- **Kimi Code**: [platform.kimi.ai/docs/pricing](https://platform.kimi.ai/docs/pricing/chat-v1) has Moonshot AI's official developer pricing.
- **DeepSeek**: [api-docs.deepseek.com/quick_start/pricing](https://api-docs.deepseek.com/quick_start/pricing/) has DeepSeek's official API token prices. DeepSeek's chat app, at [chat.deepseek.com](https://chat.deepseek.com/), is free for personal use, but DeepSeek doesn't ship an official native desktop app for Windows or Mac. What circulates as "DeepSeek Desktop" is an unofficial community wrapper, so be careful if you choose to install it.

## Try it now

Give one of these tools a low-stakes task using a brand-new folder that contains no personal or confidential files, and no keys or passwords. Use the same prompt you sent to Codex in Chapter 1:

```
Create a single index.html file containing a simple to-do list. The user can add a task, tick it off, and delete it. Don't use any external libraries. Don't change any other files.
```

Compare the quality of the result with what Codex produces for the identical prompt.

### Check the result
- [ ] Did the assistant complete the task using only the free or low-cost option you chose?
- [ ] Was the quality close enough to Codex's to justify the cost difference for this kind of task?
- [ ] Did you confirm that the folder contained no confidential or regulated information?

Finally, let's compare all the coding assistants we've introduced and choose the ones best for your work.

# Chapter 5: Choosing the right coding assistant for the job

Codex should remain your default assistant in this book. Everything in this guide is about recognizing the handful of situations where a different tool serves you better, then returning to Codex for everything else. Use the matrix below as a quick reference the next time you are unsure which assistant to open.

| If you need | Consider first | Why |
| --- | --- | --- |
| A tool that fits what you already learned in this book | Codex | Same ChatGPT account, desktop app, and habits as Books 1 to 3 |
| A second opinion from a close rival, or a backup when you hit your Codex limit | Claude Code | The closest like-for-like alternative, with strong reasoning on large projects |
| Several agents working in parallel, or tight links with Google's tools | Google Antigravity | Multi-agent platform built around Gemini models and Google accounts |
| An open-source tool, or a European company | Mistral Vibe | Open-source CLI, open-weight models, and a Paris-based provider |
| The lowest possible cost, or models you can self-host | Qwen Code, Kimi Code, or DeepSeek | Aggressive pricing and open-weight availability |
| To work on private, client, or regulated code | Codex, Claude Code, or Antigravity under a paid or business plan, or Mistral after checking its data rules | Avoid hosted tools whose data-handling rules you have not confirmed |

> **[FIGURE PLACEHOLDER: Chooser flowchart]**
> **File:** `Bonus-Chapter-Beyond-Codex-Chooser.png`
> **Alt text:** A simple flowchart for choosing a coding assistant
> **Purpose:** A visual version of the matrix above for readers who prefer a decision path.
> **Image prompt:** A clean, simple flowchart for beginners with a start box "I need a coding assistant". Four yes/no questions leading to outcomes: "Is it private or regulated code?" → "Use a paid plan with a provider whose data rules you've checked"; "Do you want the lowest cost?" → "Try Qwen Code, Kimi Code, or DeepSeek on non-private code only"; "Do you want open source or a European company?" → "Mistral Vibe"; "Hit your Codex limit?" → "Try Claude Code or Google Antigravity"; default → "Stay with Codex". Rounded boxes, pastel colors, large readable text, landscape 16:9.
<!-- ![A simple flowchart for choosing a coding assistant](Bonus-Chapter-Beyond-Codex-Chooser.png) -->

## How to trial another assistant safely

Use these steps whenever you try a new coding assistant, so a surprising result never costs you work:

1. **Save your working version first.** Commit your project with Git before you let a new tool touch it.
2. **Work on a copy or a branch.** Copy the project folder, or create a new Git branch, so the original stays untouched.
3. **Keep secrets out.** Remove passwords, API keys, and personal files from the folder before you give it to any hosted tool.
4. **Ask for one small slice.** Use the same one-task-at-a-time habit from Book 1.
5. **Review the diff, test, and compare.** Check what changed, run the project, and compare with what Codex produced for the same request.
6. **Decide what to keep.** Merge the good changes. Discard the rest with a revert.

> **[FIGURE PLACEHOLDER: Safe trial workflow]**
> **File:** `Bonus-Chapter-Beyond-Codex-Safe-Trial.png`
> **Alt text:** The six steps for trialing another coding assistant safely
> **Purpose:** Reinforce the Book 1 safety habits in a single picture.
> **Image prompt:** A flat, friendly horizontal process diagram with six numbered steps connected by arrows: a floppy-disk icon ("Save"), two overlapping folders ("Copy"), a padlock ("No secrets"), a single small block ("One slice"), a magnifying glass over a list of changes ("Review"), and a check mark with an undo arrow ("Keep or revert"). Pastel palette, large readable labels, landscape 16:9.
<!-- ![The six steps for trialing another coding assistant safely](Bonus-Chapter-Beyond-Codex-Safe-Trial.png) -->

## Other names you will meet

You may also hear about other tools. They are worth recognizing, though this guide does not cover them in depth:

- **GitHub Copilot** is Microsoft's coding assistant, built into VS Code and GitHub. It started as code completion and now includes agent features.
- **Cursor** is a code editor built around AI, popular with professional developers.
- **OpenCode** is an open-source terminal tool that can connect to many different model providers.

## Comparison of popularity of coding assistants

These are reported figures, and they measure different things (weekly users, paid subscribers, or revenue), so don't compare the rows directly.

| Product | What has been reported | Notes |
| --- | --- | --- |
| Codex (OpenAI) | More than 4 million weekly active developers (April 2026) | Up from roughly 600,000 in January 2026 |
| Claude Code (Anthropic) | No absolute user count published | Anthropic said usage roughly doubled between January and May 2026 |
| GitHub Copilot (Microsoft) | About 4.7 million paid subscribers (January 2026) | Reported from Microsoft's earnings |
| Cursor (Anysphere) | About $2 billion annualized revenue (February 2026) | Reported by news outlets, not a user count |
| Google Antigravity | Not officially disclosed | |
| Mistral Vibe | Not officially disclosed | |
| Qwen Code, Kimi Code, DeepSeek | Not officially disclosed | |

Companies update these numbers every few months, and definitions such as "weekly active", "paid seat", and "business customer" aren't standardized across them.

## Try it now

Pick one real coding task from your week ahead, such as a small fix to a project you built in this book. Run it through the matrix in this chapter and choose an assistant based on the result. Follow the six safe-trial steps, and complete the task there instead of defaulting to whichever assistant you happen to have open.
