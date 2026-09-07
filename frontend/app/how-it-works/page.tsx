'use client';

import React, { createContext, useContext, useId, useState } from 'react';
import Link from 'next/link';
import StaggeredMenu from '@/components/StaggeredMenu';
import SiteFooter from '@/components/SiteFooter';
import FadeContent from '@/components/FadeContent';
import ClickSpark from '@/components/ClickSpark';
import { STAGGERED_MENU_ITEMS, STAGGERED_SOCIAL_ITEMS } from '@/lib/setu-data';
import { ArrowRight } from 'lucide-react';
import { useAuthModal } from '@/context/AuthModalContext';
import {
  useEnterOnce,
  useJourneyProgress,
  usePageLenis,
  useReducedMotion,
} from './usePageMotion';
import './how-it-works.css';

const MotionContext = createContext<boolean>(false);

interface StageItem {
  number: string;
  title: string;
  icon: string;
  description: string;
  previewLabel: string;
  preview: string;
  detail: string;
  fields: [string, string][];
  output: string;
}

const STAGES: StageItem[] = [
  {
    number: '01',
    title: 'Report',
    icon: 'pin',
    description: 'Start with the problem as your community experiences it.',
    previewLabel: 'COMMUNITY INPUT',
    preview: 'Description · GPS · Evidence',
    detail: 'Describe what is happening, where it happens, and who it affects.',
    fields: [
      ['Capture', 'Description and relevant local context'],
      ['Locate', 'Location or GPS coordinates'],
      ['Support', 'Photos and other available evidence'],
    ],
    output: 'A grounded problem report',
  },
  {
    number: '02',
    title: 'Structure',
    icon: 'structure',
    description: 'Turn a messy report into an actionable engineering brief.',
    previewLabel: 'AI-ASSISTED OUTPUT',
    preview: 'Domain · Constraints · Capabilities',
    detail: 'AI helps organise the report into a challenge that technical teams can assess.',
    fields: [
      ['Understand', 'Domain, location and severity'],
      ['Define', 'Constraints and required capabilities'],
      ['Explore', 'Potential solution directions'],
    ],
    output: 'An engineering-ready challenge, ready for review',
  },
  {
    number: '03',
    title: 'Match',
    icon: 'match',
    description: 'Connect the challenge with relevant technical capabilities.',
    previewLabel: 'CAPABILITY ALIGNMENT',
    preview: 'Expertise · Resources · Geography',
    detail: 'Identify universities, faculty, student teams, research groups or industry capabilities suited to the challenge.',
    fields: [
      ['Expertise', 'Domain knowledge and technical capabilities'],
      ['Feasibility', 'Resources and geographic relevance'],
      ['Fit', 'Research or project relevance'],
    ],
    output: 'Relevant teams to evaluate',
  },
  {
    number: '04',
    title: 'Build',
    icon: 'build',
    description: 'Move from an idea to a prototype, then into the field.',
    previewLabel: 'DEVELOPMENT PATH',
    preview: 'Idea → Prototype → Field pilot',
    detail: 'University, faculty and student teams develop a solution, with possible support from industry or CSR partners.',
    fields: [
      ['Design', 'A solution shaped by local constraints'],
      ['Prototype', 'A testable engineering implementation'],
      ['Enable', 'Potential funding, mentorship or deployment support'],
    ],
    output: 'A solution ready for field testing',
  },
  {
    number: '05',
    title: 'Verify',
    icon: 'check',
    description: 'Establish what changed through evidence and community input.',
    previewLabel: 'EVIDENCE REQUIREMENT',
    preview: 'Field data + Community confirmation',
    detail: 'Test the solution where the problem exists. A completed prototype is not, by itself, a verified outcome.',
    fields: [
      ['Test', 'Real conditions and location context'],
      ['Document', 'Photos, observations and measurements'],
      ['Confirm', 'Community feedback and outcome review'],
    ],
    output: 'A Verified Societal Outcome, when supported by evidence',
  },
];

const DEMO_STEPS: [string, string][] = [
  ['Community', 'Problem submitted'],
  ['SETU AI', 'Problem structured'],
  ['Capability match', 'Relevant university/team identified'],
  ['University', 'Prototype developed'],
  ['Field pilot', 'Tested under real conditions'],
  ['Verification', 'Evidence + community confirmation'],
];

const CAPABILITIES = [
  'IoT',
  'Environmental Engineering',
  'Data Analytics',
];

const EVIDENCE: [string, string, string][] = [
  ['pin', 'Location / GPS context', 'Connect the test to the place it serves.'],
  ['camera', 'Field evidence', 'Document the solution in real conditions.'],
  ['chart', 'Measurements / data', 'Assess change against the problem.'],
  ['message', 'Community feedback', 'Hear from the people affected.'],
  ['check', 'Outcome verification', 'Review the evidence before closing the loop.'],
];

function Icon({ name, className = '' }: { name: string; className?: string }) {
  const paths: Record<string, React.ReactNode> = {
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    pin: (
      <>
        <path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    structure: (
      <>
        <path d="M8 5h12M8 12h12M8 19h12" />
        <path d="M3 5h1M3 12h1M3 19h1" />
      </>
    ),
    match: (
      <>
        <rect x="2" y="8" width="6" height="8" rx="1" />
        <rect x="16" y="2" width="6" height="6" rx="1" />
        <rect x="16" y="16" width="6" height="6" rx="1" />
        <path d="M8 12h4M12 5v14M12 5h4M12 19h4" />
      </>
    ),
    build: (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path d="M3 8v9l9 5 9-5V8M12 13v9" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    water: (
      <path d="M12 2S4 10 4 15a8 8 0 0 0 16 0c0-5-8-13-8-13Z" />
    ),
    camera: (
      <>
        <path d="M3 7h4l2-3h6l2 3h4v14H3Z" />
        <circle cx="12" cy="13" r="3" />
      </>
    ),
    chart: (
      <>
        <path d="M3 3v18h18M7 16v-4M12 16V7M17 16v-7" />
      </>
    ),
    message: (
      <>
        <path d="M3 3h18v14H8l-5 4V3Z" />
        <path d="M7 8h10M7 12h6" />
      </>
    ),
    replay: (
      <>
        <path d="M3 4v6h6M3 10a9 9 0 1 1 1 8" />
      </>
    ),
  };

  return (
    <svg
      className={`setu-icon ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name] || paths.structure}
    </svg>
  );
}

function Reveal({ children }: { children: React.ReactNode }) {
  const reducedMotion = useContext(MotionContext);

  if (reducedMotion) return <div>{children}</div>;

  return (
    <FadeContent
      blur={false}
      duration={500}
      easing="ease-out"
      initialOpacity={0}
      threshold={0.1}
    >
      {children}
    </FadeContent>
  );
}

function Section({
  id,
  number,
  label,
  title,
  className = '',
  children,
}: {
  id: string;
  number: string;
  label: string;
  title: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`setu-section ${className}`}
      aria-labelledby={`${id}-title`}
    >
      <div className="setu-container">
        <header className="section-heading">
          <p className="eyebrow">
            <span>{number}</span>
            {label}
          </p>
          <h2 id={`${id}-title`}>{title}</h2>
        </header>
        {children}
      </div>
    </section>
  );
}

function Flow({ items, className = '', label }: { items: string[]; className?: string; label: string }) {
  return (
    <ol
      className={`setu-flow ${className}`}
      style={{ '--flow-count': items.length } as React.CSSProperties}
      aria-label={label}
    >
      {items.map((item, index) => (
        <li key={`${item}-${index}`}>
          <span className="flow-marker" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

function DemoBadge({ children = 'Demonstration case' }: { children?: React.ReactNode }) {
  return <span className="demo-badge">{children}</span>;
}

function Hero() {
  return (
    <section className="setu-hero" aria-labelledby="setu-hero-title">
      <div className="setu-container">
        <div className="hero-topline">
          <p className="eyebrow">
            <span className="brand-mark" aria-hidden="true">S</span>
            SETU / HOW IT WORKS
          </p>
          <span className="hero-aside">Community → Engineering → Proof</span>
        </div>

        <Reveal>
          <h1 id="setu-hero-title">
            FROM REPORT
            <br />
            TO <span>RESULT</span><span className="hero-period">.</span>
          </h1>
        </Reveal>

        <div className="hero-bottom">
          <p className="hero-description">
            SETU turns real community problems into engineering-ready
            challenges — then connects them to the capabilities needed
            to solve them.
          </p>
          <a className="text-link" href="#setu-journey">
            Explore the process <Icon name="arrow" />
          </a>
        </div>

        <Flow
          className="hero-flow"
          label="The five stages of SETU"
          items={STAGES.map((stage) => stage.title)}
        />

        <p className="hero-footnote">
          Not just a complaint portal. A pathway to building solutions.
        </p>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <Section
      id="setu-problem"
      number="02"
      label="THE MISSING CONNECTION"
      title="A COMPLAINT IS NOT A SOLUTION."
      className="problem-section"
    >
      <div className="problem-layout">
        <div className="broken-path" aria-label="The gap after reporting">
          <div className="problem-node">
            <span className="small-label">THE PEOPLE</span>
            <strong>Community</strong>
          </div>
          <span className="vertical-connector" aria-hidden="true" />
          <div className="problem-node compact-node">Problem reported</div>
          <span className="vertical-connector dashed" aria-hidden="true" />
          <div className="missing-node">
            <span aria-hidden="true">?</span>
            <div>
              <strong>Then what?</strong>
              <p>No clear path to expertise, engineering or deployment.</p>
            </div>
          </div>
        </div>

        <div className="bridge-statement">
          <span className="small-label">THIS IS WHERE SETU COMES IN</span>
          <p>
            The problem isn’t always a lack of ideas.
            <br />
            <span>It’s the missing bridge.</span>
          </p>
          <div className="bridge-visual" aria-hidden="true">
            <span>PEOPLE</span>
            <i />
            <b>SETU</b>
            <i />
            <span>CAPABILITY</span>
          </div>
          <p className="body-copy">
            SETU creates the missing bridge between the people who experience
            problems and the people who can engineer solutions.
          </p>
        </div>
      </div>
    </Section>
  );
}

function Journey() {
  const [selected, setSelected] = useState(0);
  const reducedMotion = useContext(MotionContext);
  const progressRef = useJourneyProgress<HTMLDivElement>(reducedMotion);
  const panelId = useId();
  const stage = STAGES[selected];

  return (
    <Section
      id="setu-journey"
      number="03"
      label="THE SETU JOURNEY"
      title="FIVE STEPS. ONE COMPLETE PATH."
    >
      <div className="section-subline">
        <p>Select a stage to inspect the workflow.</p>
        <span className="small-label">FROM LOCAL CONTEXT TO FIELD EVIDENCE</span>
      </div>

      <div className="journey" ref={progressRef}>
        <div className="journey-rail" aria-hidden="true">
          <span />
        </div>

        <ol className="journey-grid" aria-label="Explore SETU stages">
          {STAGES.map((item, index) => (
            <li key={item.title}>
              <button
                type="button"
                className={`journey-step ${selected === index ? 'is-selected' : ''}`}
                aria-pressed={selected === index}
                aria-controls={panelId}
                onClick={() => setSelected(index)}
              >
                <span className="stage-top">
                  <span className="stage-number">{item.number}</span>
                  <Icon name={item.icon} />
                </span>
                <strong className="stage-title">{item.title}</strong>
                <span className="stage-description">{item.description}</span>
                <span className="stage-preview">
                  <span className="small-label">{item.previewLabel}</span>
                  <span>{item.preview}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div
        id={panelId}
        className="journey-detail"
        role="region"
        aria-label="Selected stage details"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="journey-detail-intro">
          <span className="small-label">
            INSIDE STAGE {stage.number} / {stage.title.toUpperCase()}
          </span>
          <h3>{stage.detail}</h3>
        </div>

        <div className="journey-detail-data" key={stage.title}>
          <dl>
            {stage.fields.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <p className="stage-output">
            <span className="small-label">OUTPUT</span>
            <span>{stage.output}</span>
          </p>
        </div>
      </div>
    </Section>
  );
}

function AIInAction() {
  const ref = useEnterOnce<HTMLDivElement>();
  const [replay, setReplay] = useState(0);
  const reducedMotion = useContext(MotionContext);

  const fields: [string, string][] = [
    ['Domain', 'Water & Sanitation'],
    ['Location', 'Rural Rajasthan'],
    ['Priority', 'High'],
    ['Required capabilities', CAPABILITIES.join(' · ')],
  ];

  return (
    <Section
      id="setu-ai"
      number="04"
      label="AI IN ACTION"
      title="FROM COMPLAINT TO ENGINEERING BRIEF."
      className="ai-section"
    >
      <div className="demo-toolbar">
        <DemoBadge />
        {!reducedMotion && (
          <button
            type="button"
            className="text-button"
            onClick={() => setReplay((value) => value + 1)}
          >
            <Icon name="replay" />
            Replay transformation
          </button>
        )}
      </div>

      <div className="ai-workbench" ref={ref}>
        <article className="raw-report">
          <header className="workbench-bar">
            <span className="small-label">01 / BEFORE</span>
            <span className="neutral-status">Community report</span>
          </header>

          <div className="report-body">
            <Icon name="message" />
            <blockquote>
              “The water in our village doesn't seem safe. We don't know
              when it becomes unsafe and testing is expensive.”
            </blockquote>
            <p>A real-world concern. Not yet an engineering specification.</p>
          </div>

          <div className="input-note">
            <span className="small-label">ILLUSTRATIVE CONTEXT</span>
            <span>Rural setting · Cost constraint · Ongoing monitoring need</span>
          </div>
        </article>

        <div className="ai-transfer" aria-hidden="true">
          <Icon name="arrow" />
        </div>

        <article className="structured-report">
          <header className="workbench-bar">
            <span className="small-label">02 / SETU AI</span>
            <span className="review-status">Review required</span>
          </header>

          <div className="ai-sequence" key={replay}>
            <dl className="structured-fields">
              {fields.map(([label, value], index) => (
                <div
                  className="sequence-item"
                  style={{ '--delay': `${index * 90}ms` } as React.CSSProperties}
                  key={label}
                >
                  <dt className="small-label">{label}</dt>
                  <dd>
                    {label === 'Priority' ? (
                      <span className="priority-label">{value}</span>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div
              className="engineering-brief sequence-item"
              style={{ '--delay': '400ms' } as React.CSSProperties}
            >
              <span className="small-label">03 / ENGINEERING BRIEF</span>
              <h3>
                Develop an affordable system for continuous local
                water-quality monitoring.
              </h3>
              <span className="brief-caption">
                A clear starting point for technical evaluation.
              </span>
            </div>
          </div>
        </article>
      </div>

      <p className="disclosure">
        Illustrative transformation, not a live AI result. Location and priority
        are demonstration inputs, not facts inferred from the quoted report.
        AI-generated fields and proposed directions require review.
      </p>
    </Section>
  );
}

function DemonstrationCase() {
  return (
    <Section
      id="setu-case"
      number="05"
      label="FOLLOW THE PROBLEM"
      title="ONE PROBLEM. ONE JOURNEY."
      className="case-section"
    >
      <div className="case-intro">
        <div>
          <DemoBadge />
          <h3>RURAL WATER QUALITY MONITORING</h3>
          <p>
            A community needs an affordable way to monitor the quality
            of its local water source.
          </p>
        </div>

        <div
          className="water-schematic"
          role="img"
          aria-label="Concept: connect a local water source to monitoring and field evidence"
        >
          <div>
            <span className="schematic-icon"><Icon name="water" /></span>
            <span>Local source</span>
          </div>
          <i aria-hidden="true" />
          <div>
            <span className="schematic-icon"><Icon name="chart" /></span>
            <span>Monitoring concept</span>
          </div>
          <i aria-hidden="true" />
          <div>
            <span className="schematic-icon"><Icon name="structure" /></span>
            <span>Field evidence</span>
          </div>
        </div>
      </div>

      <ol className="case-trail" aria-label="Demonstration water challenge journey">
        {DEMO_STEPS.map(([title, description], index) => (
          <li key={title}>
            <span className="case-dot" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h4>{title}</h4>
            <p>{description}</p>
          </li>
        ))}
      </ol>

      <div className="case-footer">
        <p>
          The destination: a verified outcome <strong>if the evidence supports it.</strong>
        </p>
        <span>Demonstration scenario · No deployment or impact claims</span>
      </div>
    </Section>
  );
}

function CapabilityMatching() {
  return (
    <Section
      id="setu-matching"
      number="06"
      label="CONNECTION, NOT JUST CATEGORISATION"
      title="THE RIGHT PROBLEM MEETS THE RIGHT CAPABILITY."
    >
      <DemoBadge>Prototype scenario</DemoBadge>

      <div className="matching-layout">
        <div className="challenge-profile">
          <span className="small-label">CHALLENGE</span>
          <div className="challenge-title">
            <Icon name="water" />
            <h3>Water-quality monitoring</h3>
          </div>
          <p>Affordable, continuous monitoring for a local water source.</p>

          <div className="capability-requirements">
            <span className="small-label">REQUIRED CAPABILITIES</span>
            <ul className="capability-list">
              {CAPABILITIES.map((capability) => (
                <li key={capability}>
                  <span className="capability-dot" aria-hidden="true" />
                  {capability}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="match-connector" aria-hidden="true">
          <span />
          <Icon name="match" />
          <span />
        </div>

        <article className="match-profile">
          <header>
            <span className="small-label">ILLUSTRATIVE MATCH PROFILE</span>
            <Icon name="match" />
          </header>
          <h3>University / Faculty / Student Team</h3>
          <p className="match-status">HIGH CAPABILITY MATCH</p>

          <dl className="match-reasons">
            <div>
              <dt>IoT</dt>
              <dd>Sensor integration and connected devices</dd>
            </div>
            <div>
              <dt>Environmental Engineering</dt>
              <dd>Water-quality methods and field constraints</dd>
            </div>
            <div>
              <dt>Data Analytics</dt>
              <dd>Monitoring, interpretation and reporting</dd>
            </div>
          </dl>

          <p className="match-note">
            A capability profile, not a named partner or an actual assignment.
          </p>
        </article>
      </div>

      <p className="disclosure">
        Matching can also consider resources, geography and project relevance.
        The example label is illustrative, not a calculated match score.
      </p>
    </Section>
  );
}

function Ecosystem() {
  return (
    <Section
      id="setu-ecosystem"
      number="07"
      label="THE ECOSYSTEM"
      title="THREE ACTORS. ONE OUTCOME."
      className="ecosystem-section"
    >
      <p className="section-description">
        Community context. Academic expertise. Industry enablement.
        Connected through SETU.
      </p>

      <div className="ecosystem-map" aria-label="SETU ecosystem relationships">
        <div className="ecosystem-community">
          <span className="small-label">COMMUNITY</span>
          <h3>“I have a problem.”</h3>
          <p>Local knowledge, lived experience and feedback.</p>
        </div>

        <div className="eco-trunk" aria-hidden="true" />

        <div className="ecosystem-hub">
          <strong>SETU</strong>
          <span>Structure the challenge. Connect the capabilities.</span>
        </div>

        <div className="eco-trunk" aria-hidden="true" />

        <div className="eco-branches">
          <article>
            <span className="small-label">UNIVERSITY</span>
            <h3>“I can build.”</h3>
            <p>Faculty, students and researchers bring engineering expertise.</p>
          </article>
          <article>
            <span className="small-label">INDUSTRY / CSR</span>
            <h3>“I can enable.”</h3>
            <p>
              Potential funding, mentorship, technology and deployment support.
            </p>
          </article>
        </div>

        <div className="eco-merge" aria-hidden="true" />
        <div className="eco-trunk" aria-hidden="true" />

        <div className="ecosystem-pilot">
          <Icon name="pin" />
          <div>
            <strong>FIELD PILOT</strong>
            <span>Tested where the problem exists.</span>
          </div>
        </div>

        <div className="eco-trunk" aria-hidden="true" />

        <div className="ecosystem-outcome">
          <Icon name="check" />
          <div>
            <strong>VERIFIED OUTCOME</strong>
            <span>Requires evidence + community confirmation.</span>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Verification() {
  const ref = useEnterOnce<HTMLDivElement>();

  return (
    <Section
      id="setu-verification"
      number="08"
      label="PROOF, NOT JUST PROGRESS"
      title={<>BUILD <span className="not-equal">≠</span> IMPACT.</>}
    >
      <div className="verification-intro">
        <p className="section-description">
          A prototype is only the beginning. SETU tracks what happens
          when the solution reaches the field.
        </p>
        <span className="evidence-caption">EVIDENCE REQUIRED, NOT ASSUMED</span>
      </div>

      <div className="verification-content" ref={ref}>
        <ul className="evidence-grid" aria-label="Verification evidence requirements">
          {EVIDENCE.map(([icon, title, description], index) => (
            <li
              className="sequence-item"
              style={{ '--delay': `${index * 80}ms` } as React.CSSProperties}
              key={title}
            >
              <Icon name={icon} />
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ul>

        <div className="vso-panel">
          <div className="vso-heading">
            <div>
              <span className="small-label">THE STANDARD SETU AIMS TO ESTABLISH</span>
              <h3>VERIFIED SOCIETAL OUTCOME</h3>
            </div>
            <span className="vso-monogram" aria-hidden="true">VSO</span>
          </div>

          <Flow
            className="evidence-flow"
            label="Evidence chain for a verified societal outcome"
            items={[
              'Solution',
              'Field Test',
              'Evidence',
              'Community Confirmation',
              'Verified Outcome',
            ]}
          />

          <p>
            If the evidence is incomplete, the outcome remains unverified.
            Building is a milestone. Proof closes the loop.
          </p>
        </div>
      </div>
    </Section>
  );
}

function Comparison() {
  const traditional = ['Complaint', 'Forwarded', 'Waiting'];
  const setu = [
    'Problem',
    'AI Structuring',
    'Capability Matching',
    'Engineering',
    'Pilot',
    'Verification',
  ];

  return (
    <Section
      id="setu-difference"
      number="09"
      label="BEYOND COMPLAINT MANAGEMENT"
      title="SETU DOESN'T STOP AT REPORTING."
      className="comparison-section"
    >
      <div className="comparison-table">
        <div className="comparison-row traditional-row">
          <h3>TRADITIONAL</h3>
          <ol aria-label="Traditional complaint pathway">
            {traditional.map((item) => <li key={item}>{item}</li>)}
          </ol>
        </div>
        <div className="comparison-row setu-row">
          <h3>SETU</h3>
          <ol aria-label="SETU solution creation pathway">
            {setu.map((item) => <li key={item}>{item}</li>)}
          </ol>
        </div>
      </div>

      <p className="comparison-closing">
        From complaint management to <span>solution creation.</span>
      </p>
    </Section>
  );
}

function FinalCTA({ submitChallengeHref }: { submitChallengeHref: string }) {
  return (
    <ClickSpark
      sparkColor="#9de7cf"
      sparkSize={12}
      sparkRadius={20}
      sparkCount={8}
      duration={400}
    >
      <section className="setu-cta" aria-labelledby="setu-cta-title">
        <div className="setu-container">
          <p className="eyebrow"><span>10</span> THE NEXT STEP IS YOURS</p>
          <Reveal>
            <h2 id="setu-cta-title">
              DON'T JUST REPORT IT
              <br />
              <span>— SOLVE IT.</span>
            </h2>
          </Reveal>
          <div className="cta-bottom">
            <p>Have a problem worth solving?</p>
            <Link className="primary-button" href={submitChallengeHref}>
              SUBMIT A CHALLENGE
              <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>
    </ClickSpark>
  );
}

export default function HowItWorksPage() {
  const { openAuth } = useAuthModal();
  const reducedMotion = useReducedMotion();
  usePageLenis(reducedMotion, false); // managed globally by LenisProvider

  const submitChallengeHref = '/contact?reason=share-challenge';

  return (
    <MotionContext.Provider value={reducedMotion}>
      {/* ── Staggered Mobile/Overlay Menu ── */}
      <StaggeredMenu
        items={STAGGERED_MENU_ITEMS}
        socialItems={STAGGERED_SOCIAL_ITEMS}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#101312"
        openMenuButtonColor="#f5f6f1"
        changeMenuColorOnOpen={true}
        colors={['#09130f', '#132820', '#267f68']}
        accentColor="#9de7cf"
        isFixed={true}
      />

      {/* ── Fixed Global Header ── */}
      <header className="fixed top-0 left-0 right-0 h-[72px] z-30 flex items-center justify-between px-6 sm:px-12 bg-[#f5f6f1]/90 backdrop-blur-md border-b border-[#d9ddd5]">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold tracking-wider text-sm text-[#101312] hover:opacity-75 transition-opacity"
          aria-label="Back to SETU home"
        >
          <span className="w-8 h-8 rounded-full bg-[#101312] text-white font-serif flex items-center justify-center text-base font-normal shadow-sm">
            S
          </span>
          <span className="tracking-[0.16em] font-extrabold text-[14px]">SETU</span>
        </Link>
        <div className="mr-16 sm:mr-24">
          <button
            type="button"
            onClick={() => openAuth()}
            className="flex items-center gap-2 bg-[#101312] text-white hover:bg-[#267f68] transition-all px-4 sm:px-5 py-2.5 rounded-full text-[11px] font-mono tracking-wider uppercase font-semibold shadow-md cursor-pointer"
          >
            <span>Login</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      </header>

      {/* ── Main How It Works Narrative ── */}
      <main
        id="setu-how-it-works"
        className={`setu-how ${reducedMotion ? 'motion-reduced' : 'motion-enabled'}`}
      >
        <Hero />
        <Problem />
        <Journey />
        <AIInAction />
        <DemonstrationCase />
        <CapabilityMatching />
        <Ecosystem />
        <Verification />
        <Comparison />
        <FinalCTA submitChallengeHref={submitChallengeHref} />
      </main>

      {/* ── Global Site Footer ── */}
      <SiteFooter />
    </MotionContext.Provider>
  );
}
