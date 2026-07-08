import TemplateFrame from "./TemplateFrame.jsx";
import templateConfigs from "./templateConfigs.js";

function PlayfulAwardTemplate(props) {
  return <TemplateFrame data={props} config={templateConfigs.playfulAward} />;
}

export default PlayfulAwardTemplate;
