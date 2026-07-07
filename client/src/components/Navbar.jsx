function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-blue-100 bg-white/85 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex min-h-20 w-full max-w-[1600px] items-center justify-between gap-4 px-4 py-3 sm:px-5 lg:px-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            Event Certificate Generator
          </h1>
          <p className="hidden text-base font-medium text-slate-500 sm:block">
            College event certificate management dashboard
          </p>
        </div>
        <div className="shimmer rounded-full border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-cyan-50 px-4 py-2 text-sm font-bold text-primary-700 shadow-sm sm:px-5">
          Step 6B
        </div>
      </div>
    </header>
  );
}

export default Navbar;
