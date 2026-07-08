import TemplateFrame from "./TemplateFrame.jsx";
import templateConfigs from "./templateConfigs.js";

function GoldCornerTemplate(props) {
  return <TemplateFrame data={props} config={templateConfigs.goldCorner} />;
}

export default GoldCornerTemplate;
