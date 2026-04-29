const Logo = () => {
  return (
    <div className="logo">
      {/* ICON */}
      <div className="logo-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://w3.org">
          {/* Lamp Base  */}
          <ellipse cx="12" cy="21" rx="3" ry="1" fill="white" />
          
          {/* Lamp Body  */}
          <path 
            d="M4 17C4 14 7 13 12 13C17 13 20 14 20 17C20 19 16 20 12 20C8 20 4 19 4 17Z" 
            fill="white" 
          />
          
          {/*  Spout  */}
          <path 
            d="M20 17L23 16L20 15" 
            fill="white" 
          />

          {/*  Handle  */}
          <path 
            d="M5 16.5C3 16.5 2 15 2 13.5C2 12 3.5 12 4.5 13" 
            stroke="white" 
            strokeWidth="1.2" 
            strokeLinecap="round" 
            fill="none" 
          />

          {/*  Lid & Knob  */}
          <path d="M9 13.5C9 12 10 11 12 11C14 11 15 12 15 13.5" fill="white" />
          <circle cx="12" cy="10.5" r="0.8" fill="white" />

          {/* Magic Smoke  */}
          <path 
            d="M18 14C19 11 16 9 18 6C19 4 21 4 20 2" 
            stroke="white" 
            strokeWidth="1" 
            strokeLinecap="round" 
            fill="none"
          />
        </svg>
      </div>

      {/* TEXT */}
      <div className="logo-text-wrap">
        <span className="logo-text">TaskGenie</span>
        <span className="logo-sub">Your AI assistant</span>
      </div>
    </div>
  );
};

export default Logo;
