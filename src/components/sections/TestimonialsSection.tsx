'use client';

import React, { useState, useEffect, useRef } from 'react';

const TESTIMONIALS = [
  {
    quote: "“Their services were excellent.”",
    description: "Creuto delivered a web and mobile app that exceeded the client's expectations. The team was highly responsive and punctual from a workflow standpoint, and internal stakeholders praised the service provider's collaborative nature and agility.",
    name: "Emma Richardson",
    role: "CEO, Emion",
    link: "https://clutch.co/go-to-review/4e36163a-56d5-4ae3-8b30-4c4d31c329d1/352041"
  },
  {
    quote: "“Their expertise, combined with a collaborative and proactive approach, made the experience seamless and productive.”",
    description: "The CRM system was robust, scalable, and user-friendly; it led to higher customer conversion rates, better sales tracking, and an increase in revenue. The team was highly organized, efficient, transparent, and experienced. They used Jira, Slack, and weekly update sheets to manage the project.",
    name: "Anonymous Executive",
    role: "Executive, Newsys Solution Private Limited",
    link: "https://clutch.co/go-to-review/4e36163a-56d5-4ae3-8b30-4c4d31c329d1/293407"
  },
  {
    quote: "“The deliverable was better than we anticipated.”",
    description: "Thanks to Creuto's work, the client could track their expenses and employees' daily work efficiency. The team delivered a system that could solve and monitor complaints, improving guest satisfaction. They communicated well through in-person meetings. Overall, the product exceeded expectations.",
    name: "Vishal Sharma",
    role: "Partner, Lazystay Hospitality",
    link: "https://clutch.co/go-to-review/4e36163a-56d5-4ae3-8b30-4c4d31c329d1/291924"
  },
  {
    quote: "“What stood out about this company was their strong team, modern approach, use of the latest tech, and impressive UI/UX design work.”",
    description: "Creuto delivered a robust solution with an intuitive UI/UX design and seamless in-app chat functionality. The team delivered on time, communicated well, and promptly addressed needs and concerns. They were dedicated to client satisfaction and the use of modern tools to deliver innovative work.",
    name: "Anonymous Product Head",
    role: "Product Head, QUIV",
    link: "https://clutch.co/go-to-review/4e36163a-56d5-4ae3-8b30-4c4d31c329d1/278001"
  },
  {
    quote: "“They prioritized our project as their own and offered only the best choices at each step in the development process.”",
    description: "Creuto's work led to a 28% increase in customer engagement, a 41% reduction in manual tasks, a 23% faster response time, and a 48% improvement in data accuracy. The team managed the project well and delivered on time. Overall, the team was committed to understanding the client's business needs.",
    name: "Daniel Foster",
    role: "CEO, Edverise",
    link: "https://clutch.co/go-to-review/4e36163a-56d5-4ae3-8b30-4c4d31c329d1/349787"
  },
  {
    quote: "“Creuto's team was always open to listening to our requirements and consistently came up with effective solutions.”",
    description: "Creuto's custom-developed LMS's highly intuitive and user-friendly UI received positive user feedback upon implementation. The team was responsive and committed, ensuring that UX and educational needs were fulfilled, providing modules for assessments and quizzes, and communication and forum tools.",
    name: "Anonymous CEO",
    role: "CEO, Education Company",
    link: "https://clutch.co/go-to-review/4e36163a-56d5-4ae3-8b30-4c4d31c329d1/293451"
  },
  {
    quote: "“Creuto treated us like friends and operated like internal team members. The process was fully transparent.”",
    description: "Creuto developed a solid, bug-free mobile app that met the client's expectations. The team delivered items ahead of schedule, demonstrated reliability regarding MVP development, and operated like an in-house team, treating the client as friends and handling a fully transparent process.",
    name: "Anonymous Executive",
    role: "Executive, Software Development Company",
    link: "https://clutch.co/go-to-review/4e36163a-56d5-4ae3-8b30-4c4d31c329d1/291658"
  },
  {
    quote: "“Their attention to detail and commitment to creating a user-friendly design were truly impressive.”",
    description: "Creuto Technologies delivered an intuitive, user-friendly solution that streamlined the client's processes, saving them valuable time and resources. Professional and attentive, they took the time to understand the client's needs and worked collaboratively to tailor a solution that matched.",
    name: "Paramananda Panda",
    role: "Managing Director, Odion Learning Pvt. Ltd",
    link: "https://clutch.co/go-to-review/4e36163a-56d5-4ae3-8b30-4c4d31c329d1/193284"
  },
  {
    quote: "“What impressed us most about Creuto was their deep understanding of both design and product thinking.”",
    description: "Creuto's app led to increased user engagement and product adherence. Customers interacted with the brand daily, creating stronger and more consistent wellness habits. The team was smooth, structured, and highly responsive. They maintained clear communication and delivered items on time.",
    name: "Namrata Reddy",
    role: "CEO, Bloomally",
    link: "https://clutch.co/go-to-review/4e36163a-56d5-4ae3-8b30-4c4d31c329d1/384806"
  },
  {
    quote: "“What stood out the most about Creuto was their exceptional UI/UX expertise.”",
    description: "Creuto's work led to a significant increase in engagement, user interaction, and time spent on pages for the client. The team's project management, timely delivery, and receptiveness to feedback were commendable. Moreover, Creuto's UI/UX expertise and thoughtful designs stood out.",
    name: "Rounak Mehra",
    role: "Co-Founder, Indus AI",
    link: "https://clutch.co/go-to-review/4e36163a-56d5-4ae3-8b30-4c4d31c329d1/383518"
  },
  {
    quote: "“Honestly, we had a smooth experience working with Creuto.”",
    description: "Creuto's system improved the client's donation management efficiency, reduced manual tracking, provided real-time fundraising insights, and decreased donor drop-offs. The team was supportive, communicative, and easy to work with. The team cared about building something meaningful for the client.",
    name: "Bidisha Roy",
    role: "Fundraising Manager, NEEDS NGO",
    link: "https://clutch.co/go-to-review/4e36163a-56d5-4ae3-8b30-4c4d31c329d1/383041"
  },
  {
    quote: "“Their ability to adapt to our needs while keeping things on track made the experience seamless.”",
    description: "Creuto delivered a scalable system that improved payroll efficiency and transparency and reduced human errors. The team adhered to timelines, quickly responded to changes, adapted to needs, and managed the project professionally. Their ability to understand the client's requirements was impressive.",
    name: "Radhika Mohanty",
    role: "Finance Manager, Crect",
    link: "https://clutch.co/go-to-review/4e36163a-56d5-4ae3-8b30-4c4d31c329d1/382633"
  },
  {
    quote: "“Their ability to translate complex operational needs into simple, usable tech was refreshing.”",
    description: "Creuto's WMS improved inventory accuracy, reduced stock wastage, and expedited order dispatching. The system's traceability made audits less stressful and contributed to smoother warehouse operations. The team was structured, communicative, and responsive. Overall, the collaboration was successful.",
    name: "Ananya Gupta",
    role: "Operations Manager, Chromaceutic Pvt Ltd",
    link: "https://clutch.co/go-to-review/4e36163a-56d5-4ae3-8b30-4c4d31c329d1/382294"
  },
  {
    quote: "“We always felt supported and in sync with their team.”",
    description: "Creuto's work streamlined the client's processes, improved batch traceability, and made production planning more efficient, dropping manual paperwork by 80%. Moreover, the team managed the project smoothly, was timely, and communicated clearly. Overall, Creuto's openness was impressive.",
    name: "Karan Verma",
    role: "Project Manager, Galgoties",
    link: "https://clutch.co/go-to-review/4e36163a-56d5-4ae3-8b30-4c4d31c329d1/380065"
  },
  {
    quote: "“They built a technically robust platform and ensured it was intuitive and accessible for investors of all levels.”",
    description: "Thanks to Creuto's work, the client saw steady app growth in transactions and SIPs, full regulatory compliance, and positive user feedback. The team had excellent project management, delivered timely milestones, and communicated proactively. Creuto's understanding of the client's industry stood out.",
    name: "Colton Wade",
    role: "CEO, Breuto",
    link: "https://clutch.co/go-to-review/4e36163a-56d5-4ae3-8b30-4c4d31c329d1/379506"
  },
  {
    quote: "“What impressed us most about Creuto was their deep understanding of HR processes.”",
    description: "Creuto's work cut the client's HR processing time by 40%, reduced payroll errors by 60%, and was adopted by 90% of the client's staff within the first month. The team demonstrated professionalism, deep domain knowledge, and a clear understanding of the client's requirements. They met all deadlines.",
    name: "Moumita Kulkarni",
    role: "Growth Manager, AP Associates",
    link: "https://clutch.co/go-to-review/4e36163a-56d5-4ae3-8b30-4c4d31c329d1/379117"
  }
];

const extendedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(16);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [visibleSlides, setVisibleSlides] = useState(3);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<number>(0);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Resize listener to support responsive sliding viewports
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleSlides(1);
      } else if (window.innerWidth < 960) {
        setVisibleSlides(2);
      } else {
        setVisibleSlides(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Compute currently centered active modular index
  const getActiveModularIndex = () => {
    if (visibleSlides === 3) {
      return (currentIndex + 1) % TESTIMONIALS.length;
    }
    return currentIndex % TESTIMONIALS.length;
  };

  const activeModularIndex = getActiveModularIndex();

  // Autoplay functionality
  const startAutoplay = () => {
    stopAutoplay();
    autoplayTimerRef.current = setInterval(() => {
      setCurrentIndex(prev => prev + 1);
    }, 4000);
  };

  const stopAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  };

  useEffect(() => {
    if (isDragging || isHovered) {
      stopAutoplay();
      return;
    }
    startAutoplay();
    return () => stopAutoplay();
  }, [currentIndex, isDragging, isHovered]);

  // Snapping back to the middle set quietly to allow infinite looping
  useEffect(() => {
    if (!isDragging) {
      const minIndex = TESTIMONIALS.length;
      const maxIndex = TESTIMONIALS.length * 2 - 1;
      if (currentIndex < minIndex || currentIndex > maxIndex) {
        const timer = setTimeout(() => {
          setTransitionEnabled(false);
          let modIndex = currentIndex % TESTIMONIALS.length;
          if (modIndex < 0) {
            modIndex += TESTIMONIALS.length;
          }
          setCurrentIndex(modIndex + TESTIMONIALS.length);
          setTimeout(() => {
            setTransitionEnabled(true);
          }, 20);
        }, 600); // Wait for transition duration
        return () => clearTimeout(timer);
      }
    }
  }, [currentIndex, isDragging]);

  // Mouse & Touch Pointer Swipe Interactions
  const handlePointerDown = (e: React.PointerEvent) => {
    stopAutoplay();
    setIsDragging(true);
    dragStartRef.current = e.clientX;
    setDragOffset(0);
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - dragStartRef.current;
    setDragOffset(diff);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }

    const slideWidth = containerRef.current ? containerRef.current.clientWidth / visibleSlides : 300;
    const threshold = slideWidth * 0.2; // 20% swipe threshold

    if (dragOffset < -threshold) {
      setCurrentIndex(prev => prev + 1);
    } else if (dragOffset > threshold) {
      setCurrentIndex(prev => prev - 1);
    }
    setDragOffset(0);
  };

  const handleDotClick = (dotIndex: number) => {
    stopAutoplay();
    let targetIndex = dotIndex;
    if (visibleSlides === 3) {
      targetIndex = dotIndex - 1;
    }
    const currentK = Math.round((currentIndex - targetIndex) / TESTIMONIALS.length);
    const finalTarget = targetIndex + currentK * TESTIMONIALS.length;
    setCurrentIndex(finalTarget);
  };

  // Compute modular center card index in our extended list
  const centerIndex = visibleSlides === 3 ? currentIndex + 1 : currentIndex;

  return (
    <>
      <section className="MuiBox-root mui-1abdohz">
        <div className="MuiBox-root mui-0">
          <div className="MuiBox-root mui-1rjwnmq" style={{"opacity":"1","transform":"translateY(1.25rem)"} as React.CSSProperties}>
            <div className="MuiChip-root MuiChip-outlined MuiChip-sizeMedium MuiChip-colorDefault MuiChip-outlinedDefault mui-1vp9gl0" style={{"opacity":"1","transform":"translateY(0.625rem)"} as React.CSSProperties}>
              <span className="MuiChip-label MuiChip-labelMedium mui-1fqh3rg">
                TESTIMONIALS
              </span>
            </div>
            <h2 className="MuiTypography-root MuiTypography-h2 mui-q6xed" style={{"opacity":"1","transform":"translateY(1.25rem)"} as React.CSSProperties}>
              What Our Clients Have to Say About Us
            </h2>
            <p className="MuiTypography-root MuiTypography-subtitle2 mui-1aqn3xk" style={{"opacity":"1","transform":"translateY(1.25rem)"} as React.CSSProperties}>
              A leading product engineering company, creating adaptive software solutions to improve operations.
            </p>
            <div className="MuiContainer-root MuiContainer-maxWidthLg mui-7umt5i">
              <div className="MuiGrid-root MuiGrid-container MuiGrid-direction-xs-row MuiGrid-spacing-xs-3 MuiGrid-spacing-md-6 mui-1q7l1ox">
                <div className="MuiGrid-root MuiGrid-direction-xs-row MuiGrid-grid-xs-12 MuiGrid-grid-sm-6 mui-olk9wb">
                  <a className="MuiBox-root mui-bujaci" target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/shorts/I9a9s8jQB1M">
                    <img alt="Client Success Story 1" loading="lazy" decoding="async" data-nimg="fill" className="thumbnail-img" style={{"position":"absolute","height":"100%","width":"100%","left":"0","top":"0","right":"0","bottom":"0","objectFit":"cover","color":"transparent","transition":"transform 0.5s ease"} as React.CSSProperties} sizes="100vw" srcSet="/_next/image?url=https%3A%2F%2Fimg.youtube.com%2Fvi%2FI9a9s8jQB1M%2Fmaxresdefault.jpg&w=640&q=75 640w, /_next/image?url=https%3A%2F%2Fimg.youtube.com%2Fvi%2FI9a9s8jQB1M%2Fmaxresdefault.jpg&w=750&q=75 750w, /_next/image?url=https%3A%2F%2Fimg.youtube.com%2Fvi%2FI9a9s8jQB1M%2Fmaxresdefault.jpg&w=828&q=75 828w, /_next/image?url=https%3A%2F%2Fimg.youtube.com%2Fvi%2FI9a9s8jQB1M%2Fmaxresdefault.jpg&w=1080&q=75 1080w, /_next/image?url=https%3A%2F%2Fimg.youtube.com%2Fvi%2FI9a9s8jQB1M%2Fmaxresdefault.jpg&w=1200&q=75 1200w, /_next/image?url=https%3A%2F%2Fimg.youtube.com%2Fvi%2FI9a9s8jQB1M%2Fmaxresdefault.jpg&w=1920&q=75 1920w, /_next/image?url=https%3A%2F%2Fimg.youtube.com%2Fvi%2FI9a9s8jQB1M%2Fmaxresdefault.jpg&w=2048&q=75 2048w, /_next/image?url=https%3A%2F%2Fimg.youtube.com%2Fvi%2FI9a9s8jQB1M%2Fmaxresdefault.jpg&w=3840&q=75 3840w" src="/cloned_next/maxresdefault8c4e.jpeg?url=https%3A%2F%2Fimg.youtube.com%2Fvi%2FI9a9s8jQB1M%2Fmaxresdefault.jpg&w=3840&q=75" />
                    <div className="info-overlay MuiBox-root mui-svj9vm">
                      <div className="MuiBox-root mui-0">
                        <p className="MuiTypography-root MuiTypography-body1 mui-qthyam">
                          Sonali Mohnani
                        </p>
                        <p className="MuiTypography-root MuiTypography-body1 mui-n6cn9j">
                          CEO, Lensdocket
                        </p>
                      </div>
                      <div className="MuiBox-root mui-goktz">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 17l10-10M7 7h10v10" />
                        </svg>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="MuiGrid-root MuiGrid-direction-xs-row MuiGrid-grid-xs-12 MuiGrid-grid-sm-6 mui-olk9wb">
                  <a className="MuiBox-root mui-bujaci" target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/shorts/yZWJAHOeIrg">
                    <img alt="Client Success Story 2" loading="lazy" decoding="async" data-nimg="fill" className="thumbnail-img" style={{"position":"absolute","height":"100%","width":"100%","left":"0","top":"0","right":"0","bottom":"0","objectFit":"cover","color":"transparent","transition":"transform 0.5s ease"} as React.CSSProperties} sizes="100vw" srcSet="/_next/image?url=https%3A%2F%2Fimg.youtube.com%2Fvi%2FyZWJAHOeIrg%2Fmaxresdefault.jpg&w=640&q=75 640w, /_next/image?url=https%3A%2F%2Fimg.youtube.com%2Fvi%2FyZWJAHOeIrg%2Fmaxresdefault.jpg&w=750&q=75 750w, /_next/image?url=https%3A%2F%2Fimg.youtube.com%2Fvi%2FyZWJAHOeIrg%2Fmaxresdefault.jpg&w=828&q=75 828w, /_next/image?url=https%3A%2F%2Fimg.youtube.com%2Fvi%2FyZWJAHOeIrg%2Fmaxresdefault.jpg&w=1080&q=75 1080w, /_next/image?url=https%3A%2F%2Fimg.youtube.com%2Fvi%2FyZWJAHOeIrg%2Fmaxresdefault.jpg&w=1200&q=75 1200w, /_next/image?url=https%3A%2F%2Fimg.youtube.com%2Fvi%2FyZWJAHOeIrg%2Fmaxresdefault.jpg&w=1920&q=75 1920w, /_next/image?url=https%3A%2F%2Fimg.youtube.com%2Fvi%2FyZWJAHOeIrg%2Fmaxresdefault.jpg&w=2048&q=75 2048w, /_next/image?url=https%3A%2F%2Fimg.youtube.com%2Fvi%2FyZWJAHOeIrg%2Fmaxresdefault.jpg&w=3840&q=75 3840w" src="/cloned_next/maxresdefault8963.jpeg?url=https%3A%2F%2Fimg.youtube.com%2Fvi%2FyZWJAHOeIrg%2Fmaxresdefault.jpg&w=3840&q=75" />
                    <div className="info-overlay MuiBox-root mui-svj9vm">
                      <div className="MuiBox-root mui-0">
                        <p className="MuiTypography-root MuiTypography-body1 mui-qthyam">
                          Ruksar Khan
                        </p>
                        <p className="MuiTypography-root MuiTypography-body1 mui-n6cn9j">
                          CEO, Brand Sutra
                        </p>
                      </div>
                      <div className="MuiBox-root mui-goktz">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 17l10-10M7 7h10v10" />
                        </svg>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <a target="_blank" rel="noopener noreferrer" style={{"textDecoration":"none"} as React.CSSProperties} href="https://www.youtube.com/@creutohq">
                <div className="MuiBox-root mui-zb939p">
                  View More Stories
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17l10-10M7 7h10v10" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
          
          <div className="MuiBox-root mui-1tbulv1" style={{ overflow: 'hidden', position: 'relative', width: '100%' }}>
            <div className="slick-slider slick-initialized" dir="ltr" style={{ width: '100%', position: 'relative' }}>
              <div 
                className="slick-list" 
                ref={containerRef}
                style={{ 
                  padding: '0px 0rem', 
                  overflow: 'hidden', 
                  position: 'relative', 
                  width: '100%', 
                  cursor: isDragging ? 'grabbing' : 'grab',
                  userSelect: 'none',
                  touchAction: 'pan-y'
                }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div 
                  className="slick-track" 
                  style={{
                    display: 'flex',
                    width: `${extendedTestimonials.length * (100 / visibleSlides)}%`,
                    transform: `translateX(calc(-${(currentIndex) * (100 / extendedTestimonials.length)}% + ${dragOffset}px))`,
                    transition: transitionEnabled ? (isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)') : 'none',
                  }}
                >
                  {extendedTestimonials.map((testimonial, idx) => {
                    const isCenter = idx === centerIndex;
                    return (
                      <div 
                        key={idx}
                        className="slick-slide" 
                        style={{ 
                          width: `${100 / extendedTestimonials.length}%`, 
                          flexShrink: 0,
                          padding: '0 12px',
                          boxSizing: 'border-box'
                        }}
                      >
                        <div>
                          <div className="MuiBox-root mui-3qyxih" style={{"width":"100%","display":"inline-block"} as React.CSSProperties}>
                            <a 
                              className={`MuiBox-root ${isCenter ? 'mui-998v6y' : 'mui-182invt'}`} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              aria-label={`Read testimonial from ${testimonial.name}`} 
                              href={testimonial.link}
                              onClick={(e) => {
                                if (isDragging) {
                                  e.preventDefault();
                                }
                              }}
                            >
                              <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 MuiCard-root mui-1mavqfs" style={{"--Paper-shadow":"none"} as React.CSSProperties}>
                                <div className="MuiBox-root mui-0">
                                  <p className="MuiTypography-root MuiTypography-body1 mui-1ivt2gg">
                                    {testimonial.quote}
                                  </p>                              
                                  <p className="MuiTypography-root MuiTypography-body1 mui-1f4qbtx">
                                    {testimonial.description}
                                  </p>
                                </div>                            
                                <div className="MuiBox-root mui-j0ozid">
                                  <div className="MuiBox-root mui-13brihr">
                                    <p className="MuiTypography-root MuiTypography-body1 mui-1fboi5y">
                                      {testimonial.name}
                                    </p>                                
                                    <p className="MuiTypography-root MuiTypography-body1 mui-chji2n">
                                      {testimonial.role}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          
          <div className="MuiBox-root mui-1vu3kve">
            {TESTIMONIALS.map((_, i) => {
              const isActive = i === activeModularIndex;
              return (
                <div 
                  key={i} 
                  className={`MuiBox-root ${isActive ? 'mui-8tirsb' : 'mui-i4n5ok'}`} 
                  onClick={() => handleDotClick(i)}
                  style={{ cursor: 'pointer', transition: 'background-color 0.3s ease, transform 0.3s ease' }}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
