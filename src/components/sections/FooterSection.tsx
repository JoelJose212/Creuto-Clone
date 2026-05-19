import React from 'react';

export default function FooterSection() {
  return (
    <>
      <div className="MuiBox-root mui-160f6iq">
        <button aria-label="Chat on WhatsApp" style={{"width":"58px","height":"58px","border":"none","padding":"0","background":"transparent","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center","outline":"none"} as React.CSSProperties}>
          <div style={{"display":"flex","alignItems":"center","justifyContent":"center","opacity":"1","transform":"scale(0.5) rotate(-90deg)"} as React.CSSProperties}>
            <div className="MuiBox-root mui-1uwbf0d">
              <img src="/img/floatingIcon/OpenIcon.webp" alt="WhatsApp" style={{"width":"36px","height":"36px"} as React.CSSProperties} />
            </div>
          </div>
        </button>
      </div>

    </>
  );
}
