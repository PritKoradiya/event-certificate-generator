function LoadingState({ message = "Loading workspace data..." }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200/80 bg-white/90 p-12 text-center shadow-sm backdrop-blur-md">
      <div className="relative flex h-12 w-12 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
      </div>
      <p className="mt-4 text-sm font-bold text-slate-600">{message}</p>
    </div>
  );
}

export default LoadingState;
