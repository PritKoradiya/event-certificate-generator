import AcademicSealTemplate from "./templates/AcademicSealTemplate.jsx";
import BlueCorporateTemplate from "./templates/BlueCorporateTemplate.jsx";
import ClassicOrnateTemplate from "./templates/ClassicOrnateTemplate.jsx";
import DarkLuxuryTemplate from "./templates/DarkLuxuryTemplate.jsx";
import FloralCreativeTemplate from "./templates/FloralCreativeTemplate.jsx";
import GoldCornerTemplate from "./templates/GoldCornerTemplate.jsx";
import ImageBackgroundTemplate from "./templates/ImageBackgroundTemplate.jsx";
import MinimalElegantTemplate from "./templates/MinimalElegantTemplate.jsx";
import ModernWaveTemplate from "./templates/ModernWaveTemplate.jsx";
import PlayfulAwardTemplate from "./templates/PlayfulAwardTemplate.jsx";
import VintageBorderTemplate from "./templates/VintageBorderTemplate.jsx";
import templateData from "../data/templateData.js";

const templateComponents = {
  "academic-seal": AcademicSealTemplate,
  "blue-corporate": BlueCorporateTemplate,
  "classic-ornate": ClassicOrnateTemplate,
  "dark-luxury": DarkLuxuryTemplate,
  "floral-creative": FloralCreativeTemplate,
  "gold-corner": GoldCornerTemplate,
  "minimal-elegant": MinimalElegantTemplate,
  "modern-wave": ModernWaveTemplate,
  "playful-award": PlayfulAwardTemplate,
  "vintage-border": VintageBorderTemplate
};

const templateAliases = {
  "Academic Seal Certificate": "academic-seal",
  "Academic Achievement Certificate": "academic-seal",
  "Appreciation Certificate": "gold-corner",
  "Blue Corporate Certificate": "blue-corporate",
  "Coding Competition Certificate": "dark-luxury",
  "Completion Certificate": "minimal-elegant",
  "Conference Certificate": "blue-corporate",
  "Classic Certificate": "classic-ornate",
  "Classic Ornate Certificate": "classic-ornate",
  "Cultural Event Certificate": "floral-creative",
  "Dark Luxury Certificate": "dark-luxury",
  "Excellence Certificate": "gold-corner",
  "Expert Talk Certificate": "academic-seal",
  "FDP Certificate": "blue-corporate",
  "Floral Creative Certificate": "floral-creative",
  "Gold Achievement Certificate": "gold-corner",
  "Gold Corner Certificate": "gold-corner",
  "Hackathon Certificate": "dark-luxury",
  "Innovation Award Certificate": "gold-corner",
  "Internship Certificate": "blue-corporate",
  "Minimal Elegant Certificate": "minimal-elegant",
  "Modern Blue Certificate": "modern-wave",
  "Modern Wave Certificate": "modern-wave",
  "Participation Certificate": "playful-award",
  "Playful Award Certificate": "playful-award",
  "Project Exhibition Certificate": "modern-wave",
  "Seminar Certificate": "minimal-elegant",
  "Sports Event Certificate": "playful-award",
  "Technical Event Certificate": "blue-corporate",
  "Training Completion Certificate": "blue-corporate",
  "Volunteer Certificate": "floral-creative",
  "Vintage Border Certificate": "vintage-border"
};

function CertificatePreview({ certificateData = {}, previewId = "certificate-preview" }) {
  const selectedTemplate = [...templateData].reverse().find((template) => template.name === certificateData.templateStyle);
  const templateKey = certificateData.designKey || selectedTemplate?.designKey || templateAliases[certificateData.templateStyle] || "blue-corporate";
  const SelectedTemplate = templateComponents[templateKey] || BlueCorporateTemplate;
  const templateProps = {
    ...certificateData,
    backgroundImage: certificateData.backgroundImage || selectedTemplate?.backgroundImage,
    safeArea: certificateData.safeArea || selectedTemplate?.safeArea,
    textTheme: certificateData.textTheme || selectedTemplate?.textTheme
  };

  return (
    <section
      id={previewId}
      className="certificate-preview-root relative mx-auto aspect-[1.414/1] w-full max-w-[980px] overflow-hidden rounded-2xl bg-white"
    >
      {selectedTemplate?.designType === "image-background" ? (
        <ImageBackgroundTemplate {...templateProps} />
      ) : (
        <SelectedTemplate {...templateProps} />
      )}
    </section>
  );
}

export default CertificatePreview;
