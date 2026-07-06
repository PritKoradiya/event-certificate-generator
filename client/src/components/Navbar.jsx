function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4">
        <div>
          <h1 className="text-lg font-bold text-slate-950 sm:text-xl">
            Event Certificate Generator
          </h1>
          <p className="hidden text-sm text-slate-500 sm:block">
            College event certificate management dashboard
          </p>
        </div>
        <div className="rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-700">
          Step 1
        </div>
      </div>
    </header>
  );
}

export default Navbar;
