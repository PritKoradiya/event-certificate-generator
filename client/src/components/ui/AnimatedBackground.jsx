function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      {/* Soft Radial Orbs */}
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-blue-400/15 via-indigo-400/10 to-transparent blur-3xl animate-float-blob" />
      <div className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-purple-400/15 via-pink-400/10 to-transparent blur-3xl animate-float-blob [animation-delay:5s]" />
      <div className="absolute -bottom-40 left-1/4 h-[550px] w-[550px] rounded-full bg-gradient-to-br from-cyan-400/15 via-teal-400/10 to-transparent blur-3xl animate-float-blob [animation-delay:10s]" />

      {/* Subtle Dot Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(#0f172a 1px, transparent 1px)`,
          backgroundSize: "24px 24px"
        }}
      />
    </div>
  );
}

export default AnimatedBackground;
