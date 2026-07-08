import TemplateFrame from "./TemplateFrame.jsx";
import templateConfigs from "./templateConfigs.js";

function ModernWaveTemplate(props) {
  return <TemplateFrame data={props} config={templateConfigs.modernWave} />;
}

export default ModernWaveTemplate;
