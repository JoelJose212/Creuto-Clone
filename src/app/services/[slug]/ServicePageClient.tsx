"use client"

import { useState } from "react"
import Link from "next/link"
import Footer from "@/components/layout/Footer"
import "./servicesStyles.css"

interface ServicePageClientProps {
  pageData: any;
  slug: string;
}

export default function ServicePageClient({ pageData, slug }: ServicePageClientProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const pageId = `${slug}-page`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        #${pageId},
        #${pageId} h1,
        #${pageId} h2,
        #${pageId} h3,
        #${pageId} h4,
        #${pageId} h5,
        #${pageId} h6,
        #${pageId} p,
        #${pageId} span,
        #${pageId} li,
        #${pageId} a,
        #${pageId} button,
        #${pageId} label,
        #${pageId} div,
        #${pageId} .MuiTypography-root {
          font-family: var(--font-bricolage), 'Bricolage Grotesque', sans-serif !important;
        }

        /* High-contrast and premium legibility overrides for the dark Our Process section */
        #${pageId} .mui-935ku7 {
          background-color: #0A0A0A !important;
          color: #FFFFFF !important;
        }
        #${pageId} .mui-935ku7 .mui-yyanzz {
          color: #FFFFFF !important;
          font-weight: 800 !important;
          letter-spacing: -0.02em !important;
        }
        #${pageId} .mui-935ku7 .mui-irz8sk {
          color: #3b82f6 !important; /* Beautiful modern blue accent for Step markers */
          font-weight: 700 !important;
          letter-spacing: 0.1em !important;
        }
        #${pageId} .mui-935ku7 .mui-k4tnn0 {
          color: #FFFFFF !important;
          font-weight: 700 !important;
          letter-spacing: -0.01em !important;
        }
        #${pageId} .mui-935ku7 .mui-1wg61ev {
          color: #94A3B8 !important; /* Optimal cool grey for high readability against a dark background */
          font-weight: 400 !important;
          line-height: 1.8 !important;
        }
      `}} />

      <div id={pageId} className="min-h-screen bg-white">
        {/* 1. Hero Section */}
        <section className="MuiBox-root mui-1k4npe9">
          <div className="MuiContainer-root MuiContainer-maxWidthLg mui-16lg97m">
            <div style={{"opacity":1,"transform":"translateY(0)"} as any}>
              <div className="MuiStack-root mui-d7x68j">
                <h1 className="MuiTypography-root MuiTypography-h1 mui-1m58sbh">
                  {pageData.hero.title}
                </h1>
                <h5 className="MuiTypography-root MuiTypography-h5 mui-oj2gkm">
                  {pageData.hero.subtitle}
                </h5>
                <h6 className="MuiTypography-root MuiTypography-subtitle1 mui-1a81sah">
                  {pageData.hero.description}
                </h6>
              </div>
            </div>
            <div className="MuiBox-root mui-xwunxj">
              <div style={{"width":"100%","display":"flex","justifyContent":"center","opacity":1,"transform":"scale(1)"} as any}>
                <div className="MuiBox-root mui-1n8npjz">
                  <img 
                    className="MuiBox-root mui-3o9s0b" 
                    src={pageData.hero.imageSrc} 
                    alt={pageData.hero.imageAlt}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="MuiBox-root mui-1lt9stp"></div>
          <div className="MuiBox-root mui-1tidmfz"></div>
        </section>

        {/* 2. Intro / About Section */}
        <section className="MuiBox-root mui-13g25so">
          <div className="MuiContainer-root MuiContainer-maxWidthMd mui-1tf0ljf">
            <div style={{"opacity":1,"transform":"translateY(0)"} as any}>
              <div className="MuiBox-root mui-4zswg4">
                {pageData.intro.paragraphs.map((p: string, idx: number) => {
                  const isLast = idx === pageData.intro.paragraphs.length - 1;
                  return (
                    <p 
                      key={idx} 
                      className={`MuiTypography-root MuiTypography-body1 ${isLast ? 'mui-fybz7c' : 'mui-1j4kbm6'}`}
                    >
                      {p}
                    </p>
                  );
                })}
              </div>
              <div className="MuiBox-root mui-1i9uuzs">
                <h6 className="MuiTypography-root MuiTypography-subtitle1 mui-qj888w">
                  {pageData.intro.goalTitle}
                </h6>
                <p className="MuiTypography-root MuiTypography-body1 mui-bojpyb">
                  {pageData.intro.goalDescription}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Capabilities Section */}
        <section className="MuiBox-root mui-pvwbin">
          <div className="MuiContainer-root MuiContainer-maxWidthLg mui-17mtwhi">
            <div className="MuiBox-root mui-0" style={{"opacity":1,"transform":"translateY(0)"} as any}>
              <div className="MuiStack-root mui-4p2bk0">
                <h2 className="MuiTypography-root MuiTypography-h2 mui-186cjs7">
                  {pageData.capabilities.title}
                </h2>
                <h6 className="MuiTypography-root MuiTypography-subtitle2 mui-y2si0j">
                  {pageData.capabilities.subtitle}
                </h6>
              </div>
            </div>
            <div className="MuiGrid-root MuiGrid-container MuiGrid-direction-xs-row MuiGrid-spacing-xs-4 MuiGrid-spacing-md-6 mui-1qea0v6">
              {pageData.capabilities.items.map((item: any, idx: number) => (
                <div 
                  key={idx} 
                  className="MuiGrid-root MuiGrid-direction-xs-row MuiGrid-grid-xs-12 MuiGrid-grid-sm-6 MuiGrid-grid-md-4 mui-16cvqyc" 
                  style={{"opacity":1,"transform":"translateY(0)"} as any}
                >
                  <div className="MuiStack-root mui-90qip8">
                    <div className="MuiBox-root mui-jv961c">
                      <img className="MuiBox-root mui-r91awh" src={item.imageSrc} alt={item.imageAlt}/>
                    </div>
                    <h5 className="MuiTypography-root MuiTypography-h5 mui-10qtfdw">
                      {item.title}
                    </h5>
                    <h6 className="MuiTypography-root MuiTypography-subtitle2 mui-y2si0j">
                      {item.description}
                    </h6>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Our Process Section */}
        <div className="MuiBox-root mui-935ku7">
          <div className="MuiContainer-root MuiContainer-maxWidthLg mui-17mtwhi">
            <h2 className="MuiTypography-root MuiTypography-h2 mui-yyanzz" style={{"opacity":1,"transform":"translateX(0)"} as any}>
              {pageData.process.title}
            </h2>
            <div className="MuiBox-root mui-79elbk">
              {pageData.process.steps.map((step: any, idx: number) => {
                const isLast = idx === pageData.process.steps.length - 1;
                return (
                  <div 
                    key={idx} 
                    className={`MuiGrid-root MuiGrid-container MuiGrid-direction-xs-row ${isLast ? 'mui-1r52a9u' : 'mui-10x6wa7'}`} 
                    style={{"opacity":1,"transform":"translateY(0)"} as any}
                  >
                    <div className="MuiGrid-root MuiGrid-direction-xs-row MuiGrid-grid-xs-1 MuiGrid-grid-sm-0.5 MuiGrid-grid-md-0.5 mui-1g3ikp0">
                      <div className="MuiBox-root mui-15z0ums"></div>
                      {!isLast && <div className="MuiBox-root mui-d6tk0l"></div>}
                    </div>
                    <div className="MuiGrid-root MuiGrid-direction-xs-row MuiGrid-grid-xs-11 MuiGrid-grid-sm-11.5 MuiGrid-grid-md-11.5 mui-1cezjx1">
                      <div className="MuiGrid-root MuiGrid-container MuiGrid-direction-xs-row MuiGrid-spacing-xs-4 mui-199nrdm">
                        <div className="MuiGrid-root MuiGrid-direction-xs-row MuiGrid-grid-xs-12 MuiGrid-grid-md-5 mui-19ynww8">
                          <div className="MuiStack-root mui-18zsr3k">
                            <p className="MuiTypography-root MuiTypography-body1 mui-irz8sk">
                              {step.stepNumber}
                            </p>
                            <h2 className="MuiTypography-root MuiTypography-h2 mui-k4tnn0">
                              {step.title}
                            </h2>
                          </div>
                        </div>
                        <div className="MuiGrid-root MuiGrid-direction-xs-row MuiGrid-grid-xs-12 MuiGrid-grid-md-7 mui-1tn0d4a">
                          <h6 className="MuiTypography-root MuiTypography-h6 mui-1wg61ev">
                            {step.description}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 5. Stats / CTA Summary Section */}
        <section className="MuiBox-root mui-0">
          <div className="MuiBox-root mui-irje79">
            <div className="MuiContainer-root MuiContainer-maxWidthLg mui-17mtwhi">
              <div className="MuiBox-root mui-0" style={{"opacity":1,"transform":"translateY(0)"} as any}>
                <div className="MuiStack-root mui-upjtt">
                  <div className="MuiBox-root mui-1274r9c">
                    <h2 className="MuiTypography-root MuiTypography-h2 mui-13r7wem">
                      {pageData.stats.title}
                    </h2>
                    <h6 className="MuiTypography-root MuiTypography-h6 mui-1ovwfmu">
                      {pageData.stats.subtitle}
                    </h6>
                  </div>
                  <div className="MuiStack-root mui-jj2ztu">
                    <Link 
                      href="/contact" 
                      className="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-colorPrimary mui-12qv835"
                    >
                      Contact Us
                    </Link>
                    <Link 
                      href="/book-a-call" 
                      className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary mui-knz3q9"
                    >
                      Book A Call
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="MuiBox-root mui-dqfdkr">
              <div className="MuiBox-root mui-18gknr"></div>
              <div className="MuiContainer-root MuiContainer-maxWidthLg mui-4yi1i4">
                <div className="MuiGrid-root MuiGrid-container MuiGrid-direction-xs-row MuiGrid-spacing-xs-3 mui-177xvbk">
                  {pageData.stats.items.map((stat: any, idx: number) => (
                    <div 
                      key={idx} 
                      className="MuiGrid-root MuiGrid-direction-xs-row MuiGrid-grid-xs-12 MuiGrid-grid-sm-6 MuiGrid-grid-md-2.4 mui-1gag0ct" 
                      style={{"opacity":1,"transform":"translateY(0)"} as any}
                    >
                      <div className="MuiBox-root mui-1d6gd56">
                        <div className="MuiBox-root mui-esxydx">
                          <h2 className="MuiTypography-root MuiTypography-h2 mui-dku0ur">
                            {stat.number}
                          </h2>
                        </div>
                        <h5 className="MuiTypography-root MuiTypography-h5 mui-10qtfdw">
                          {stat.label}
                        </h5>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 6. Why Choose Section */}
          <div className="MuiBox-root mui-7hx08l">
            <div className="MuiContainer-root MuiContainer-maxWidthLg mui-17mtwhi">
              <h1 className="MuiTypography-root MuiTypography-h2 mui-t3b6f2" style={{"opacity":1,"transform":"translateX(0)"} as any}>
                {pageData.whyChoose.title}
              </h1>
              <div className="MuiGrid-root MuiGrid-container MuiGrid-direction-xs-row MuiGrid-spacing-xs-6 MuiGrid-spacing-md-10 mui-axb25l" style={{ marginTop: "40px" }}>
                {pageData.whyChoose.items.map((item: any, idx: number) => (
                  <div 
                    key={idx} 
                    className="MuiGrid-root MuiGrid-direction-xs-row MuiGrid-grid-xs-12 MuiGrid-grid-sm-6 MuiGrid-grid-md-4 mui-16cvqyc" 
                    style={{"opacity":1,"transform":"translateY(0)"} as any}
                  >
                    <div className="MuiStack-root mui-ctinhq">
                      <div className="MuiBox-root mui-7xuhvd">
                        <img src={item.imageSrc} alt={item.imageAlt} style={{"width":"48px","height":"48px"} as any}/>
                      </div>
                      <div className="MuiBox-root mui-0">
                        <h5 className="MuiTypography-root MuiTypography-h5 mui-m37xtr">
                          {item.title}
                        </h5>
                        <h6 className="MuiTypography-root MuiTypography-h6 mui-rbrxha">
                          {item.description}
                        </h6>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. FAQs Section (Accordion with Dynamic React State Toggle) */}
        <div className="MuiBox-root mui-yu5gwf">
          <div className="MuiContainer-root MuiContainer-maxWidthLg mui-17mtwhi">
            <div className="MuiBox-root mui-12thin1" style={{"opacity":1,"transform":"translateY(0)"} as any}>
              <h2 className="MuiTypography-root MuiTypography-h2 mui-177l0t9">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="MuiBox-root mui-a9n7s9">
              {pageData.faqs.map((faq: any, idx: number) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div 
                    key={idx}
                    className={`MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiAccordion-root MuiAccordion-rounded MuiAccordion-gutters ${idx === 0 ? 'mui-19tfdxq' : 'mui-nzh4ci'}`} 
                    style={{
                      "--PaperShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
                      "opacity": 1,
                      "transform": "translateY(0)"
                    } as any}
                  >
                    <h3 className="MuiAccordion-heading mui-wnfue5">
                      <button 
                        onClick={() => toggleFaq(idx)}
                        className="MuiButtonBase-root MuiAccordionSummary-root MuiAccordionSummary-gutters mui-1wsw4ik" 
                        tabIndex={0} 
                        type="button" 
                        aria-expanded={isOpen ? "true" : "false"}
                      >
                        <span className="MuiAccordionSummary-content MuiAccordionSummary-contentGutters mui-1b8uc0m">
                          <h6 className="MuiTypography-root MuiTypography-h6 mui-1b36hp8">
                            {faq.question}
                          </h6>
                        </span>
                        <span className="MuiAccordionSummary-expandIconWrapper mui-f8wb7g">
                          <div className="MuiBox-root mui-1i27lsg">
                            <div 
                              className="MuiBox-root mui-2qkfws"
                              style={{ 
                                transform: isOpen ? "rotate(135deg)" : "rotate(0deg)",
                                transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
                              }}
                            >
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23 11H13V1C13 0.734784 12.8946 0.48043 12.7071 0.292893C12.5196 0.105357 12.2652 0 12 0V0C11.7348 0 11.4804 0.105357 11.2929 0.292893C11.1054 0.48043 11 0.734784 11 1V11H1C0.734784 11 0.48043 11.1054 0.292893 11.2929C0.105357 11.4804 0 11.7348 0 12H0C0 12.2652 0.105357 12.5196 0.292893 12.7071C0.48043 12.8946 0.734784 13 1 13H11V23C11 23.2652 11.1054 23.5196 11.2929 23.7071C11.4804 23.8946 11.7348 24 12 24C12.2652 24 12.5196 23.8946 12.7071 23.7071C12.8946 23.5196 13 23.2652 13 23V13H23C23.2652 13 23.5196 12.8946 23.7071 12.7071C23.8946 12.5196 24 12.2652 24 12C24 11.7348 23.8946 11.4804 23.7071 11.2929C23.5196 11.1054 23.2652 11 23 11Z" fill="#272728"></path>
                              </svg>
                            </div>
                          </div>
                        </span>
                      </button>
                    </h3>
                    <div 
                      style={{ 
                        height: isOpen ? "auto" : "0px",
                        overflow: "hidden",
                        display: isOpen ? "block" : "none",
                        transition: "height 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
                      }} 
                      className={`MuiCollapse-root MuiCollapse-vertical ${isOpen ? 'MuiCollapse-entered' : 'MuiCollapse-hidden'} mui-abqyn`}
                    >
                      <div className="MuiCollapse-wrapper MuiCollapse-vertical mui-15830to">
                        <div className="MuiCollapse-wrapperInner MuiCollapse-vertical mui-9vd5ud">
                          <div role="region" className="MuiAccordion-region mui-1xdhyk6">
                            <div className="MuiAccordionDetails-root mui-1nu4jse">
                              <h6 className="MuiTypography-root MuiTypography-h6 mui-5fuser">
                                {faq.answer}
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 8. Connect / CTA Footer Section */}
        <section className="MuiContainer-root MuiContainer-maxWidthLg MuiContainer-disableGutters mui-1bo1og6">
          <div className="MuiBox-root mui-nlxjo6" style={{"opacity":1,"transform":"scale(1)"} as any}>
            <div className="MuiChip-root MuiChip-outlined MuiChip-sizeMedium MuiChip-colorDefault MuiChip-outlinedDefault mui-poojzc">
              <span className="MuiChip-label MuiChip-labelMedium mui-1fqh3rg">
                LET'S CONNECT
              </span>
            </div>
            <h2 className="MuiTypography-root MuiTypography-h2 mui-2oqkbb">
              Connect with Creuto!
            </h2>
            <p className="MuiTypography-root MuiTypography-subtitle2 mui-zxeike">
              Ready to take the first step towards unlocking opportunities, realizing goals, and embracing innovation? We're here and eager to connect.
            </p>
            <div className="MuiBox-root mui-7v4qig">
              <Link 
                href="/book-a-call" 
                className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary mui-4g5xxf"
              >
                Schedule a Call
              </Link>
              <Link 
                href="/contact" 
                className="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-colorPrimary mui-fez6v2"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}
