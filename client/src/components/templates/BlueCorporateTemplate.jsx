import TemplateFrame from "./TemplateFrame.jsx";
import templateConfigs from "./templateConfigs.js";

function BlueCorporateTemplate(props) {
  return <TemplateFrame data={props} config={templateConfigs.blueCorporate} />;
}

export default BlueCorporateTemplate;
