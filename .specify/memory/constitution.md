<!--
Sync Impact Report
- Version change: unversioned template → 1.0.0 (initial adoption; the template had no prior version).
- Modified principles: template placeholders → I. Product Value; II. Type Safety;
  III. Next.js Architecture; IV. Tailwind Styling; V. Verified Quality.
- Added sections: Additional Constraints; Development Workflow (filled the template's sections).
- Removed sections: none.
- Templates: ✅ .specify/templates/plan-template.md updated;
  ✅ .specify/templates/tasks-template.md updated;
  ✅ .specify/templates/spec-template.md reviewed; no changes needed because its
  user-story, requirements, and measurable-outcome sections remain aligned;
  ✅ README.md updated with the validation expectations;
  ⚠ .specify/templates/commands/*.md not found (no command-template directory exists).
- The constitution is adopted on 2026-11-06. The repository has no configured test runner
  or test script; add test tooling as a foundational task before feature work that requires
  automated coverage.
-->

# RoomFinder Constitution

## Core Principles

### I. Product Value

Every feature MUST advance RoomFinder's purpose: helping room owners offer rooms for rent
and helping renters find affordable rooms by price and location. User stories and acceptance
criteria MUST express the value to owners or renters; features that do not support either
journey require an explicit product rationale. This keeps implementation focused on the
marketplace's core needs.

### II. Type Safety

Application code MUST use TypeScript with strict compiler checks. The `any` type MUST NOT
be introduced; use a precise type, `unknown` with validation, or a suitable generic instead.
Type errors MUST be fixed rather than suppressed with casts or compiler directives unless
the exception is narrowly scoped and documented. Strong types catch invalid data flows
before they reach listing, search, or filtering experiences.

### III. Next.js Architecture

The application MUST use the Next.js App Router and its file-based routing conventions.
Pages and components MUST be Server Components by default; a component MUST use the
`"use client"` boundary only when it needs browser APIs, local interactive state, or client
event handling. Routes and layouts MUST live in the appropriate `app/` route segment files,
and shared UI MUST be placed in reusable components rather than duplicated between routes.
This keeps routing, rendering, and client-side JavaScript explicit and maintainable.

### IV. Tailwind Styling

UI styling MUST use Tailwind CSS utility classes as the default. Custom CSS in global styles
or component styles is permitted only when the design cannot be expressed clearly and
maintainably with the available utilities; the reason MUST be documented in the change.
This avoids unnecessary styling systems and keeps visual behavior consistent.

### V. Verified Quality

Every change to user-visible behavior MUST have automated tests at the appropriate level,
including focused unit or component tests and integration or end-to-end coverage for
important user journeys where the test setup supports them. A feature MUST NOT be considered
complete until its relevant tests, strict TypeScript check, lint, formatting check, and
production build pass. If a test harness is missing for required coverage, its setup MUST be
planned rather than treating tests as optional. This protects core listing and search flows
from regressions.

## Additional Constraints

- The required application stack is Next.js App Router, TypeScript, and Tailwind CSS.
- The product supports room owners posting rental listings and renters searching and
  filtering for affordable rooms by price and location.
- Naming MUST be consistent: reusable React components and their files use PascalCase;
  Next.js convention files retain the framework-required names (for example, `page.tsx`
  and `layout.tsx`); functions, variables, and hooks use camelCase (hooks begin with `use`);
  TypeScript types and interfaces use PascalCase; route segment folders use lowercase
  kebab-case, except where Next.js route syntax requires otherwise. Constants use
  UPPER_SNAKE_CASE only when they are module-level values intended to remain constant.
- Interactive controls MUST expose accessible names and support keyboard use; user-facing
  layouts MUST remain usable at mobile widths.
- Exceptions to the required stack or these constraints MUST be documented in the feature
  plan with the reason and the simplest viable alternative considered.

## Development Workflow

- Work MUST happen on a task-specific feature branch; direct pushes to `main` are not
  permitted.
- Changes MUST be submitted through a Pull Request targeting `main`. At least one teammate
  MUST review and approve the PR before merge.
- PRs MUST describe the user-facing impact, testing performed, and any justified exception
  to this constitution. Reviewers MUST check product alignment, type safety, App Router and
  Server/Client Component boundaries, Tailwind-first styling, and test coverage.
- Before opening a PR, contributors MUST run `npm run lint`, `npm run format:check`,
  `npx tsc --noEmit`, and `npm run build`, plus the applicable automated tests. Any
  unavailable test command or failing check MUST be disclosed in the PR.
- Feature plans MUST include a Constitution Check before research and repeat it after design.
  Tasks MUST include tests for changed behavior and the required quality checks.

## Governance

This constitution governs feature specifications, plans, tasks, implementation, and review.
Amendments require a documented proposal, review and approval by the project maintainers,
and updates to affected templates and runtime guidance in the same change. A PR that
conflicts with a principle MUST either be revised or include an explicit, reviewed exception
in its plan; exceptions do not silently change the constitution.

Versioning follows semantic versioning: MAJOR for backward-incompatible governance or
principle changes, MINOR for new principles or materially expanded requirements, and PATCH
for clarifications or non-semantic refinements. Every amendment MUST update the version,
last-amended date, and Sync Impact Report. Contributors and reviewers MUST verify
compliance at planning, implementation, and PR review; maintainers MUST resolve any
unjustified violation before merge.

**Version**: 1.0.0 | **Ratified**: 2026-11-06 | **Last Amended**: 2026-11-06
