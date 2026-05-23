import React from 'react';

export const blogsComponents: Record<string, () => Promise<{ default: React.ComponentType<any> }>> = {
  'how-smes-can-leverage-ai': () => import('./HowSmesCanLeverageAi'),
  'how-aanandi-help-businesses-scale-smartly': () => import('./HowAanandiHelpBusinessesScaleSmartly'),
  'why-every-business-owner-should-invest-in-custom-software': () => import('./WhyEveryBusinessOwnerShouldInvestInCustomSoftware'),
  'the-beginning-of-something-real': () => import('./TheBeginningOfSomethingReal'),
  'your-customers-are-on-mobile': () => import('./YourCustomersAreOnMobile'),
  'custom-crm': () => import('./CustomCrm'),
  'software-partner': () => import('./SoftwarePartner'),
  'custom-software-development': () => import('./CustomSoftwareDevelopment'),
  'customsoftware-roi': () => import('./CustomsoftwareRoi'),
  'startup': () => import('./Startup'),
};
