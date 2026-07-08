import TemplateFrame from "./TemplateFrame.jsx";
import templateConfigs from "./templateConfigs.js";

function VintageBorderTemplate(props) {
  return <TemplateFrame data={props} config={templateConfigs.vintageBorder} />;
}

export default VintageBorderTemplate;
