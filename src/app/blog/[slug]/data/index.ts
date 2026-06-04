import React from 'react';

export const blogsComponents: Record<string, () => Promise<{ default: React.ComponentType<any> }>> = {
  'how-moolsap-help-businesses-scale-smartly': () => import('./HowMoolSapHelpBusinessesScaleSmartly'),
  'how-smes-can-leverage-ai': () => import('./HowSmesCanLeverageAi'),
  'the-beginning-of-something-real': () => import('./TheBeginningOfSomethingReal'),
  'why-every-business-owner-should-invest-in-custom-software': () => import('./WhyEveryBusinessOwnerShouldInvestInCustomSoftware'),
  'your-customers-are-on-mobile': () => import('./YourCustomersAreOnMobile'),
};
