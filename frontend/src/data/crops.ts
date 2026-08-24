export type CropInfo = {
  id: string;
  name: string;
  commonDiseases: {
    name: string;
    symptoms: string;
    treatment: string;
  }[];
};

export const CROPS: CropInfo[] = [
  {
    id: "tomato", name: "Tomato",
    commonDiseases: [
      { name: "Early Blight", symptoms: "Dark concentric rings on lower leaves; yellowing.", treatment: "Mancozeb 75% WP @ 2g/L water; remove infected leaves; rotate crops." },
      { name: "Late Blight", symptoms: "Water-soaked spots, white mold underside of leaves.", treatment: "Metalaxyl + Mancozeb spray; improve air circulation; avoid overhead watering." },
      { name: "Bacterial Wilt", symptoms: "Sudden wilting, brown vascular tissue.", treatment: "Streptocycline 200ppm soil drench; use resistant varieties; solarize soil." },
    ],
  },
  {
    id: "rice", name: "Rice",
    commonDiseases: [
      { name: "Rice Blast", symptoms: "Diamond-shaped lesions on leaves, neck rot.", treatment: "Tricyclazole 75% WP @ 0.6g/L; balanced nitrogen; resistant cultivars." },
      { name: "Bacterial Leaf Blight", symptoms: "Yellow water-soaked lesions along leaf margins.", treatment: "Copper oxychloride spray; avoid excess nitrogen; certified seed." },
    ],
  },
  {
    id: "wheat", name: "Wheat",
    commonDiseases: [
      { name: "Rust (Yellow/Brown)", symptoms: "Orange-yellow pustules on leaves.", treatment: "Propiconazole 25% EC @ 1ml/L water; resistant varieties." },
      { name: "Powdery Mildew", symptoms: "White powdery growth on leaves and stems.", treatment: "Sulfur 80% WP @ 2.5g/L; avoid dense planting." },
    ],
  },
  {
    id: "potato", name: "Potato",
    commonDiseases: [
      { name: "Late Blight", symptoms: "Dark lesions on leaves; rotting tubers.", treatment: "Mancozeb + Metalaxyl spray; destroy infected plants; well-drained soil." },
      { name: "Early Blight", symptoms: "Brown target-shaped spots on older leaves.", treatment: "Chlorothalonil 75% WP @ 2g/L; crop rotation." },
    ],
  },
  {
    id: "maize", name: "Maize",
    commonDiseases: [
      { name: "Northern Leaf Blight", symptoms: "Long cigar-shaped grey-green lesions.", treatment: "Mancozeb 75% WP @ 2.5g/L; resistant hybrids; residue management." },
      { name: "Fall Armyworm", symptoms: "Ragged holes in whorl, sawdust frass.", treatment: "Emamectin Benzoate 5% SG @ 0.4g/L; pheromone traps." },
    ],
  },
  {
    id: "cotton", name: "Cotton",
    commonDiseases: [
      { name: "Bollworm", symptoms: "Holes in bolls, damaged flowers.", treatment: "Spinosad 45% SC @ 0.3ml/L; Bt cotton; pheromone traps." },
      { name: "Leaf Curl Virus", symptoms: "Upward curling, thickened veins.", treatment: "Control whitefly vector with Imidacloprid 17.8% SL; remove infected plants." },
    ],
  },
  {
    id: "grape", name: "Grape",
    commonDiseases: [
      { name: "Downy Mildew", symptoms: "Yellow oily spots, white fuzz underside.", treatment: "Bordeaux mixture 1%; canopy management." },
      { name: "Powdery Mildew", symptoms: "White dusty patches on leaves and berries.", treatment: "Sulfur dust; potassium bicarbonate sprays." },
    ],
  },
  {
    id: "apple", name: "Apple",
    commonDiseases: [
      { name: "Apple Scab", symptoms: "Olive-green velvety spots on leaves and fruit.", treatment: "Captan 50% WP @ 2g/L; prune for airflow; sanitation." },
      { name: "Fire Blight", symptoms: "Blackened shoots with shepherd's crook.", treatment: "Streptomycin spray at bloom; prune 30cm below infection." },
    ],
  },
];