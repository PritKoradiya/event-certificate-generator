import TemplateFrame from "./TemplateFrame.jsx";
import templateConfigs from "./templateConfigs.js";

function MinimalElegantTemplate(props) {
  return <TemplateFrame data={props} config={templateConfigs.minimalElegant} />;
}

export default MinimalElegantTemplate;
