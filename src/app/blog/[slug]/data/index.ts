import React from 'react';

export const blogsComponents: Record<string, () => Promise<{ default: React.ComponentType<any> }>> = {
  'how-aanandi-help-businesses-scale-smartly': () => import('./HowAanandiHelpBusinessesScaleSmartly'),
  'how-smes-can-leverage-ai': () => import('./HowSmesCanLeverageAi'),
  'the-beginning-of-something-real': () => import('./TheBeginningOfSomethingReal'),
  'why-every-business-owner-should-invest-in-custom-software': () => import('./WhyEveryBusinessOwnerShouldInvestInCustomSoftware'),
  'your-customers-are-on-mobile': () => import('./YourCustomersAreOnMobile'),
};
