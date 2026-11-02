# Changes since publishing

> **Last checked:** 2 November 2026

OpenAI changes Codex plans, prices, usage limits, and models often. This page tracks what has changed since the book was published, so you can check the current situation before you start the projects in this volume.

All prices are in US dollars per month. Local prices, taxes, and availability vary by country. Always confirm the details on OpenAI's own pages before you buy:

- [Codex pricing](https://chatgpt.com/codex/pricing/)
- [Codex models](https://developers.openai.com/codex/models)
- [Your Codex usage dashboard](https://chatgpt.com/codex/settings/usage)

## Which ChatGPT plan do you need?

The book says:

> ChatGPT Free and Go include limited trial access to Codex, which is enough to try it but not to complete the projects in this volume. I recommend ChatGPT Plus or higher.

That recommendation still stands. As of 2 November 2026, Free and Go only include Codex in the ChatGPT desktop app, using the smallest model (GPT-6 Luna). They don't include the Codex CLI, the IDE extension, or Codex on the web. They also don't let you buy extra credits when you hit a limit, so you'd have to stop mid-project and wait for a reset.

ChatGPT Plus is the cheapest plan that gives you everything the projects in this volume use.

| Plan | Price | Codex access | Good enough for this volume? |
|---|---|---|---|
| Free | $0 | Desktop app only, GPT-6 Luna at Standard speed (subject to rollout). No CLI or IDE extension. No extra credits. | No. Enough to try Codex. |
| Go | $8 | Same as Free, with more usage. No extra credits. | No. Enough for small experiments. |
| **Plus** | **$20** | Desktop app, web, CLI, IDE extension, and iOS. All current models, including GPT-6 Astra and GPT-6.1 Sol. You can buy credits if you hit a limit. | **Yes. Recommended.** |
| Pro | $100, $200, or $500 | Everything in Plus with much higher usage. Pro plans currently have no five-hour limit, only weekly limits. Only Pro $500 includes GPT-6 Astra Ultrafast. | Yes, for heavy daily use. |
| Business | $20 per user (annual) or $25 (monthly) | Same per-seat usage as Plus, plus admin controls and team integrations. Premium seats ($100/$125) give 5x usage. | Yes, if your employer provides it. |
| Enterprise / Edu | Custom | Depends on your organization's settings. Your admin may need to enable some models. | Usually. Check with your admin. |
| API key (no plan) | Pay per token | CLI, SDK, and IDE extension at standard API prices. No five-hour or weekly limits, but every request costs money. | Yes, if you monitor your spend. |

### Usage limits on Plus

Plus limits are measured in a rolling five-hour window, with weekly limits on top. OpenAI publishes the following approximate ranges of local messages per five hours. The wide ranges are because large tasks use much more of your allowance than small ones.

| Model | Approximate messages per 5 hours (Plus) |
|---|---|
| GPT-6 Astra | 5–45 |
| GPT-6.1 Sol | 15–160 |
| GPT-6 Sol | 15–150 |
| GPT-6 Luna | 350–3,000 |

To check how much of your allowance is left:

- Visit the [Codex usage dashboard](https://chatgpt.com/codex/settings/usage).
- In the Codex CLI, enter `/status`.

If you hit a limit on Plus, you can wait for the reset, buy credits, or switch to a cheaper model, as described in the next section.

## Choosing a model

Codex lets you choose which model works on your task. More capable models produce better results on hard problems but use up your allowance much faster. For the projects in this volume, start with **GPT-6.1 Sol**, which is OpenAI's recommended replacement for GPT-5.5 on paid plans.

| Model | Model ID | Best for | Credits per 1M tokens (input / output) | Available on |
|---|---|---|---|---|
| GPT-6 Astra | `gpt-6-astra` | The hardest end-to-end tasks that need sustained reasoning and judgment. | 250 / 1,250 | Plus and higher |
| **GPT-6.1 Sol** | `gpt-6.1-sol` | **Recommended default.** Near-Astra performance on complex coding at a much lower cost. Default context window of 500,000 tokens in Codex. | 50 / 250 | Plus and higher |
| GPT-6.1 Terra | `gpt-6.1-terra` | Clear writing, understanding images and screenshots, and computer use. Requires Codex CLI 0.159.0 or later. Not in the IDE extension. | See pricing page | Plus and higher |
| GPT-6 Sol | `gpt-6-sol` | The previous Sol model. Use GPT-6.1 Sol instead unless you have a reason not to. | 50 / 250 | Plus and higher |
| GPT-6 Luna | `gpt-6-luna` | Focused, repetitive tasks such as small edits, extraction, and summaries. Fastest and cheapest. | 2.5 / 12.5 | All plans, including Free and Go |

Some practical advice for working through this volume:

- **Use GPT-6.1 Sol for most of your work.** It gives the best balance of quality and usage.
- **Switch to GPT-6 Luna for simple, repetitive changes**, such as renaming, formatting, or generating boilerplate. It uses about one-twentieth of the allowance that Sol uses.
- **Save GPT-6 Astra for steps where Sol gets stuck.** It uses about five times the allowance of Sol, so on Plus a couple of large Astra tasks can use up a whole five-hour window.
- **Start with the default reasoning effort.** OpenAI suggests starting with High for Luna and Light (`low` in configuration) for Astra, then increasing it only if the task needs more planning.

### How to change the model

- **Desktop app or IDE extension:** use the model and reasoning control beneath the message box.
- **Codex CLI, during a session:** enter `/model`, then choose a model and reasoning effort.
- **Codex CLI, at startup:** run `codex -m gpt-6.1-sol`.
- **As your default:** add the following line to your `config.toml` file:

```toml
model = "gpt-6.1-sol"
```

### Retired models

If the book or an older tutorial mentions one of these models, replace it with a current one.

| Model | Status (when signed in with ChatGPT) | Replace with |
|---|---|---|
| `gpt-5.5` | Retired on 14 October 2026 | `gpt-6.1-sol` on Plus and higher, `gpt-6-luna` on Free and Go |
| `gpt-5.4` | Retired on 31 August 2026 | `gpt-6-sol` or `gpt-6.1-sol` |
| `gpt-5.4-mini` | Retired on 31 August 2026 | `gpt-6-luna` |
| `gpt-5.3-codex-spark` | Retired on 14 September 2026 | Any current model |
| `gpt-5.2`, `gpt-5.3-codex` | Deprecated | Any current model |

These retirements only affect Codex when you sign in with your ChatGPT account. If you use Codex with an API key, older models such as GPT-5.5 are still available through the OpenAI API.
