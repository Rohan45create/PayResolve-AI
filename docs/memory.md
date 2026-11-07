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

- Backend: Java 21, Spring Boot 4.1.2 (Spring Framework 7, Jackson 3), Spring AI 2.0.2, Spring Security 7, Spring Data JDBC, Flyway, PostgreSQL driver, springdoc-openapi 3.2.0, Testcontainers, WireMock 3.13.2, Maven
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
| 2026-11-07 | Landing page & Google Icons integration | Enhanced Landing page typography (Plus Jakarta Sans), exact design color gradients, layout containers, Case PR-0142 graph mockup, floating cards, and integrated Google Material Symbols |
| 2026-11-07 | Replaced lucide-react with Google Icons | Completely migrated all icons across the entire project to Google Material Symbols (`GoogleIcon`) and uninstalled `lucide-react` |
| 2026-11-07 | Backend config externalization | Secrets and connection strings exist solely in local .env; application.yml is gitignored and copied from application.yml.example; safe test-only settings in src/test/resources/application.yml |
| 2026-11-07 | Dockerfile and CI config preparation | The Dockerfile must copy application.yml.example to application.yml before building; tests use src/test/resources/application.yml |
| 2026-11-07 | Backend foundation on Spring Boot 4.1 | Upgraded to Spring Boot 4.1.2, Java 21; added Spring Data JDBC, Flyway, PostgreSQL driver, springdoc-openapi 3.2.0, Spring AI Google GenAI (Gemini) chat starter 2.0.2, Testcontainers, WireMock; created all 9 packages from architecture.md; implemented Money record, injected Clock bean, global ProblemDetail handler; all APIs mapped under /api; multi-stage Dockerfile with 512MB RAM budget; render.yaml updated for Docker web service API and static UI with free plan fallback |
| 2026-11-07 | Supabase schema and keep-alive | Created Flyway V1__init.sql (all 14 tables from architecture.md section 8, BIGINT minor units, unique constraints on webhook_events.paypal_event_id and proposed_actions.idempotency_key, queue and inbox indexes) and V2__keepalive.sql (public.keepalive with RLS and anon policy; also saved to supabase/keepalive.sql). Configured Session pooler (IPv4, port 5432) and documented IPv6/prepared-statement caveats. Added .github/workflows/supabase-keepalive.yml (2-day cron + workflow_dispatch) and Testcontainers-based FlywayMigrationTest. |
| 2026-11-07 | PayPal sandbox client & WireMock suite | Implemented full PayPal sandbox client (com.payresolve.paypal): OAuth token cache with proactive 120s buffer refresh; Orders v2 create (custom_id=shopOrderId), get, server-side capture; read-only payments (captures, refunds); webhook signature verification (verify-webhook-signature); live disputes with automatic synthetic fixture fallback (clearly marked synthetic: true / source: "SYNTHETIC"); RestClient with connect (5s) and read (10s) timeouts, jitter retry, credential redaction; comprehensive WireMock test suite covering token cache, 401 refresh, orders, payments, signature verification, transient retry, and dispute fallback; updated Postman collection & environment. |

## Backend cleanup findings

- **backend/mvnw permissions:** File was committed without the executable bit (100644). Fixed with git update-index --chmod=+x backend/mvnw (100755).
- **Maven wrapper version:** maven-wrapper.properties points to Maven 3.10.0. Verified that https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.10.0/apache-maven-3.10.0-bin.zip returns HTTP 200 and ./mvnw -v successfully resolves to Apache Maven 3.10.0 on Java 24; also confirmed Maven 3.9.9 is available on Central.
- **Root .gitignore:** Erroneously ignored .gitkeep (line 38), which blocked tracking empty directory markers. Removed .gitkeep from .gitignore.
- **Backend configuration & secrets:** pplication.yml was committed to git with active PostgreSQL configuration requiring live secrets (${DATABASE_URL}, etc.) and no pplication.yml.example existed. Removed pplication.yml from git, added it to .gitignore with an exclusion for pplication.yml.example and src/test/resources/application.yml.
- **.env.example:** Outdated configuration referencing OpenAI (gpt-4o-mini) and local PostgreSQL. Rewritten with Supabase Session pooler placeholders, Google Gemini (gemini-2.0-flash), complete server/security/auth keys, and 'no quotes around values' comment.
- **Unused IDE artifacts:** ackend/bin/ contained a redundant Eclipse/m2e project copy; removed completely.
- **Placeholder markers:** 21 .gitkeep files under ackend/src/main/ and ackend/src/test/ removed.
- **CI Workflow (.github/workflows/ci.yml):** Lacked a step to copy pplication.yml.example to pplication.yml before running Maven verification. Added preparation step.

## Current status

Update this table as you go. Status: TODO, DOING, DONE, CUT.

| Area | Status | Notes |
|---|---|---|
| Docs (prd, architecture, phases, rules, memory) | DONE | Aligned with 7 Nov decisions |
| Repo, CI, scaffolds | DONE | Spring Boot 4.1.2 foundation, Dockerfile, render.yaml, packages & common domain types in place |
| Frontend design matching (all PNGs) | DONE | Pixel-perfect match to /design (20 pages, light & dark, 1440px verification) |
| Database & Keepalive Action | DONE | Flyway V1/V2, Session pooler config, keepalive table & workflow active |
| Frontend UI & mock wiring | DOING | Built by teammate with mock data & localStorage auth; wiring to backend |
| PayPal Sandbox app and credentials | DONE | Client, properties, in-memory OAuth token manager with proactive refresh |
| Create, approve, capture a Sandbox order | DONE | Orders v2 client (custom_id = shop order id), capture, WireMock tests & Postman flow |
| Webhook endpoint on a public URL | TODO | Day 2 |
| Disputes API access check | DONE | Live disputes query with automatic labelled synthetic fallback on 401/403 |
| Signature verification and event inbox | DOING | Webhook signature verification client tested with WireMock; inbox pipeline next |
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
- WebMvcConfigurer method in Spring Framework 7 is configurePathMatch (not configurePathMatching).
- Spring Boot 4 MockMvc autoconfiguration is in org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc (from spring-boot-starter-webmvc-test).
- Spring AI 2.0.2 Google GenAI uses properties spring.ai.google.genai.api-key and spring.ai.google.genai.chat.options.model.
- Supabase direct connection is IPv6 only; transaction pooler (port 6543) breaks prepared statements. Always use the Session pooler (port 5432) with JDBC.
- Confirm in the docs whether webhook-simulator events pass signature verification before relying on them.
- Jackson 3 in Spring Boot 4.1.2 defaults DeserializationFeature.FAIL_ON_NULL_FOR_PRIMITIVES to true. When PayPal JSON payloads omit internal flags like synthetic (boolean), Jackson throws MismatchedInputException. Use object Boolean with null-safe default constructor logic and @JsonIgnoreProperties(ignoreUnknown = true).
- Spring IoC constructor resolution: When a bean class defines multiple constructors and neither is annotated with @Autowired, Spring searches for a no-arg default constructor and throws NoSuchMethodException. Maintain exactly one constructor per bean for clean constructor injection.
- Spring Framework 7 HttpHeaders.containsHeader(String) replaces legacy map containsKey() checks.
- PayPal Disputes API sandbox scopes: Developer sandbox REST apps commonly lack dispute scopes (HTTP 403 Forbidden). LivePayPalDisputesClient automatically falls back to SyntheticDisputesProvider with explicit synthetic: true and source: "SYNTHETIC" markings.

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
- 2026-11-07: Built paypal module (OAuth token cache, Orders v2, read-only payments, webhook signature verification, live + synthetic disputes, RestClient timeouts & jitter retry, 8 WireMock tests, updated Postman assets).
