export const Avatar = () => {
  return (
    <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="500" viewBox="0 0 200 500">
  {/* <!-- Head --> */}
  <circle cx="100" cy="80" r="50" fill="#F8D3B0" stroke="#000" stroke-width="4" />
  
  {/* <!-- Neck --> */}
  <rect x="90" y="130" width="20" height="20" fill="#F8D3B0" stroke="#000" stroke-width="4" />
  
  {/* <!-- Body --> */}
  <path d="M70 150 Q100 300 130 150 Z" fill="#F8D3B0" stroke="#000" stroke-width="4" />
  
  {/* <!-- Arms --> */}
  <line x1="70" y1="150" x2="50" y2="250" stroke="#000" stroke-width="8" />
  <line x1="130" y1="150" x2="150" y2="250" stroke="#000" stroke-width="8" />
  
  {/* <!-- Legs --> */}
  <rect x="80" y="300" width="20" height="150" fill="#F8D3B0" stroke="#000" stroke-width="4" />
  <rect x="100" y="300" width="20" height="150" fill="#F8D3B0" stroke="#000" stroke-width="4" />
  
  {/* <!-- Torso (Outline) --> */}
  <path d="M60 150 Q100 350 140 150 Z" fill="none" stroke="#000" stroke-width="4" />
</svg>

    </div>
  );
};
