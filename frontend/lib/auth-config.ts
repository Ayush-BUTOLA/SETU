export interface DemoAccount {
  role: string;
  roleId: 'citizen' | 'university' | 'csr';
  email: string;
  password: string;
  name: string;
  organization: string;
  dashboardPath: string;
  description: string;
}

export const DEMO_ACCOUNTS: Record<string, DemoAccount> = {
  'Citizen / Community': {
    role: 'Citizen / Community',
    roleId: 'citizen',
    email: 'citizen@setu.org',
    password: 'password123',
    name: 'Dojo',
    organization: 'Gram Vikas Committee, Satara',
    dashboardPath: '/dashboard',
    description: 'Submit civic & rural challenges with GPS and track verification milestones.',
  },
  'University / Faculty': {
    role: 'University / Faculty',
    roleId: 'university',
    email: 'faculty@setu.org',
    password: 'password123',
    name: 'Dr. Ananya Sharma',
    organization: 'Centre for Rural Technology, IIT Delhi',
    dashboardPath: '/dashboard/university',
    description: 'Browse validated civic challenges, claim projects, and coordinate student engineering teams.',
  },
  'CSR / Industry Partner': {
    role: 'CSR / Industry Partner',
    roleId: 'csr',
    email: 'csr@setu.org',
    password: 'password123',
    name: 'Vikramaditya Singhania',
    organization: 'Tata Sustainability Foundation / Schedule VII Council',
    dashboardPath: '/dashboard/csr',
    description: 'Fund high-readiness pilots under Schedule VII and monitor audited societal outcomes.',
  },
};

export function getAccountByEmailOrRole(email: string, fallbackRole?: string): DemoAccount {
  const emailLower = (email || '').toLowerCase().trim();
  for (const acc of Object.values(DEMO_ACCOUNTS)) {
    if (acc.email.toLowerCase() === emailLower) {
      return acc;
    }
  }
  if (
    emailLower.includes('faculty') ||
    emailLower.includes('university') ||
    emailLower.includes('iit') ||
    emailLower.includes('edu')
  ) {
    return DEMO_ACCOUNTS['University / Faculty'];
  }
  if (
    emailLower.includes('csr') ||
    emailLower.includes('industry') ||
    emailLower.includes('tata') ||
    emailLower.includes('corp')
  ) {
    return DEMO_ACCOUNTS['CSR / Industry Partner'];
  }
  if (fallbackRole && DEMO_ACCOUNTS[fallbackRole]) {
    return DEMO_ACCOUNTS[fallbackRole];
  }
  return DEMO_ACCOUNTS['Citizen / Community'];
}

export function getDashboardPathByRole(roleOrEmail: string): string {
  const text = (roleOrEmail || '').toLowerCase();
  if (
    text.includes('university') ||
    text.includes('faculty') ||
    text.includes('iit') ||
    text.includes('edu')
  ) {
    return '/dashboard/university';
  }
  if (
    text.includes('csr') ||
    text.includes('industry') ||
    text.includes('tata') ||
    text.includes('corp')
  ) {
    return '/dashboard/csr';
  }
  return '/dashboard';
}
