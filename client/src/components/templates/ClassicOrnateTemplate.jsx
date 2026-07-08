import TemplateFrame from "./TemplateFrame.jsx";
import templateConfigs from "./templateConfigs.js";

function ClassicOrnateTemplate(props) {
  return <TemplateFrame data={props} config={templateConfigs.classicOrnate} />;
}

export default ClassicOrnateTemplate;
