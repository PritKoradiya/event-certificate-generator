import TemplateFrame from "./TemplateFrame.jsx";
import templateConfigs from "./templateConfigs.js";

function AcademicSealTemplate(props) {
  return <TemplateFrame data={props} config={templateConfigs.academicSeal} />;
}

export default AcademicSealTemplate;
