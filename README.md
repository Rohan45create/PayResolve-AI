# PayResolve AI

> **Merchant-side investigation engine for PayPal payment exceptions.**  
> When a payment, an order, a refund, and a delivery disagree, PayResolve reconstructs the exact timeline with a source-linked evidence graph and runs a live, read-only AI investigator—while humans retain full control of every consequential action.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Java 21](https://img.shields.io/badge/Java-21-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.1.1-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38bdf8.svg)](https://tailwindcss.com/)

---

## The Problem

In e-commerce, payment records span disparate sources: PayPal Sandbox API, webhook events, store order tables, warehouse shipments, and support inboxes. When an anomaly occurs—such as a webhook dropping mid-flight after a capture completes—the merchant's store still flags the order as `PENDING` or unpaid. 

Operators typically spend 15–30 minutes bouncing between tabs trying to piece together what happened. Hastily telling a buyer to "try paying again" risks double-charging them, while issuing blind refunds bleeds merchant capital.

## How PayResolve Works

1. **Deterministic Detection**: Lightweight rules run on event intake to detect discrepancies (`PAID_NOT_MARKED`, `AMOUNT_MISMATCH`, `DUPLICATE_EVENT`) without AI hallucination.
2. **Payment Evidence Graph (Hero)**: Assembles a live, source-linked directed graph of PayPal orders, captures, refunds, webhooks, and merchant store records. Missing connections (e.g. captured payment without corresponding store order update) render visually as dashed "missing" nodes.
3. **Tool-Calling AI Investigator**: An agent equipped solely with **read-only tools** gathers facts across PayPal and the store database. It produces a grounded `InvestigationReport` detailing what is confirmed, what conflicts, and what is missing.
4. **Deterministic Verifier**: Validates every cited evidence ID and monetary figure in the report against real records before rendering.
5. **Human-in-the-Loop Actions**: The AI proposes safe next steps (e.g. `SYNC_ORDER_STATUS`, `HOLD_REFUND`, `REQUEST_REVIEW`); only a human operator can approve execution. Idempotency guarantees prevent repeated side effects.

> [!NOTE]
> All payment data and disputes are tested against the **PayPal Sandbox API** and synthetic, clearly labelled fixtures. No real card numbers or customer PII are used.

---

## Architecture & Repository Layout

```
payresolve/
├── backend/               # Spring Boot (Java 21, Spring AI, Flyway, Postgres)
├── frontend/              # React 19, TypeScript strict, Vite, Tailwind v4, AG Grid, React Flow
├── docs/                  # Architecture, PRD, phases, rules, memory docs
├── infra/                 # Docker Compose, Render deployment configurations
├── postman/               # Postman collection & environment for API testing
├── .env.example           # Environment template (no secrets)
├── LICENSE                # MIT License
└── README.md
```

### Technology Stack & Disclosures
- **PayPal Integration**: PayPal Orders v2, Captures, Refunds, and Webhooks APIs.
- **Frontend**: React 19, TypeScript (`strict: true`), Vite, Tailwind CSS v4, AG Grid Community (exception queue), React Flow / `@xyflow/react` (evidence graph), TanStack Query.
- **Backend**: Java 21, Spring Boot, Spring AI, Spring Security, Flyway, PostgreSQL.
- **Hosting & Infrastructure**: Render (Docker web service for backend, static site for frontend, managed PostgreSQL).

---

## Quick Start (Local Setup)

Clone and run the complete demo locally in under 15 minutes:

### 1. Prerequisites
- **Java 21** or later
- **Node.js 20+** and `npm`
- **Docker** and Docker Compose (for PostgreSQL)

### 2. Configure Environment
```bash
cp .env.example .env
```
Fill in your PayPal Sandbox credentials and LLM API key in `.env`.

### 3. Launch Database
```bash
docker compose -f infra/docker-compose.yml up -d
```

### 4. Run Backend
```bash
cd backend
./mvnw spring-boot:run
```
The API starts at `http://localhost:8080`.

### 5. Run Frontend
```bash
cd frontend
npm install
npm run dev
```
The UI starts at `http://localhost:5173`.

---

## Demo Roles & Credentials

For hackathon judges and evaluators:
- **Viewer Role (Read-only)**:  
  Password: `viewer_demo_password`  
  Allows browsing cases, exploring evidence graphs, and viewing investigations.
- **Operator Role (Approve actions)**:  
  Username: `operator` | Password: `operator_demo_password`  
  Allows triggering AI investigations, approving proposed actions, and triggering demo fault switches.

---

## Hackathon Compliance & Disclosures

- Built for the **PayPal AI Hackathon (2026)**.
- **Meaningful PayPal & AI Integration**: Integrates real PayPal Sandbox Orders/Captures/Webhooks and an autonomous, tool-calling Spring AI agent with deterministic verification.
- **License**: Open-source under the [MIT License](LICENSE).
