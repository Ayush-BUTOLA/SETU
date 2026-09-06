/**
 * SETU public website — central copy & data
 * All public-facing text lives here so it is easy to edit and keep consistent.
 * Do not put unverified statistics, fake metrics, or internal jargon here.
 */

// ─── Navigation ──────────────────────────────────────────────────────────────

export const NAV_ITEMS = [
  { label: 'Home', href: '/', ariaLabel: 'Go to home page' },
  { label: 'About', href: '/about', ariaLabel: 'About SETU' },
  { label: 'How SETU Works', href: '/how-it-works', ariaLabel: 'How SETU works' },
  { label: 'Explore Challenges', href: '/explore-challenges', ariaLabel: 'Explore community challenges' },
  { label: 'Universities & Industry', href: '/for-universities-industry', ariaLabel: 'For universities and industry' },
  { label: 'Contact Us', href: '/contact', ariaLabel: 'Contact SETU' },
  { label: 'Login', href: '/login', ariaLabel: 'Sign in to SETU' },
] as const;

export const STAGGERED_MENU_ITEMS = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'About', ariaLabel: 'About SETU', link: '/about' },
  { label: 'How SETU Works', ariaLabel: 'How SETU works', link: '/how-it-works' },
  { label: 'Explore Challenges', ariaLabel: 'Explore community challenges', link: '/explore-challenges' },
  { label: 'For Universities & Industry', ariaLabel: 'For universities and industry', link: '/for-universities-industry' },
  { label: 'Contact Us', ariaLabel: 'Contact SETU', link: '/contact' },
];

export const STAGGERED_SOCIAL_ITEMS = [
  { label: 'Impact Stories', link: '/impact-stories' },
  { label: 'FAQ', link: '/faq' },
  { label: 'Login', link: '/login' },
];

// ─── How It Works — 5-Step Process ───────────────────────────────────────────

export const HOW_IT_WORKS_STEPS = [
  {
    number: '01',
    verb: 'Discover',
    headline: 'Communities share real challenges.',
    body:
      'Anyone can bring a local problem forward — from a village water point to a city street. Challenges are shared with context, location, and evidence so they can be understood clearly.',
    image: '/assets/community.jpg',
    imageAlt: 'Community members gathering to discuss a local challenge',
  },
  {
    number: '02',
    verb: 'Validate',
    headline: 'SETU helps structure the challenge.',
    body:
      'A challenge is reviewed to make sure it is clearly described, genuinely relevant, and ready to move forward. This step ensures that the people who can help are working on something real and actionable.',
    image: '/assets/fields.jpg',
    imageAlt: 'Fields and landscape representing a community challenge context',
  },
  {
    number: '03',
    verb: 'Match',
    headline: 'The right capabilities are connected.',
    body:
      'Each validated challenge is connected with universities, technical institutions, industry partners, or government bodies whose knowledge and tools are best suited to help.',
    image: '/assets/landscape.jpg',
    imageAlt: 'Wide landscape showing the breadth of communities SETU serves',
  },
  {
    number: '04',
    verb: 'Build',
    headline: 'Teams develop a practical solution.',
    body:
      'Student and faculty teams work with the community to design and test a solution that fits real conditions — not just what looks good in a lab or on a slide.',
    image: '/assets/harvest.jpg',
    imageAlt: 'People working together in a field environment',
  },
  {
    number: '05',
    verb: 'Verify',
    headline: 'Outcomes are confirmed with evidence.',
    body:
      'After a pilot, outcomes are reviewed using field evidence and confirmation from the people who experience the problem. A solution is only considered successful when the community says it is.',
    image: '/assets/water.jpg',
    imageAlt: 'Water testing representing evidence-based verification of a solution',
  },
] as const;

// ─── About Page ───────────────────────────────────────────────────────────────

export const ABOUT_PRINCIPLES = [
  {
    number: '01',
    title: 'Start with lived experience',
    body:
      'Change that lasts begins with the people who feel the problem every day. SETU is built so that community voices are the starting point — not an afterthought.',
  },
  {
    number: '02',
    title: 'Connect the right capabilities',
    body:
      'A good idea needs the right expertise, tools, and knowledge behind it. SETU creates a path from a community challenge to the institutions and people who can genuinely help.',
  },
  {
    number: '03',
    title: 'Build for real conditions',
    body:
      'Solutions must work where the problem exists — not just in theory. SETU pushes for practical pilots that are tested in the field with the community, not just presented at a conference.',
  },
  {
    number: '04',
    title: 'Verify what changed',
    body:
      'Claiming impact is easy. Demonstrating it takes evidence. SETU builds accountability into every stage so that outcomes are confirmed rather than assumed.',
  },
] as const;

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export const FAQ_ITEMS = [
  {
    question: 'What is SETU?',
    answer:
      'SETU is a platform that connects communities experiencing real local problems with the universities, institutions, industry partners, and government bodies that can help solve them. It is a bridge from a lived problem to a practical, verified solution.',
  },
  {
    question: 'Is SETU a complaint portal?',
    answer:
      'No. A complaint portal records problems and passes them into an administrative queue. SETU creates an active connection between the people who experience a problem and the people who have the knowledge and tools to address it — and it stays involved through the entire process.',
  },
  {
    question: 'Who can share a challenge?',
    answer:
      'Anyone can bring a local challenge forward — individuals, community groups, panchayats, NGOs, or local institutions. If you experience or witness a problem that affects people in your area, SETU gives it a path forward.',
  },
  {
    question: 'Who helps solve the challenges?',
    answer:
      'Challenges are connected with universities, engineering and research institutions, industry partners, CSR teams, and government bodies — depending on what the problem needs. SETU helps identify who is best placed to help for each specific challenge.',
  },
  {
    question: 'How does SETU verify impact?',
    answer:
      'After a solution is piloted, outcomes are reviewed using field evidence and direct confirmation from the people who experienced the original problem. SETU does not consider a challenge resolved until there is evidence that something genuinely changed.',
  },
  {
    question: 'Does SETU use AI?',
    answer:
      'SETU uses technology to help structure challenges clearly, identify similar problems, and connect them with the right people. Human reviewers make all final decisions. The goal is to make the process faster and clearer — not to replace judgement.',
  },
  {
    question: 'Can universities or companies participate?',
    answer:
      'Yes. Universities, research institutions, companies, and CSR teams can all participate. If you have relevant expertise, research capability, or resources that could help move a community challenge forward, SETU provides a structured way to contribute.',
  },
  {
    question: 'Do I need to log in to explore public information?',
    answer:
      'No. Public challenges, general information about how SETU works, and impact stories are all available without logging in. An account is required if you want to share a challenge or participate as a partner.',
  },
] as const;

// ─── For Universities & Industry ──────────────────────────────────────────────

export const PARTNER_CAPABILITIES = [
  {
    title: 'Work on real community challenges',
    body:
      'SETU connects universities and research institutions with validated, clearly-described challenges from communities across India. Research and student projects can be grounded in genuine need rather than hypothetical scenarios.',
  },
  {
    title: 'Support practical research and pilots',
    body:
      'Partners can support challenges that move from structured proposals through to real-world pilots. This creates a pathway for research to have demonstrable, evidence-based impact beyond publication.',
  },
  {
    title: 'Provide technical mentorship',
    body:
      'Faculty, researchers, and industry professionals can contribute as mentors — guiding student teams and community groups through design, prototyping, and field testing.',
  },
  {
    title: 'Help move ideas into field testing',
    body:
      'SETU is designed to take solutions out of the lab and into the communities that need them. Industry and CSR partners can help bridge the gap between a working prototype and a deployed, tested pilot.',
  },
  {
    title: 'Contribute to evidence-based impact',
    body:
      'Participation is tied to outcomes, not just activity. Partners contribute to challenges where progress is tracked and confirmed — so the work creates a verifiable record of what changed.',
  },
] as const;

// ─── Contact Reasons ──────────────────────────────────────────────────────────

export const CONTACT_REASONS = [
  { value: 'share-challenge', label: 'Share a community challenge' },
  { value: 'university-expertise', label: 'Bring university expertise' },
  { value: 'industry-csr', label: 'Explore industry or CSR collaboration' },
  { value: 'general', label: 'Ask a general question' },
] as const;

// ─── Impact Stories ───────────────────────────────────────────────────────────

export const IMPACT_STORIES = [
  {
    id: 'water-access',
    status: 'Story in progress' as const,
    image: '/assets/water.jpg',
    imageAlt: 'Community water access challenge',
    category: 'Water & Sanitation',
    challenge:
      'Seasonal water access in a rural community creates daily difficulties for families, particularly affecting women and children who travel long distances to collect water.',
    whoExperiences:
      'Families in villages where seasonal water sources are unreliable or contaminated. Women and children who bear the primary responsibility for water collection.',
    collaborationNeeded:
      'Technical teams who can design and test appropriate water storage, purification, or distribution approaches suited to the local geography and community capacity.',
    pilotOutcome:
      'If a well-designed pilot succeeds, families would have access to clean water closer to their homes, reducing the time and effort spent on collection and improving health outcomes.',
  },
  {
    id: 'agricultural-support',
    status: 'Story in progress' as const,
    image: '/assets/harvest.jpg',
    imageAlt: 'Agricultural and harvest challenge',
    category: 'Agriculture & Livelihoods',
    challenge:
      'Small farmers experience significant post-harvest losses due to lack of storage, limited market access, and difficulty getting fair prices for produce.',
    whoExperiences:
      'Small and marginal farmers who depend on seasonal harvests for their livelihoods, and who lack access to cold storage, transport, or market information.',
    collaborationNeeded:
      'Agricultural engineers, food technologists, logistics researchers, and market linkage specialists who can work directly with farming communities.',
    pilotOutcome:
      'Reduced post-harvest losses and improved income for farming families through practical storage, transport, or market linkage solutions tested in a real agricultural context.',
  },
  {
    id: 'community-infrastructure',
    status: 'Story in progress' as const,
    image: '/assets/community-street.jpg',
    imageAlt: 'Community street and infrastructure challenge',
    category: 'Infrastructure & Access',
    challenge:
      'Poorly maintained local infrastructure — paths, lighting, drainage — creates safety risks and accessibility barriers, particularly for older residents and people with disabilities.',
    whoExperiences:
      'Residents who navigate damaged or unsafe infrastructure daily. Older adults and people with disabilities who face particular difficulty with poor access conditions.',
    collaborationNeeded:
      'Civil and structural engineers, urban planners, and community organizations who can assess, design, and support locally-appropriate infrastructure improvements.',
    pilotOutcome:
      'Safer, more accessible local infrastructure that reduces the risk of injury and improves daily life for residents, based on a pilot that tests solutions in a real community context.',
  },
] as const;

export type ImpactStoryStatus = 'Story in progress';
