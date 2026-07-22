import React, { forwardRef } from "react";
import PosterSvg from "./poster/PosterSvg.jsx";

/**
 * PosterPreview
 * A responsive wrapper shell around PosterSvg.
 * Does not use responsive HTML/CSS poster markup.
 * SVG viewBox handles all scaling and responsive preview behavior.
 */
const PosterPreview = forwardRef(function PosterPreview(props, ref) {
  const { id = "poster-preview-svg" } = props;

  return (
    <div className="poster-preview-shell">
      <PosterSvg
        ref={ref}
        id={id}
        {...props}
      />
    </div>
  );
});

export default React.memo(PosterPreview);
