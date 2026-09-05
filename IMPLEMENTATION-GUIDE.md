# LEAP Transformation Navigator — Standalone Deployment Guide

This package contains the working Next.js assessment interface plus a production-oriented Supabase data model and server routes. It is designed for LEAP to own outside ChatGPT and deploy through GitHub and Vercel.

## Included now

- 25 Transformation Readiness indicators across six domains
- Implementation scale 1–4 plus Not Enough Evidence
- Priority scale 1–4
- Automatic domain scoring and high-leverage focus recommendation
- Responsive participant experience and printable profile
- Device-local draft saving
- Supabase schema for organizations, assessment cycles, submissions, resources, and action plans
- Anonymous submission endpoint using team codes
- Protected aggregate-summary endpoint
- Small-group suppression at fewer than three respondents

## Recommended production architecture

| Layer | Recommended tool | Purpose |
| --- | --- | --- |
| Participant and team portal | Next.js on Vercel | Branded assessment, results, resources, and action planning |
| Database | Supabase/PostgreSQL | Shared responses, schools, cycles, resources, and plans |
| Authentication | Supabase Auth | LEAP admin, district lead, school lead, coach, and team roles |
| Internal administration | Retool | Manage organizations, cycles, resources, exports, and support |
| Charts | Recharts | Domain profiles, trends, stakeholder comparisons, and priority matrix |
| File storage | Supabase Storage | LEAP protocols, templates, examples, and guides |

## Setup

1. Create a Supabase project and run `supabase/schema.sql` in its SQL editor.
2. Create `.env.local` from `.env.example` and add the three private values.
3. Add at least one organization with a unique team code and open assessment cycle.
4. Run `npm install` and `npm run dev` locally.
5. Push the folder to a private GitHub repository and import it into Vercel.
6. Add the same environment variables in Vercel; never expose the service-role key as a `NEXT_PUBLIC_` variable.

## Before a live pilot

- Connect the assessment's final action to `POST /api/submissions`.
- Add Supabase Auth and role mappings for LEAP admins, district leads, school leads, and coaches.
- Replace the temporary administrator bearer token with authenticated role checks.
- Build an admin screen for organizations, team codes, cycles, and resource tagging—or retain Retool for this purpose.
- Add the aggregate domain calculation and stakeholder comparison UI using the summary endpoint.
- Confirm LEAP's desired suppression threshold. The starter uses `n < 3`; `n < 5` is more protective for sensitive or small stakeholder groups.
- Complete privacy, data-retention, consent, accessibility, and security review before collecting student or family responses.

## Strong next-build roadmap

### Pilot release

- Central submission storage
- Team codes and active assessment windows
- Stakeholder perspective selection
- Evidence-confidence ratings and reflection responses
- Aggregate six-domain reporting
- Suppression for small stakeholder groups
- CSV export for LEAP staff

### Team improvement release

- Readiness × Priority matrix
- Indicator and stakeholder explorer
- Resource recommendations matched to domain, indicator, and readiness level
- Action plans with owner, evidence, and check-in date
- Fall/Winter/Spring trend explorer

### Scaled product release

- District and multi-school views
- Coach portfolios and assigned-organization permissions
- Single sign-on where required
- Configurable assessment versions
- Audit logs, retention controls, and automated reporting
- Connections to the LEAP Learner Engagement Survey and other evidence sources

## Privacy model

Participant submissions should not store names, email addresses, or browser identifiers. Team codes associate responses with an organization. Only authorized team and LEAP roles should access aggregates. Never display a stakeholder group independently below the agreed suppression threshold.
