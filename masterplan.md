# SETU --- Masterplan

## Smart Innovation & Societal Impact Platform

### SIH 2026 MVP / Flagship Demo Architecture

**Status:** Discovery complete\
**Product:** SETU\
**North Star Metric:** Verified Societal Outcomes (VSOs)\
**Flagship Demo:** Water Contamination --- West Singhbhum → IIT (ISM)
Dhanbad → CSR Enablement → Ground Pilot → Verified Impact → Solution
Reuse

------------------------------------------------------------------------

# 1. Executive Summary

SETU is a closed-loop innovation and execution platform that converts
real societal challenges into accountable university-led projects,
enables industry/CSR participation, and verifies measurable outcomes on
the ground.

The central idea is not to build another grievance repository.

SETU creates a persistent bridge:

**Community Problem → Structured & Validated Challenge → Capability
Match → University Ownership → Student/Faculty R&D → Industry/CSR
Enablement → Prototype → Pilot → Independent Verification → Measured
Impact → Reusable Knowledge**

The SIH problem statement describes this same closed-loop direction:
citizens/community surface problems, the platform structures and
validates them, universities solve them, industry enables
prototyping/deployment, and impact is measured. It also identifies
domains including education, healthcare, agriculture, water, sanitation,
environment, accessibility, rural livelihoods, infrastructure and public
services.

SETU's differentiation is therefore its **problem-to-impact lifecycle**,
rather than simply collecting complaints or publishing projects.

## North Star

The single North Star Metric is:

> **Verified Societal Outcomes (VSOs)**

A challenge contributes to the VSO counter only after the solution has
produced a real-world outcome that passes SETU's defined multi-party
verification process.

------------------------------------------------------------------------

# 2. Product Vision

## Vision

Build a trusted innovation infrastructure where every validated societal
problem can be connected to the people and institutions capable of
solving it, while every claimed solution is traceable to measurable
real-world impact.

## Mission

SETU brings together four forces:

-   **Citizens / communities:** identify and evidence real problems.
-   **Universities:** provide research, technical talent, laboratories
    and student innovation.
-   **Industry / CSR:** provide funding, mentorship, testing,
    manufacturing and deployment support.
-   **Government / program authorities:** govern, validate, coordinate
    and measure outcomes.

SETU is the coordination and governance layer between these actors.

------------------------------------------------------------------------

# 3. Core Product Principles

## 3.1 Outcome over volume

The platform should never optimize only for:

-   number of submissions,
-   number of registered users,
-   number of AI recommendations,
-   number of proposals.

The ultimate measure is whether validated challenges produce verified
improvement.

## 3.2 Evidence-first

A challenge should become increasingly evidence-rich as it progresses:

**Citizen evidence → Moderator validation → Academic technical evidence
→ Pilot evidence → Community validation → Institutional audit**

## 3.3 Human-in-the-loop AI

AI recommends.

Authorized humans decide.

Every consequential AI recommendation must be explainable, overridable
and auditable.

## 3.4 Capability-based matching

Universities are not selected merely because they are geographically
nearby.

Matching considers:

-   domain expertise,
-   faculty expertise,
-   laboratory capability,
-   equipment,
-   previous projects,
-   student capacity,
-   geography/proximity,
-   institutional capability.

The SIH material explicitly recommends weighted capability matching with
coordinator confirmation rather than black-box assignment.

## 3.5 Accountability by lifecycle

Every validated challenge should have:

-   an owner,
-   a current state,
-   a next action,
-   a responsible actor,
-   a timeline/SLA,
-   evidence,
-   an outcome.

This prevents SETU from becoming a passive repository.

## 3.6 Reuse instead of reinvention

A successfully validated solution should become structured knowledge
that can help solve similar future challenges.

------------------------------------------------------------------------

# 4. Product Scope

## 4.1 Primary MVP scope

SETU MVP contains four major workspaces rather than separate portals for
every role.

### Workspace 1 --- Citizen / Community Portal

Users: - citizens, - Panchayati Raj representatives, - ULB/community
representatives.

Purpose: - submit societal challenges, - attach evidence, - provide
location and urgency, - track challenge status.

### Workspace 2 --- Central Moderator Desk

Users: - state/program administrators, - district moderators, -
authorized validators.

Purpose: - validate challenges, - inspect evidence, - review AI
recommendations, - resolve duplicates, - prioritize, - route challenges.

### Workspace 3 --- University Collaboration Hub

Users: - university coordinators, - faculty mentors, - students, -
approved industry/CSR collaborators.

Purpose: - accept challenges, - form teams, - create proposals, - manage
R&D, - manage milestones, - coordinate industry support, - document
prototypes and pilots.

### Workspace 4 --- Government & Executive Impact Dashboard

Users: - state departments, - district leadership, - program
administrators.

Purpose: - monitor the innovation pipeline, - identify stalled
projects, - track participation and funding, - visualize district/domain
patterns, - monitor verified societal outcomes.

The source problem statement supports citizen submission, validation,
university collaboration, industry partnership, project lifecycle
management and government analytics as core platform modules.

------------------------------------------------------------------------

# 5. End-to-End SETU Lifecycle

## Phase 1 --- Problem Discovery & Submission

A citizen/community member submits:

-   problem description,
-   domain,
-   photographs/video,
-   documents where applicable,
-   location,
-   urgency,
-   affected population,
-   desired outcome.

The citizen experience is a guided wizard rather than a large generic
complaint form.

### Example

Hindi input:

> "Peene ke paani me zang aur ganda baalu aa raha hai."

SETU converts this into a structured challenge.

Output:

**Challenge #SETU-1042**

------------------------------------------------------------------------

# 6. Phase 2 --- AI Intelligence & Human Validation

The AI layer supports:

### Problem Structuring

Extract:

-   domain,
-   subdomain,
-   affected population,
-   urgency,
-   concise problem summary,
-   evidence signals.

### Semantic Deduplication

Compare a new challenge with existing challenges using:

-   semantic similarity,
-   location,
-   domain,
-   contextual signals.

The output is a recommendation such as:

> 91% semantic similarity with an existing challenge.

This is a recommendation, not an automatic merge.

### Priority / Impact Scoring

Signals may include:

-   severity,
-   health/safety risk,
-   affected population,
-   spread,
-   evidence quality,
-   urgency.

### Human Decision

The moderator sees an AI Decision Card containing:

1.  recommendation,
2.  confidence,
3.  contributing factors,
4.  supporting evidence,
5.  suggested action,
6.  accept/override controls,
7.  mandatory override reason.

Every override is logged.

------------------------------------------------------------------------

# 7. Phase 3 --- Capability-Based University Matching

SETU creates a weighted ranking of capable institutions.

Conceptual matching dimensions:

  -----------------------------------------------------------------------
  Factor                              Purpose
  ----------------------------------- -----------------------------------
  Domain Fit                          Does the university work in this
                                      problem area?

  Faculty Expertise                   Are relevant faculty available?

  Laboratory Capability               Can the required experimentation be
                                      performed?

  Equipment                           Does the required infrastructure
                                      exist?

  Previous Projects                   Has similar work been performed?

  Student Capacity                    Can a team realistically be formed?

  Geography                           Is proximity useful for field
                                      deployment?

  Workload                            Is current capacity sufficient?
  -----------------------------------------------------------------------

The result is an explainable ranking.

Example:

**IIT (ISM) Dhanbad --- 87/100**

Reasons:

-   strong domain fit,
-   relevant faculty,
-   appropriate laboratory capability,
-   relevant prior work,
-   practical deployment proximity.

The coordinator retains final authority.

### Important architecture principle

The matching engine should use:

**Hard eligibility rules + weighted recommendation + human
confirmation**

rather than an opaque end-to-end AI assignment system.

------------------------------------------------------------------------

# 8. Phase 4 --- Academic Ownership & Solution Formation

Once a university accepts a challenge:

1.  Department ownership is established.
2.  Faculty mentor is assigned.
3.  Student team is formed.
4.  AI Solution Copilot generates a kickoff brief.
5.  Team develops a technical proposal.
6.  Faculty reviews feasibility.
7.  Moderator confirms alignment where required.

## Student Team Formation

SETU uses a hybrid model:

-   faculty/coordinator invitations,
-   open student applications.

The platform can recommend multidisciplinary teams based on capability.

### Student Capability Passport

Conceptually contains:

-   degree/year/department,
-   verified skills,
-   relevant coursework/projects,
-   SETU project history,
-   faculty endorsements,
-   workload/capacity.

For the MVP, the passport is primarily a capability and
project-allocation mechanism rather than a public résumé.

A configurable active-project limit can protect student capacity.

------------------------------------------------------------------------

# 9. AI Solution Copilot

The Copilot becomes active after university acceptance.

It can produce:

### Kickoff Brief

-   structured problem statement,
-   known evidence,
-   affected population,
-   constraints,
-   expected outcome.

### Solution Exploration

Suggest:

-   2--3 technically plausible approaches,
-   benchmark ideas,
-   research directions,
-   relevant equipment,
-   potential industry/CSR categories.

### Project Planning

Draft:

-   proposal outline,
-   milestones,
-   experimental plan,
-   indicative resource requirements,
-   testing plan.

### Guardrail

Every generated project artifact carries the principle:

> **AI-Generated Draft --- Requires Faculty Verification**

The Copilot must never be treated as the final authority for technical,
safety, health or deployment specifications.

------------------------------------------------------------------------

# 10. Phase 5 --- Industry / CSR Enablement

Industry and CSR partners enter after sufficient project definition
exists.

Potential support includes:

-   funding,
-   technical mentorship,
-   testing,
-   manufacturing guidance,
-   lab access,
-   field deployment,
-   technology transfer.

For the flagship demo, CSR support is represented as a **demo scenario**
unless a formal partnership has been established.

### Controlled Workflow

**Proposal → Partner Review → Funding/Support Commitment → Prototype →
Testing → Pilot**

This creates a controlled relationship rather than exposing unverified
funding claims.

------------------------------------------------------------------------

# 11. Phase 6 --- Prototype, Pilot & Verification

The project moves through explicit states:

**Accepted → Team Formed → Proposal → Approved → Industry/CSR Support →
Prototype → Lab Testing → Field Pilot → Verification → Verified
Deployment → Closed**

Each state should have:

-   responsible owner,
-   expected next action,
-   evidence requirements,
-   timestamps,
-   approvals,
-   audit history.

------------------------------------------------------------------------

# 12. Triangle of Trust

The core verification model is a multi-party verification mechanism.

## Pillar 1 --- Academic Evidence

University team submits:

-   baseline measurements,
-   post-pilot measurements,
-   test reports,
-   photos/video,
-   relevant geolocation/deployment evidence.

## Pillar 2 --- Community Validation

The affected community/citizen confirms that the intervention actually
occurred and produced the claimed improvement.

## Pillar 3 --- Institutional Audit

A Panchayat/ULB representative or authorized district moderator verifies
deployment and supporting evidence.

Only after the required verification conditions are satisfied should the
platform mark the challenge:

> **VERIFIED DEPLOYMENT**

This is the foundation of the VSO metric.

------------------------------------------------------------------------

# 13. Verified Societal Outcomes

## Definition

A VSO represents a real-world societal problem that has progressed
through the SETU pipeline and produced a verified improvement.

Conceptually:

**VSO = Real-world Challenge + Solution Execution + Evidence + Community
Confirmation + Institutional Verification**

The exact verification policy should remain configurable by
program/domain.

## KPI Cascade

### Level 1 --- Discovery

-   total challenges,
-   validation rate,
-   AI deduplication rate,
-   triage rate,
-   average validation time.

### Level 2 --- Conversion

-   challenges matched,
-   university acceptance rate,
-   proposal completion,
-   prototype conversion,
-   Copilot utilization.

### Level 3 --- Execution

-   prototype-to-pilot conversion,
-   deployment time,
-   CSR/industry participation,
-   capital mobilized.

### Level 4 --- Impact

-   verified deployments,
-   beneficiaries reached,
-   baseline-to-post-pilot improvement,
-   solution replication,
-   Verified Societal Outcomes.

------------------------------------------------------------------------

# 14. Flagship SIH Demo

## Hero Story

**Water Contamination in West Singhbhum → IIT (ISM) Dhanbad → CSR
Enablement → Ground Pilot → Verified Impact → Reuse**

### Scene 1 --- Citizen Intake

Show:

-   mobile/PWA interface,
-   Hindi mode,
-   guided wizard,
-   browser location,
-   camera evidence.

Citizen submits:

> "Peene ke paani me zang aur ganda baalu aa raha hai."

Output:

**#SETU-1042**

### Scene 2 --- AI + Moderator

Moderator opens the challenge.

AI shows:

-   Domain: Water & Sanitation,
-   Urgency: High,
-   duplicate suggestion,
-   university ranking,
-   reason breakdown.

Moderator accepts the recommendation.

### Scene 3 --- University Hub

Coordinator accepts.

Show:

-   faculty mentor,
-   student applications,
-   multidisciplinary team,
-   Copilot kickoff brief,
-   proposal creation.

### Scene 4 --- Industry / CSR

Partner reviews the approved proposal.

Show:

-   support commitment,
-   technical mentor,
-   project milestone transition.

Then show:

**Prototype → Lab Testing → Field Pilot**

### Scene 5 --- Verification

Show:

-   academic evidence,
-   community confirmation,
-   institutional sign-off.

Dashboard updates:

**VERIFIED DEPLOYMENT**

### Scene 6 --- Killer Ending

Submit a similar challenge from another location.

SETU discovers the previously verified solution.

Show:

> **PRIOR SOLUTION MATCH FOUND**

Then demonstrate controlled access to reusable knowledge.

### Judge takeaway

SETU is not merely a complaint portal.

It is a **closed-loop societal innovation engine** that converts local
problems into measurable and reusable solutions.

------------------------------------------------------------------------

# 15. Controlled Access Innovation Repository

The repository turns successful SETU projects into reusable
institutional knowledge.

## Tier 1 --- Public

Potential content:

-   problem summary,
-   impact summary,
-   verified metrics,
-   deployment overview,
-   high-level specifications,
-   applicable locations/domains.

## Tier 2 --- Academic

Potential content:

-   schematics,
-   code,
-   CAD,
-   technical documentation,
-   deployment guides.

Access is restricted to authorized academic/project users.

## Tier 3 --- Confidential

Potential content:

-   raw sensitive source material,
-   proprietary algorithms,
-   confidential technical details,
-   patent-related material.

Access is restricted to authorized rights holders.

## Smart Reuse

For a new challenge:

1.  identify semantic similarity,
2.  search the repository,
3.  surface prior verified solutions,
4.  explain why the prior solution may be relevant,
5.  allow the new team to request appropriate access.

This creates a compounding knowledge loop.

------------------------------------------------------------------------

# 16. IP Framework

SETU should provide a standard **proposed IP policy template**, not
claim universal legal ownership.

Potential policy concepts:

1.  Background IP remains with its existing owner.
2.  Foreground IP ownership is defined by the participating institutions
    and signed agreement.
3.  Government/public-good usage rights may be granted through an agreed
    license.
4.  Industry/CSR commercialization rights, if any, must be contractually
    defined.
5.  Open-source or Creative Commons release may be selected where
    appropriate.

Actual ownership must follow:

-   signed agreements,
-   institutional policy,
-   applicable law,
-   project-specific contracts.

------------------------------------------------------------------------

# 17. Citizen Experience

## Design

**Responsive Web + PWA**

### Principles

-   mobile-first,
-   Hindi/English toggle,
-   simple language,
-   photo-first evidence,
-   browser geolocation,
-   guided form,
-   low-bandwidth optimization,
-   visible status tracking.

### MVP

Online-first, but designed to tolerate weak connectivity.

### Post-MVP

Potential expansion:

-   offline submission queue,
-   voice-to-text,
-   regional languages,
-   additional local-language support.

The SIH material also identifies multilingual support, PWA/mobile
evolution and GIS capabilities as future expansion areas.

------------------------------------------------------------------------

# 18. Privacy & Citizen Identity

Recommended MVP model:

**Mobile number + OTP**

No mandatory password or email registration for basic challenge
submission.

## Data separation

### Private

-   phone number,
-   exact coordinates,
-   account/profile information,
-   sensitive uploaded evidence.

### Public

-   anonymized challenge summary,
-   coarsened location,
-   validated non-sensitive evidence.

### Anonymous-to-public mode

A citizen may submit without exposing identity publicly.

Authorized government/moderator users can access the identity when
operationally required.

## Protection principles

-   RBAC,
-   encryption in transit and at rest,
-   signed temporary media URLs,
-   upload scanning,
-   access logging,
-   retention/deletion policy,
-   rate limiting,
-   CAPTCHA,
-   minimized public location precision.

The SIH source specifically recommends minimum-necessary data,
public/private separation, RBAC, encryption, signed URLs, access logging
and retention/deletion controls.

------------------------------------------------------------------------

# 19. Anti-Spam & Challenge Quality

SETU optimizes for **validated actionable challenges**, not maximum
submission count.

Controls include:

-   OTP verification,
-   rate limiting,
-   CAPTCHA,
-   evidence requirements,
-   duplicate similarity,
-   anomaly detection,
-   moderation,
-   structured rejection/clarification reasons.

A configurable pilot policy may cap submissions per phone within a time
window; the exact threshold should remain configurable.

------------------------------------------------------------------------

# 20. Notification & SLA Engine

## MVP Channels

-   in-app,
-   SMS,
-   email.

## Event-driven notifications

Examples:

**Challenge submitted → submission confirmation**

**Challenge validated → status update**

**Challenge routed → university notification**

**Student application → faculty notification**

**Proposal approved → partner notification**

**Pilot completed → verification request**

## SLA Escalation

Example policy:

-   **72h idle validation:** warning to moderator.
-   **7d accepted challenge without team/mentor:** escalate to higher
    academic coordinator.
-   **14d pending proposal/pilot verification:** government/program
    stalled alert.

These are configurable operational targets, not immutable platform
rules.

------------------------------------------------------------------------

# 21. Government Executive Dashboard

The dashboard has four analytical layers.

## 21.1 Problem Intelligence

-   district heatmaps,
-   sector/domain distribution,
-   emerging hotspots,
-   duplicate trends.

## 21.2 Innovation Pipeline

-   submitted,
-   validated,
-   matched,
-   accepted,
-   prototype,
-   pilot,
-   verified,
-   closed.

It also highlights:

-   aging challenges,
-   stalled projects,
-   overdue actions.

## 21.3 Ecosystem & Capital

-   universities,
-   faculty,
-   students,
-   partners,
-   CSR commitments,
-   CSR disbursement,
-   lab/resource utilization.

## 21.4 Social Impact

-   beneficiaries,
-   verified outcomes,
-   domain-specific improvements,
-   technology transfer,
-   solution replication.

------------------------------------------------------------------------

# 22. Conceptual Data Model

Core entities:

### Users

Identity, role, organization, verification state.

### Organizations

Government bodies, universities, industry/CSR organizations, local
institutions.

### Challenges

Problem statement, domain, location, urgency, status, ownership.

### Evidence

Images, video, documents, geolocation and validation metadata.

### Reviews

Moderator decisions, reasons, timestamps.

### Matches

Challenge-to-university recommendations, scores and explanations.

### Projects

Academic project connected to a challenge.

### Project Members

Students, faculty and authorized collaborators.

### Milestones

Proposal, prototype, testing, pilot and verification stages.

### Partnerships

Industry/CSR involvement and commitments.

### Outcomes

Baseline, post-intervention metrics, beneficiary data and verification
state.

### Audit Logs

Role/action/time/object/reason history.

### Repository Assets

Reusable technical and impact knowledge with access tiers.

------------------------------------------------------------------------

# 23. Recommended Technical Architecture

## Frontend

**Next.js / React**

Why:

-   strong responsive web experience,
-   PWA-compatible architecture,
-   suitable for role-based workspaces,
-   fast iteration during SIH,
-   reusable component system.

## Application Layer

**Node.js**

Recommended architecture:

-   modular backend,
-   clearly separated domain/service boundaries,
-   REST/typed API contracts where appropriate,
-   background jobs for asynchronous workloads.

For SIH, avoid premature full microservices.

Design the modules so that they can later be extracted into services.

## Database

**PostgreSQL**

Responsibilities:

-   transactional data,
-   relationships,
-   workflow state,
-   audit records,
-   organization/tenant isolation.

Use strong authorization boundaries and PostgreSQL Row-Level Security
where appropriate.

## Cache / Queue

**Redis**

Use for:

-   caching,
-   rate limiting,
-   short-lived state,
-   background job coordination where appropriate.

## Object Storage

**S3-compatible object storage**

Use for:

-   photos,
-   videos,
-   documents,
-   project evidence,
-   technical assets.

Do not store large media directly in PostgreSQL.

## AI Services

**Python + FastAPI**

Keep AI workloads isolated from the core transactional application.

Primary capabilities:

-   NLP structuring,
-   semantic deduplication,
-   prioritization,
-   university matching,
-   solution retrieval,
-   Copilot generation.

## Delivery

Use:

-   CDN,
-   containerized deployment,
-   CI/CD,
-   monitoring,
-   backups,
-   audit logging.

------------------------------------------------------------------------

# 24. Architecture Philosophy

The architecture should support three stages.

## Stage 1 --- Focused Pilot

Three representative Jharkhand districts:

-   Ranchi,
-   Dhanbad,
-   West Singhbhum.

Seed institutions may include:

-   BIT Mesra,
-   IIT (ISM) Dhanbad,
-   Birsa Agricultural University.

These should be represented as **proposed/seeded demo participants**,
not claimed as confirmed platform partners unless formally established.

## Stage 2 --- Statewide

Expand to all Jharkhand districts.

Architecture characteristics:

-   stateless application tier,
-   background workers,
-   CDN/object storage,
-   scalable PostgreSQL architecture,
-   isolated AI services,
-   logical tenant boundaries.

## Stage 3 --- National Federation

Long-term architecture:

**State SETU Instances → National SETU Gateway / APIs → Cross-State
Innovation Repository**

This enables:

-   federation,
-   cross-state solution discovery,
-   common APIs,
-   state-specific governance,
-   national innovation reuse.

------------------------------------------------------------------------

# 25. Multi-Tenancy

The MVP should use:

**One centralized platform + logical multi-tenancy**

Tenant dimensions may include:

-   state,
-   district,
-   organization,
-   program.

Tenant IDs should be embedded into authorization and data-access
boundaries from the beginning.

This makes statewide and future national expansion possible without
rebuilding the core platform.

------------------------------------------------------------------------

# 26. Scalability Strategy

Potential bottlenecks at very high submission volumes:

-   media uploads,
-   API traffic,
-   database writes,
-   duplicate detection,
-   AI processing.

Recommended strategy:

### Uploads

Direct object-storage upload + CDN.

### APIs

Stateless application servers behind a load balancer.

### AI

Asynchronous processing after submission.

### Database

Proper indexes, caching, read scaling and eventual partitioning when
justified.

### Queues

Process AI and heavy workloads asynchronously.

### User experience

Return a submission ID quickly rather than making citizens wait for AI
processing.

The SIH material specifically identifies these scaling concerns and
recommends object storage, queues, stateless APIs, caching/indexing and
isolated AI processing.

------------------------------------------------------------------------

# 27. Security Architecture

## Identity

-   OTP for low-friction citizen authentication,
-   stronger organizational authentication for privileged users,
-   role-based access.

## Authorization

Roles should determine:

-   what a user can see,
-   what they can change,
-   what evidence they can access,
-   which approvals they can perform.

## Auditability

Log:

-   AI recommendations,
-   human overrides,
-   challenge decisions,
-   routing decisions,
-   project approvals,
-   funding/support changes,
-   verification decisions,
-   IP/access changes.

## Sensitive evidence

Use:

-   encrypted storage,
-   signed URLs,
-   controlled access,
-   expiry,
-   access logs.

## Operational security

-   rate limiting,
-   CAPTCHA,
-   input validation,
-   malware scanning,
-   backups,
-   monitoring,
-   CI/CD security controls.

------------------------------------------------------------------------

# 28. AI Governance

SETU should treat AI as a **decision-support system**, not a
decision-maker.

## Universal AI Decision Card

Every governance recommendation follows:

**Recommendation → Confidence → Evidence → Reasoning Factors → Accept /
Override → Audit**

## AI failure handling

If AI confidence is low:

-   flag for manual review,
-   do not force classification,
-   allow human correction.

If AI service is unavailable:

-   challenge submission still works,
-   deterministic rules continue,
-   AI tasks are queued for later processing.

This graceful-degradation strategy prevents AI from becoming a single
point of failure.

------------------------------------------------------------------------

# 29. Adaptive Matching

University rejection feedback should improve future recommendations.

Examples:

**Rejected because workload is high**

→ temporarily reduce that institution's suitability for similar routing
until capacity changes.

**Rejected because lab unavailable**

→ treat that capability as unavailable for relevant challenges.

**Rejected because domain expertise is insufficient**

→ lower the relevant capability dimension.

Important:

> One rejection should not permanently rewrite the global matching
> model.

Feedback should be contextual and reversible.

------------------------------------------------------------------------

# 30. Operating Model

## Government / Program Authority

Owns:

-   program governance,
-   policy,
-   moderator network,
-   impact reporting,
-   district/state oversight.

## Universities

Own:

-   academic project execution,
-   faculty mentorship,
-   student teams,
-   technical validation,
-   prototype development.

## Industry / CSR

Contribute:

-   capital,
-   mentorship,
-   testing,
-   deployment,
-   manufacturing,
-   technology-transfer support.

## SETU Platform

Provides:

-   coordination,
-   workflow,
-   evidence,
-   matching,
-   notifications,
-   governance,
-   analytics,
-   auditability,
-   knowledge reuse.

------------------------------------------------------------------------

# 31. Sustainability / Funding Model

Potential operating funding sources:

-   government department/program budgets,
-   innovation funds,
-   institutional programs,
-   CSR programs,
-   ecosystem partnerships.

The platform should remain deployable as a cloud-hosted
government/program infrastructure rather than being structurally
dependent on one private partner.

------------------------------------------------------------------------

# 32. Flagship Pilot Geography

The proposed pilot uses three representative districts to demonstrate
different problem environments.

## Ranchi

Representative themes:

-   urban infrastructure,
-   sanitation,
-   civic services,
-   higher-tech innovation.

Potential academic capability:

-   software,
-   electronics,
-   IoT,
-   robotics,
-   urban infrastructure.

## Dhanbad

Representative themes:

-   mining,
-   industrial safety,
-   environmental problems,
-   water/pollution,
-   MSME/industrial challenges.

Potential academic capability:

-   mining,
-   environmental engineering,
-   civil,
-   industrial systems.

## West Singhbhum / Chaibasa

Representative themes:

-   rural livelihoods,
-   agriculture,
-   healthcare,
-   water,
-   community development.

The SIH material supports a phased scope and explicitly frames statewide
and later nationwide expansion as a future path.

------------------------------------------------------------------------

# 33. Suggested Seed Ecosystem

Potential seeded/demo institutions:

-   BIT Mesra, Ranchi
-   IIT (ISM) Dhanbad
-   Birsa Agricultural University, Ranchi

Potential government/program stakeholders:

-   Department of Higher & Technical Education, Government of Jharkhand
-   technology/e-governance stakeholders
-   district administrations/local urban bodies

Potential industry/CSR examples:

-   Tata ecosystem,
-   BCCL/CCL,
-   local MSME clusters,
-   CSR foundations.

These names should be presented in the SIH prototype as
**illustrative/seeded ecosystem participants unless formal authorization
or partnership exists**.

------------------------------------------------------------------------

# 34. MVP vs Future Roadmap

## MVP

### Citizen

-   OTP login,
-   Hindi/English,
-   structured challenge wizard,
-   evidence upload,
-   location,
-   challenge tracking.

### AI

-   problem structuring,
-   semantic duplicate suggestions,
-   priority assistance,
-   capability matching,
-   explainable recommendation cards.

### Moderator

-   validation queue,
-   evidence review,
-   deduplication,
-   routing,
-   AI override.

### University

-   challenge acceptance,
-   team formation,
-   faculty mentor,
-   proposal,
-   Copilot kickoff brief,
-   project milestones.

### Industry/CSR

-   partner participation,
-   support commitment,
-   mentor role,
-   milestone collaboration.

### Government

-   pipeline dashboard,
-   district/domain analytics,
-   stalled-project alerts,
-   verified outcomes.

### Verification

-   academic evidence,
-   community confirmation,
-   institutional sign-off.

## Post-MVP

Potential additions:

-   native mobile applications,
-   offline-first submission,
-   voice interfaces,
-   regional languages,
-   WhatsApp/IVR,
-   advanced GIS,
-   sophisticated recommendation systems,
-   funding marketplace,
-   MoU automation,
-   procurement workflows,
-   APIs/SSO,
-   outcome verification integrations,
-   portfolio analytics,
-   national federation.

These future modules are aligned with expansion directions identified in
the SIH material.

------------------------------------------------------------------------

# 35. Key Product Challenges & Solutions

  -----------------------------------------------------------------------
  Challenge                           SETU Response
  ----------------------------------- -----------------------------------
  Vague citizen complaints            Guided structured wizard + AI
                                      extraction

  Duplicate submissions               Semantic + location-aware
                                      similarity

  AI misrouting                       Explainable score + human override

  University rejection                Structured reason + reassignment

  Fake submissions                    OTP + CAPTCHA + rate limits +
                                      evidence

  Sensitive citizen data              Private/public separation + RBAC

  Project stagnation                  SLA engine + stalled alerts

  Fake impact claims                  Triangle of Trust

  IP disputes                         Explicit agreement and access tiers

  Large submission volumes            Async AI + queues + object storage

  Becoming a grievance repository     Ownership + next action + lifecycle

  Repeated innovation                 Controlled reusable repository

  AI outage                           Graceful degradation

  Premature architecture complexity   Modular monolith first
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# 36. UX Design System

SETU should not look like one generic admin dashboard.

Each workspace has a distinct visual priority.

## Citizen

**Simple + trustworthy + status-focused**

Primary visual hierarchy:

1.  Submit problem
2.  Evidence
3.  Location
4.  Status
5.  Verification/result

## Moderator

**Dense + governance-oriented**

Primary visual hierarchy:

1.  Validation queue
2.  AI decision card
3.  Evidence
4.  Duplicate candidates
5.  University ranking
6.  Override/audit

## University

**Project-management + innovation-oriented**

Primary visual hierarchy:

1.  Challenge
2.  Team
3.  Copilot
4.  Proposal
5.  Milestones
6.  Testing
7.  Pilot
8.  Outcome

## Government

**Macro + analytical**

Primary visual hierarchy:

1.  Problem hotspots
2.  Pipeline
3.  Stalled projects
4.  Capital/ecosystem
5.  Verified outcomes

------------------------------------------------------------------------

# 37. Performance Targets

Performance targets should be treated as **engineering objectives**, not
claims.

Potential targets:

-   fast first interaction on mobile networks,
-   compressed citizen media,
-   asynchronous AI processing,
-   lightweight JSON payloads,
-   responsive dashboards,
-   direct object-storage uploads.

Actual numbers such as page-load time or upload size should be validated
through benchmarking before being presented as achieved performance.

------------------------------------------------------------------------

# 38. Observability & Operations

The platform should monitor:

### Application

-   API latency,
-   error rates,
-   request volume,
-   authentication failures.

### AI

-   processing latency,
-   confidence distributions,
-   override rates,
-   model failure rates.

### Workflow

-   queue aging,
-   SLA breaches,
-   stalled projects,
-   verification delays.

### Infrastructure

-   CPU/memory,
-   database health,
-   queue depth,
-   object storage,
-   backup status.

### Impact

-   validated challenges,
-   pilots,
-   verified deployments,
-   beneficiaries,
-   VSOs.

------------------------------------------------------------------------

# 39. Implementation Milestones

## Milestone 1 --- Foundation

-   UX shell,
-   authentication,
-   RBAC,
-   organizations,
-   challenge entity,
-   basic database.

## Milestone 2 --- Citizen + Moderator

-   submission wizard,
-   evidence,
-   location,
-   validation queue,
-   status transitions.

## Milestone 3 --- AI Governance

-   structuring,
-   deduplication,
-   priority assistance,
-   university matching,
-   Decision Card.

## Milestone 4 --- University Workspace

-   acceptance,
-   teams,
-   faculty mentor,
-   proposal,
-   milestones,
-   Copilot.

## Milestone 5 --- Industry / CSR

-   partner onboarding,
-   support workflow,
-   commitments,
-   collaboration.

## Milestone 6 --- Verification

-   evidence submission,
-   citizen confirmation,
-   institutional sign-off,
-   Verified Deployment.

## Milestone 7 --- Executive Dashboard

-   pipeline,
-   district analytics,
-   funding,
-   stalled alerts,
-   VSO counter.

## Milestone 8 --- Reuse Engine

-   repository,
-   access tiers,
-   semantic retrieval,
-   prior-solution recommendation.

------------------------------------------------------------------------

# 40. SIH Demo Priority

For the actual SIH demonstration, reliability matters more than breadth.

The demo should prioritize:

1.  Citizen submission working end-to-end.
2.  Moderator validation working end-to-end.
3.  AI recommendations visibly explainable.
4.  University routing working.
5.  Project creation and Copilot working.
6.  CSR collaboration working.
7.  Pilot/verification lifecycle visible.
8.  Dashboard updating from lifecycle state.
9.  Prior-solution reuse creating the final "wow" moment.

Avoid spending the demo on:

-   complex configuration,
-   excessive settings,
-   deep infrastructure screens,
-   dozens of minor features.

The judges should understand the transformation within seconds.

------------------------------------------------------------------------

# 41. The 7-Minute Story

## 0:00--1:00

**A citizen reports a real problem.**

Hindi PWA → evidence → location → Challenge ID.

## 1:00--2:30

**SETU understands and validates it.**

AI structuring → duplicate detection → priority → capability match →
human approval.

## 2:30--4:00

**The university becomes an execution engine.**

Coordinator → faculty → students → Copilot → proposal.

## 4:00--5:00

**Industry makes the solution deployable.**

CSR → funding/support → mentor → prototype → pilot.

## 5:00--6:00

**SETU proves the result.**

Academic evidence → citizen confirmation → institutional audit →
Verified Deployment.

## 6:00--7:00

**SETU learns and reuses.**

New problem → prior verified solution → controlled technical reuse.

### Final statement

> **"SETU doesn't stop when a problem is submitted. It stops when the
> problem is solved --- and verified."**

------------------------------------------------------------------------

# 42. Judge-Facing Differentiation

If asked:

## "Isn't this just a grievance portal?"

Answer:

> No. A grievance portal ends at submission or administrative
> resolution. SETU creates a persistent accountable bridge from
> community challenge to capable university, academic project, industry
> enablement, field pilot and independently verified outcome.

## "Why AI?"

> AI is used where language and semantic complexity make deterministic
> rules insufficient: structuring, duplicate discovery, prioritization,
> capability ranking and knowledge retrieval. Humans retain authority.

## "What if AI is wrong?"

> Every governance recommendation is explainable and overridable.
> Overrides are logged. The platform can continue operating without AI
> if the AI service fails.

## "How do you prove impact?"

> Through the Triangle of Trust: technical evidence, affected-community
> confirmation and institutional verification.

## "How do you stop SETU becoming a complaint database?"

> Every validated challenge receives an owner, lifecycle state, next
> action and accountability path. Success is measured by Verified
> Societal Outcomes, not submission volume.

## "What happens after one solution succeeds?"

> SETU converts the project into controlled reusable knowledge and
> surfaces it when semantically similar problems appear elsewhere.

------------------------------------------------------------------------

# 43. North Star Dashboard

The executive dashboard should make the North Star immediately visible.

## Primary card

**VERIFIED SOCIETAL OUTCOMES**

**127**

Secondary indicators:

-   beneficiaries reached,
-   verified deployments,
-   solution replication,
-   active pilots.

Then show the funnel:

**Challenges → Validated → Matched → Projects → Prototypes → Pilots →
Verified Outcomes**

This visually communicates the central thesis:

> **SETU converts problems into outcomes.**

------------------------------------------------------------------------

# 44. Success Definition

SETU succeeds when the system demonstrates that it can repeatedly:

1.  discover a genuine societal problem,
2.  structure it into an actionable challenge,
3.  validate it,
4.  identify the right solving capability,
5.  form an accountable academic team,
6.  attract execution support,
7.  move from prototype to pilot,
8.  verify the result,
9.  measure impact,
10. reuse the resulting knowledge elsewhere.

The platform should therefore optimize the **conversion rate through the
lifecycle**, not merely the size of the top of the funnel.

------------------------------------------------------------------------

# 45. Final Product Architecture

At the highest level:

``` text
                    CITIZENS / COMMUNITIES
                            │
                            ▼
                 ┌──────────────────────┐
                 │  PROBLEM DISCOVERY   │
                 │  Structured Intake   │
                 │  Evidence + Location│
                 └──────────┬───────────┘
                            ▼
                 ┌──────────────────────┐
                 │ AI + HUMAN VALIDATION│
                 │ Dedup / Priority /   │
                 │ Structuring          │
                 └──────────┬───────────┘
                            ▼
                 ┌──────────────────────┐
                 │ CAPABILITY MATCHING  │
                 │ University Ranking   │
                 └──────────┬───────────┘
                            ▼
                 ┌──────────────────────┐
                 │ UNIVERSITY PROJECT   │
                 │ Faculty + Students   │
                 │ R&D + Copilot        │
                 └──────────┬───────────┘
                            ▼
                 ┌──────────────────────┐
                 │ INDUSTRY / CSR       │
                 │ Funding + Expertise  │
                 └──────────┬───────────┘
                            ▼
                 ┌──────────────────────┐
                 │ PROTOTYPE → PILOT    │
                 └──────────┬───────────┘
                            ▼
                 ┌──────────────────────┐
                 │ TRIANGLE OF TRUST    │
                 │ Academic + Community │
                 │ + Institutional      │
                 └──────────┬───────────┘
                            ▼
                 ┌──────────────────────┐
                 │ VERIFIED OUTCOME     │
                 │       VSO +1         │
                 └──────────┬───────────┘
                            ▼
                 ┌──────────────────────┐
                 │ KNOWLEDGE REPOSITORY │
                 │ CONTROLLED REUSE     │
                 └──────────┬───────────┘
                            │
                            └──────► NEXT CHALLENGE
```

------------------------------------------------------------------------

# 46. Final Technology Blueprint

  Layer            Recommended Direction
  ---------------- -------------------------------------------------------
  Citizen/Web UI   Next.js + React
  PWA              Browser/PWA capabilities
  Core Backend     Node.js modular application
  Database         PostgreSQL
  Authorization    RBAC + tenant boundaries + RLS where appropriate
  Cache/Queues     Redis + background workers
  Media            S3-compatible object storage
  Delivery         CDN + signed URLs
  AI               Python/FastAPI isolated services
  AI Search        Vector/semantic retrieval
  Notifications    Email + SMS + in-app
  Maps             Geolocation + mapping/geocoding provider
  Deployment       Containerized cloud deployment
  Monitoring       Application + infrastructure + workflow observability
  Security         Encryption, rate limits, audit logs, upload scanning
  Scale Path       Modular backend → scalable services → federation

This is a recommendation for the architecture; the exact cloud vendor
and individual managed services can be selected during implementation
based on SIH constraints, cost and available credits.

------------------------------------------------------------------------

# 47. Final Strategic Positioning

SETU should be presented as:

> **A governed innovation-to-impact network for societal problems.**

Not:

-   a complaint portal,
-   a student project marketplace,
-   a CSR directory,
-   an AI chatbot,
-   a government dashboard.

Those are components.

The product is the **closed-loop system connecting all of them**.

Its strongest strategic loop is:

**Problem → Capability → Innovation → Execution → Verification →
Knowledge → Reuse**

And its strongest measurable promise is:

> **Every verified outcome becomes an asset that can help solve the next
> problem.**

------------------------------------------------------------------------

# 48. Important Assumptions & Demo-Data Policy

The SIH problem statement supports the overall platform workflow,
modules, architecture direction, human-in-loop AI, capability matching,
lifecycle management, privacy principles and impact-oriented
measurement.

The following should be treated as **prototype/demo assumptions unless
independently verified**:

-   specific institutional partnerships,
-   specific CSR commitments,
-   exact grant amounts,
-   exact laboratory measurements,
-   exact similarity percentages,
-   exact beneficiary counts,
-   exact pilot results,
-   named officials or formal government approvals.

Similarly, numbers shown in wireframes or the SIH demo should be
visually labeled as **demo data** unless backed by real evidence.

This distinction protects SETU's credibility: the prototype demonstrates
the mechanism, while the real deployment would populate it with verified
data.

------------------------------------------------------------------------

# 49. Final One-Line Definition

> **SETU is a human-governed, AI-assisted platform that turns verified
> societal problems into university-led innovations, industry-enabled
> pilots and independently verified real-world outcomes --- then makes
> those solutions reusable.**

## North Star

**Verified Societal Outcomes (VSOs)**

## Hero Demo

**West Singhbhum Water Problem → IIT (ISM) → CSR → Pilot → Triangle of
Trust → Verified Impact → Reuse**

## Core Differentiator

**Closed-loop accountability from problem discovery to verified societal
impact.**
