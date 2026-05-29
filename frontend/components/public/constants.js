// Couleurs 
export const BEIGE = "#ede8de";
export const BEIGE_DARK = "#e2dbd0";
export const BRUN = "#3d1a0e";

// Images 
export const IMAGES = {
    paille: "https://static.wixstatic.com/media/457787_636791b4baad4907b60f835956955fc3~mv2.jpg/v1/fill/w_980,h_653,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_636791b4baad4907b60f835956955fc3~mv2.jpg",
    poele: "https://static.wixstatic.com/media/3e33e8_06a3e5044e5143f5932fcc4f69a2eede~mv2.jpg/v1/fill/w_941,h_706,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/3e33e8_06a3e5044e5143f5932fcc4f69a2eede~mv2.jpg",
    photo: "https://static.wixstatic.com/media/3e33e8_31acae3ecc7d4c1ab32197337fb25806~mv2.jpg/v1/fill/w_980,h_608,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3e33e8_31acae3ecc7d4c1ab32197337fb25806~mv2.jpg",
    bandeau: "https://static.wixstatic.com/media/3e33e8_d74efc6c8f1f4e95800c902d07a36027~mv2.jpg/v1/fill/w_381,h_1920,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3e33e8_d74efc6c8f1f4e95800c902d07a36027~mv2.jpg",
    porte: "https://static.wixstatic.com/media/f4c673_bfb45c777c99497f897266941e875ff9~mv2.png/v1/fill/w_475,h_285,al_c,q_85,enc_avif,quality_auto/f4c673_bfb45c777c99497f897266941e875ff9~mv2.png",
    gif: "https://static.wixstatic.com/media/f4c673_9e107a544f7a4064a4a68de072001bac~mv2.gif",
    logo: "https://static.wixstatic.com/media/f4c673_e47b03f2fb7e4abeaefbc943276b6819~mv2.png/v1/fill/w_29,h_29,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/f4c673_e47b03f2fb7e4abeaefbc943276b6819~mv2.png",
};

// ── Config par formation 
export const FORMATION_CONFIG = {
    "paille-terre-chaux": {
        sousTitre: "Construire · Rénover · Isoler · Décorer",
        desc: "Apprenez les clés pour réaliser votre projet durable, performant et confortable. Une formation complète pour passer de la théorie au chantier.",
        detail: "Enduits, isolation paille, torchis, chaux — toutes les techniques fondamentales de la construction naturelle, animées par André depuis 25 ans.",
        img: IMAGES.paille,
        cardBg: "#c8a040",
        accent: "#a07828",
        patternId: "pat-paille",
        patternType: "paille",
    },
    "poele-de-masse": {
        sousTitre: "1 heure de feu = 24h de confort",
        desc: "Construisez votre poêle personnalisé. Les apports du stage vous permettent de réaliser ensuite votre projet en toute autonomie.",
        detail: "Conception, dimensionnement, maçonnerie réfractaire — vous repartez avec tous les plans de votre futur poêle.",
        img: IMAGES.poele,
        cardBg: "#c06030",
        accent: "#8f3e18",
        patternId: "pat-feu",
        patternType: "feu",
    },
    photovoltaique: {
        sousTitre: "Par Sébastien Deroo",
        desc: "Pour toute personne désirant être davantage autonome, résiliente et économe dans sa consommation d'énergie.",
        detail: "Dimensionnement, câblage, batteries, régulateurs — maîtrisez votre installation solaire de A à Z.",
        img: IMAGES.photo,
        cardBg: "#4a7a8a",
        accent: "#2d5f70",
        patternId: "pat-solaire",
        patternType: "solaire",
    },
};

//  Témoignages 
export const TEMOIGNAGES = [
    {
        texte: ` Excellent. Autant indispensable pour préparer son projet que pour se lancer si on est intrépide. Studieux et "intense" de 9h à 18h. Qualité / Prix imbattable... pas interdit d'apporter des spécialités à partager. Je recommande sans hésitation`,
        auteur: "jerome B.",
        formation: "Poêle de Masse",
        note: 5, accent: "#a07828",
    },
    {
        texte: `J’ai suivie une formation très instructive sur les poêles de masse avec André. C’était pratique, complet et très agréable! Merci encore!`,
        auteur: "Charles-Olivier L.",
        formation: "Poêle de Masse",
        note: 5, accent: "#8f3e18",
    },
    {
        texte: "Super formation poêle de masse ! André est convaincue et convaincant.",
        auteur: "frédéric G.",
        formation: "Poêle de Masse",
        note: 5, accent: "#2d5f70",
    },
];
