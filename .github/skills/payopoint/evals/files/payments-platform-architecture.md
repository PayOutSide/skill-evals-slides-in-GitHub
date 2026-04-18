# Payments Platform Architecture Refresh

## METADATA
```yaml
title: Payments Platform Architecture Refresh
subtitle: Reliability and Scale Plan
presenter: Daniel Weiss
role: Principal Engineer
date: April 2026
audience: engineers
tone: technical
```

---

## SLIDE 1: Title
**Type:** title-slide

**Content:**
- Title: Payments Platform Architecture Refresh
- Subtitle: Reliability and Scale Plan
- Presenter: Daniel Weiss, Principal Engineer
- Date: April 2026

---

## SLIDE 2: Agenda
**Type:** agenda-slide

**Content:**
| # | Topic | Duration |
|---|-------|----------|
| 1 | Current bottlenecks | 4 min |
| 2 | Target architecture | 8 min |
| 3 | Migration phases | 5 min |
| 4 | Open risks | 3 min |

---

## SLIDE 3: Architecture
**Type:** architecture-slide

**Content:**
- Title: Target Architecture
- Diagram: Gateway routes traffic through edge services into orchestration, ledger, risk, and notification domains over event streams.
- Callouts:
  1. API gateway - central entry point and traffic policy layer
  2. Orchestrator - coordinates transaction lifecycle and retries
  3. Event backbone - fan-out to downstream domains
  4. Reliability plane - metrics, alerting, and replay support

---

## SLIDE 4: Process
**Type:** process-slide

**Content:**
- Title: Migration Phases
- Steps:
  1. Baseline - lock current SLOs and routing paths
  2. Dual write - introduce mirrored event publication
  3. Traffic shift - move selected corridors to new path
  4. Harden - close resiliency gaps and replay flows
  5. Expand - roll out by corridor and payment rail

---

## SLIDE 5: Stats
**Type:** stats-slide

**Content:**
- Title: Success Metrics
- Stats:
  - 99.95% | Availability target | up
  - 45% | Retry reduction | up
  - 30 min | Faster incident triage | up
  - 0 | Manual replay steps in steady state | neutral