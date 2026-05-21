import React from 'react';

export const caseStudiesComponents: Record<string, () => Promise<{ default: React.ComponentType<any> }>> = {
  'aquapulse-agritech-platform': () => import('./AquapulseAgritechPlatform'),
  'binimise-smart-city-platform': () => import('./BinimiseSmartCityPlatform'),
  'creuto-sales-crm': () => import('./CreutoSalesCrm'),
  'custom-erp-large-scale-industries': () => import('./CustomErpLargeScaleIndustries'),
  'dining-app': () => import('./DiningApp'),
  'enterprise-payroll-management-system': () => import('./EnterprisePayrollManagementSystem'),
  'event-booking-platform-skyeone': () => import('./EventBookingPlatformSkyeone'),
  'flashnow-quick-commerce-app': () => import('./FlashnowQuickCommerceApp'),
  'makemylook-salon-booking-app': () => import('./MakemylookSalonBookingApp'),
  'skoda-auto-sales-training-platform': () => import('./SkodaAutoSalesTrainingPlatform'),
  'workflow-management-system': () => import('./WorkflowManagementSystem'),
};
