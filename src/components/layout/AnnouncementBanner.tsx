"use client"

import Link from "next/link"
import announcementConfig from "@/constants/announcement.json"

export default function AnnouncementBanner() {
  const { message, link } = announcementConfig

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @-webkit-keyframes animation-rtdu3u {
          from { -webkit-transform: translateX(0); }
          to { -webkit-transform: translateX(calc(-100% - 32px)); }
        }
        @keyframes animation-rtdu3u {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-100% - 32px)); }
        }
        .mui-1h4dmgi {
          background: url('/img/top-banner.webp') !important;
          background-size: cover !important;
          background-position: center !important;
          background-repeat: no-repeat !important;
          color: white !important;
          position: fixed !important;
          height: 3rem !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          z-index: 11 !important;
          cursor: pointer !important;
          text-decoration: none !important;
          display: block !important;
        }
        .mui-1h4dmgi:hover .icon-bounce {
          transform: translate(2px, -2px) !important;
        }
        .mui-hbe0f5 {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          padding-top: 8px !important;
          padding-bottom: 8px !important;
          min-height: 48px !important;
        }
        .mui-ptm7k7 {
          display: flex !important;
          align-items: center !important;
          flex: 1 !important;
          overflow: hidden !important;
          white-space: nowrap !important;
          gap: 32px !important;
        }
        .mui-1sqj2k1 {
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
          flex-shrink: 0 !important;
          -webkit-animation: animation-rtdu3u 60s linear infinite !important;
          animation: animation-rtdu3u 60s linear infinite !important;
        }
        .mui-1lbq0s0 {
          margin: 0 !important;
          font-weight: 400 !important;
          font-size: 0.725rem !important;
          font-family: 'Bricolage Grotesque', 'Bricolage Grotesque Fallback', sans-serif !important;
          line-weight: 1.43 !important;
          font-weight: 500 !important;
          line-height: 1.4 !important;
          color: white !important;
        }
        @media (max-width:899.95px){.mui-1lbq0s0{font-size:0.875rem !important;}}
        @media (max-width:599.95px){.mui-1lbq0s0{font-size:0.75rem !important;}}
        @media (min-width:0px){.mui-1lbq0s0{font-size:0.75rem !important;}}
        @media (min-width:600px){.mui-1lbq0s0{font-size:0.9rem !important;}}
        .mui-haurmb {
          width: 10px !important;
          height: 10px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          transition: transform 0.3s ease-in-out !important;
        }
        .mui-haurmb svg {
          width: 10px !important;
          height: 10px !important;
        }
      `}} />
      <Link href={link} className="MuiBox-root mui-1h4dmgi" target="_blank" rel="noopener noreferrer">
        <div className="MuiBox-root mui-hbe0f5">
          <div className="MuiBox-root mui-ptm7k7">
            {/* Render 10 items to cover large viewports cleanly */}
            {[...Array(10)].map((_, i) => (
              <div key={i} className="MuiBox-root mui-1sqj2k1" aria-hidden={i > 0 ? "true" : "false"}>
                <p className="MuiTypography-root MuiTypography-body2 mui-1lbq0s0">
                  {message}
                </p>
                <div className="icon-bounce MuiBox-root mui-haurmb">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M0.558058 10.5581C0.313981 10.8021 0.313981 11.1979 0.558058 11.4419C0.802135 11.686 1.19786 11.686 1.44194 11.4419L7.25 5.63388L10.5581 8.94194C10.7368 9.12069 11.0056 9.17416 11.2392 9.07743C11.4727 8.98069 11.625 8.75279 11.625 8.5V1C11.625 0.654823 11.3452 0.375001 11 0.375001L3.5 0.375C3.24721 0.375 3.01931 0.527276 2.92258 0.760822C2.82584 0.994369 2.87931 1.26319 3.05806 1.44194L6.36612 4.75L0.558058 10.5581Z" fill="currentColor"></path>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Link>
    </>
  )
}
