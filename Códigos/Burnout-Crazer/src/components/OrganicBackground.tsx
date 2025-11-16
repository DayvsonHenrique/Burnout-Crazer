export function OrganicBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Blue blob */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full opacity-30 blur-3xl"
        style={{
          background: 'linear-gradient(135deg, #4F9CF9 0%, #2E7DD6 100%)',
          top: '-150px',
          left: '-150px',
        }}
      />
      {/* Green blob */}
      <div 
        className="absolute w-[400px] h-[400px] rounded-full opacity-25 blur-3xl"
        style={{
          background: 'linear-gradient(135deg, #6EE7B7 0%, #34D399 100%)',
          bottom: '-100px',
          right: '-100px',
        }}
      />
      {/* Purple blob */}
      <div 
        className="absolute w-[350px] h-[350px] rounded-full opacity-20 blur-3xl"
        style={{
          background: 'linear-gradient(135deg, #C4B5FD 0%, #A78BFA 100%)',
          top: '40%',
          left: '30%',
        }}
      />
      {/* Light blue blob */}
      <div 
        className="absolute w-[300px] h-[300px] rounded-full opacity-25 blur-2xl"
        style={{
          background: 'linear-gradient(135deg, #7DD3FC 0%, #38BDF8 100%)',
          bottom: '30%',
          left: '10%',
        }}
      />
    </div>
  );
}
