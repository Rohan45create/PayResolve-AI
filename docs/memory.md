# PayResolve — Project Memory

Living file. Read it at the start of every session (human or AI assistant) and update it at the end. Keep it short, current and factual. Record decisions and gotchas, not chat logs.

## How to use this file

- Start of session: read "Current status" and "Next up".
- During work: add to "Decisions" when you choose something non-obvious; add to "Gotchas" when something cost you time.
- End of session: update status, tick items, write the next concrete step.
- Never put secrets, tokens or credentials in this file.

## Project identity

- **Name:** PayResolve AI (working title)
- **Goal:** Merchant-side tool that investigates PayPal payment exceptions with a source-linked evidence graph and a live, tool-using AI investigator; humans approve every action.
- **Event:** PayPal AI Hackathon on Devpost (paypalaihackathon.devpost.com)
- **Deadline:** 12:00 pm PST, Thu 12 Nov 2026 (about 1:30 am IST, 13 Nov). Internal submit target: 12 Nov, 6:00 pm IST.
- **Feature freeze:** end of Tue 10 Nov.
- **Docs:** `prd.md` (what), `architecture.md` (how it is built), `phases.md` (when), `rules.md` (how we work).

## Stack (locked unless noted in Decisions)

- Backend: Java 21, Spring Boot 4.1.1 (Spring Framework 7, Jackson 3), Spring AI 2.0.x, Spring Security 7, PostgreSQL, Flyway, Maven
- Frontend: React 19, TypeScript strict, Vite, Tailwind CSS v4, TanStack Query, React Router, AG Grid Community, React Flow (`@xyflow/react`)
- Tests: JUnit 5, Testcontainers, WireMock, Vitest, Testing Library, Playwright (one smoke path)
- Hosting and tools: Render (API, UI, Postgres), Postman, ngrok or Cloudflare Tunnel for dev, GitHub Actions
- Sponsor prize targets: AG Grid, Render. Optional: Bryntum, APIMatic.

## Decisions log

| Date | Decision | Why |
|---|---|---|
| 2026-11-01 | Build PayResolve (payment exception investigation) | Real merchant pain, feasible Sandbox demo, defensible role for AI |
| 2026-11-01 | Rejected CartLock, fraud dashboard, seller-trust assistant | Narrower, more crowded, or not central to payments |
| 2026-11-02 | AI is a tool-calling investigator with read-only tools, not just a summarizer | Stronger fit for the "meaningful use of AI" and implementation criteria |
| 2026-11-02 | Rules engine detects; AI explains and proposes; human approves | Money safety and trust |
| 2026-11-02 | Modular monolith, one deployable | Speed with clean boundaries |
| 2026-11-02 | Evidence graph derived at read time, no graph DB | Simplicity |
| 2026-11-02 | No money-moving actions in v1 | Safety and scope |
| 2026-11-02 | Use synthetic, labelled dispute fixtures if the Sandbox Disputes API is not usable | Disputes testing may need extra scopes |
| 2026-11-02 | License: MIT | Standard, permissive open-source license required by hackathon |
| 2026-11-06 | Switched managed DB to Supabase free Postgres | Free tier, use Session pooler connection string, not Render Postgres. A GitHub Action keeps it active |
| 2026-11-07 | LLM: Google Gemini free tier via Spring AI | Zero cost, high rate limits on free tier, keep provider configurable by env vars |
| 2026-11-07 | Hosting: Render via hackathon credits | Paid tier using credits with free-plan fallback |
| 2026-11-07 | Backend Spring Boot version: 4.1.x | Project requirement is Spring Boot 4.1.x (repo currently at 3.4.2; fix in next step) |
| 2026-11-07 | Target partners & prizes | Use PayPal, APIMatic Context Plugin, AG Studio (AG Grid prize), Render, Postman. Skip Bryntum, Elastic, Zapier, Astropods, KERNEL, Channel3 |
| 2026-11-07 | Schedule & milestones | Today is 7 Nov. Feature freeze end of 10 Nov. Submit by 12 Nov 6:00 pm IST (hard deadline 12:00 pm PST, 12 Nov) |
| 2026-11-07 | Frontend integration status | Frontend is built by teammate and currently uses mock data and localStorage auth; will be wired to the backend API |
| 2026-11-07 | Frontend design verification & matching | Verified all 20 design PNG pairs against frontend routes. Redesigned landing, updated auth layout, matched all stat cards, evidence graph, audit log, benchmark, event inbox, demo shop, and UI states. Created /500 and /redirecting. Added dark mode toggle across app and 150ms / 0.97 scale transitions |

## Current status

Update this table as you go. Status: TODO, DOING, DONE, CUT.

| Area | Status | Notes |
|---|---|---|
| Docs (prd, architecture, phases, rules, memory) | DONE | Aligned with 7 Nov decisions |
| Repo, CI, scaffolds | DONE | Backend (Boot 3.4.2 -> 4.1.x next) & frontend scaffolds verified |
| Frontend design matching (all PNGs) | DONE | Pixel-perfect match to /design (20 pages, light & dark, 1440px verification) |
| Database & Keepalive Action | DOING | Supabase free Postgres (Session pooler) + GitHub Action keepalive |
| Frontend UI & mock wiring | DOING | Built by teammate with mock data & localStorage auth; wiring to backend |
| PayPal Sandbox app and credentials | TODO | Day 1 |
| Create, approve, capture a Sandbox order | TODO | Day 2 |
| Webhook endpoint on a public URL | TODO | Day 2 |
| Disputes API access check | TODO | Day 2 |
| Signature verification and event inbox | TODO | Day 3 |
| Render deployment skeleton | TODO | Paid with hackathon credits, free-plan fallback |
| Demo shop and fault switches | TODO | Day 4 |
| Detectors (P0) | TODO | Day 5 |
| AG Grid queue (AG Studio / Prize target) | TODO | Day 6 |
| Evidence graph and timeline | TODO | Day 7 |
| AI investigator (Google Gemini via Spring AI) | TODO | Configurable by env vars; free tier |
| Actions, approval, audit, login | TODO | Day 9 |
| Benchmark numbers | TODO | Day 10 |
| README, license, video, submission | TODO | Submit by 12 Nov 6 pm IST (feature freeze 10 Nov) |

## Next up

1. Create the repo with `backend/`, `frontend/`, `docs/` and copy these five docs into `docs/`.
2. Generate the Spring Boot 4.1.1 project; confirm Java 21 and the Spring AI 2.0.x BOM resolve.
3. Create the Sandbox REST app, personal and business sandbox accounts; store credentials in a local `.env` (not committed).

## Environment facts (no secrets)

- PayPal Sandbox base URL: `https://api-m.sandbox.paypal.com`
- Order to shop mapping: PayPal `custom_id` = shop order id
- Webhook events of interest: `PAYMENT.CAPTURE.COMPLETED`, refund events, dispute events (verify exact names in the PayPal webhook reference)
- Required env vars are listed in `architecture.md` section 13

## Gotchas (add as you learn)

- PayPal cannot reach `localhost`; use a tunnel or the Render URL for webhooks.
- Capture on the server, never in the browser.
- Sandbox is not identical to live; do not claim production behavior.
- Disputes API buyer-side testing may need extra scopes granted by PayPal.
- Spring Boot 4 uses Jackson 3; Jackson 2 imports will not match the default mapper.
- Confirm in the docs whether webhook-simulator events pass signature verification before relying on them.

## Glossary

| Term | Meaning |
|---|---|
| Case | A detected exception, keyed by `(type, paypalOrderId)` |
| Evidence item | A normalised record from PayPal, the shop or the system, with an id and a source |
| Evidence graph | Derived map of evidence items and their links, with dashed "missing" nodes |
| Investigator | The Spring AI agent with read-only tools that produces an `InvestigationReport` |
| Verifier | Deterministic check that every cited id and amount in a report is real |
| Fault switch | Demo-only control that causes a specific failure on purpose |
| Idempotency key | Unique key that makes a repeated request or event have one effect |

## Open questions

- Can the Sandbox Disputes API be exercised with default app scopes?
- Will the video use live or cached investigations? (Default: cached for seeded cases, live path still shown once.)

## Session log

Keep to one line per session; roll old entries up when this grows.

- 2026-11-02: Chose PayResolve, wrote the five project docs, locked the stack.
- 2026-11-02: Initialized git, created repository folder structure (backend, frontend, docs, infra, postman, .github/workflows), added MIT License, .env.example, README.md, .gitignore, and synced docs.
