export function BrainLogo({ size = 80 }: { size?: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Brain outline */}
      <path 
        d="M50 15C35 15 25 25 25 35C25 37 25 39 26 41C23 42 20 45 20 50C20 53 21 55 23 57C21 59 20 62 20 65C20 70 23 74 27 76C27 82 32 87 40 88C42 88 44 88 46 87C47 89 49 90 52 90C55 90 57 89 58 87C60 88 62 88 64 88C72 87 77 82 77 76C81 74 84 70 84 65C84 62 83 59 81 57C83 55 84 53 84 50C84 45 81 42 78 41C79 39 79 37 79 35C79 25 69 15 50 15Z" 
        fill="#FF6B35"
        stroke="#FF6B35" 
        strokeWidth="2"
      />
      {/* Brain details */}
      <path 
        d="M35 30C33 32 32 35 32 38C32 40 33 42 34 44M48 25C46 27 45 30 45 33M60 28C62 30 63 33 63 36M70 40C72 42 73 45 73 48M30 50C28 52 27 55 27 58M73 55C75 57 76 60 76 63" 
        stroke="#FFF" 
        strokeWidth="1.5" 
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* Center details */}
      <circle cx="45" cy="45" r="3" fill="#FFF" opacity="0.6"/>
      <circle cx="58" cy="48" r="2.5" fill="#FFF" opacity="0.6"/>
      <circle cx="50" cy="60" r="2" fill="#FFF" opacity="0.6"/>
    </svg>
  );
}
