function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-blue-100 bg-white/90 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex min-h-20 w-full max-w-[1600px] flex-col items-start justify-between gap-4 px-4 py-4 sm:px-5 md:flex-row md:items-center lg:px-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl lg:text-[34px]">
            Event Certificate Generator
          </h1>
          <p className="mt-1 text-sm font-semibold text-slate-500 sm:text-base">
            Smart certificate and event document management platform
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-700 shadow-sm">
            Export Ready
          </span>
          <span className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-black text-primary-700 shadow-sm">
            Template Studio
          </span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
