# AI Agent App

[![Live Demo](https://img.shields.io/badge/demo-live-2ea44f?logo=vercel&logoColor=white)](https://junyao-retail-banking-cash-distribu.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org)
[![Python](https://img.shields.io/badge/Python-3.12-3776AB?logo=python&logoColor=white)](https://www.python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?logo=postgresql&logoColor=white)](https://neon.tech)
[![Deployed on Vercel](https://img.shields.io/badge/deployed%20on-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com)

**An AI agent that reads a real multi-table database, writes its own SQL against it, and answers business questions in plain English — with a table, a chart, or a diagram, whichever actually fits the question.**

**🔗 Live demo:** [junyao-retail-banking-cash-distribu.vercel.app](https://junyao-retail-banking-cash-distribu.vercel.app/)

Ask it something a single query can't answer and it works out which tables to join, writes the SQL, runs it, and explains what came back in business terms instead of handing you a grid of numbers. Every layer — backend, frontend, database, deployment — is genuinely wired together and live, not stubbed out.

<p align="center">
  <img src="docs/images/demo-01.png" alt="CashFlow Sentinel landing page" width="49%">
  <img src="docs/images/demo-02.png" alt="CashFlow Sentinel chat answering with a bar chart" width="49%">
</p>

## What ships by default

Ask a question in plain English and the agent:

1. Reads a compressed, LLM-tuned description of the database schema — never a raw data dump
2. Writes its own SQL and runs it inside a transaction that is **always rolled back**, so read-only is a property of the transaction, not a keyword blacklist
3. Picks how to answer: a **table** when you need the numbers, a **chart** when the shape of the numbers is the point, a **diagram** when the answer is about how something flows
4. Explains the result in business language, and can show you the SQL and its own reasoning on request

```mermaid
flowchart LR
    U["Question,\nplain English"] --> A[Agent]
    A -->|reads| S[(DB schema)]
    A -->|writes + runs| Q[Read-only SQL]
    Q --> A
    A -->|table, chart,\nor diagram| U
```

The mapping between a trigger phrase in the prompt and the render block it produces is a **contract checked in both directions** — a mismatch fails the build instead of shipping a chart icon over a paragraph of prose.

## Built on

| Layer | Stack |
| :--- | :--- |
| Backend | Python, FastAPI, [Strands Agents SDK](https://github.com/strands-agents/sdk-python) |
| Frontend | TypeScript, Next.js, deployed on Vercel |
| Database | PostgreSQL ([Neon](https://neon.tech)) — the same schema locally and in production, no SQLite fallback to drift from it |
| Model | OpenAI, Anthropic, Google Gemini, or AWS Bedrock — a single environment variable, no rebuild |

## Running it locally

```bash
cp .env.example .env        # fill in exactly one LLM provider's key, plus the database
mise run inst                # install Python (uv) and Node (pnpm) dependencies
mise run dev                 # Next.js on :3000, FastAPI on :8000
```

Open `localhost:3000` and start asking questions.
