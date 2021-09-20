import aboutHTML from "./about.html";
import modalCulturalHTML from "./modal_cultural.html";
import modalEnvironmentalHTML from "./modal_environmental.html";
import modalResearchHTML from "./modal_research.html";

export const loadedWebHTML = {
    "about": aboutHTML,
    "modal_cultural": modalCulturalHTML,
    "modal_environmental": modalEnvironmentalHTML,
    "modal_research": modalResearchHTML,
};

const AboutHTMLResources = {
    "about": require("./about.html"),
    "modal_cultural": require("./modal_cultural.html"),
    "modal_environmental": require("./modal_environmental.html"),
    "modal_research": require("./modal_research.html"),
};

export default AboutHTMLResources;
