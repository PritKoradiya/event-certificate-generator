import TemplateFrame from "./TemplateFrame.jsx";
import templateConfigs from "./templateConfigs.js";

function DarkLuxuryTemplate(props) {
  return <TemplateFrame data={props} config={templateConfigs.darkLuxury} />;
}

export default DarkLuxuryTemplate;
