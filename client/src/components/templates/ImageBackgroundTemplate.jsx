import CertificateTextOverlay from "./CertificateTextOverlay.jsx";

function ImageBackgroundTemplate({ backgroundImage, textTheme = "dark", ...certificateData }) {
  const shouldAddContrastOverlay = textTheme === "light" || textTheme === "gold";

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-white">
      {/* Recommended certificate background image size is 1600x1131 or higher for best PDF clarity. */}
      <img
        src={backgroundImage}
        alt="Certificate background"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none object-cover"
        draggable={false}
      />
      {shouldAddContrastOverlay && <div className="absolute inset-0 z-10 bg-black/30" />}
      <CertificateTextOverlay {...certificateData} textTheme={textTheme} />
    </div>
  );
}

export default ImageBackgroundTemplate;
