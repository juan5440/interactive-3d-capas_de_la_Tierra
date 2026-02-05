export interface EarthLayer {
  id: string;
  name: string;
  nameEn: string;
  depth: string;
  thickness: string;
  temperature: string;
  state: string;
  composition: string;
  density: string;
  color: string;
  colorHex: string;
  glowColor: string;
  radius: number; // normalized radius for 3D
  description: string;
  facts: string[];
  icon: string;
}

export const earthLayers: EarthLayer[] = [
  {
    id: "atmosphere",
    name: "Atmósfera",
    nameEn: "Atmosphere",
    depth: "0 - 10,000 km sobre la superficie",
    thickness: "~10,000 km",
    temperature: "-90°C a 1,500°C",
    state: "Gaseoso",
    composition: "78% Nitrógeno, 21% Oxígeno, 1% otros gases (Argón, CO₂, vapor de agua)",
    density: "1.225 kg/m³ (al nivel del mar)",
    color: "from-sky-300 to-blue-500",
    colorHex: "#60a5fa",
    glowColor: "#3b82f6",
    radius: 3.2,
    description:
      "La atmósfera es la capa gaseosa que envuelve la Tierra. Se divide en cinco subcapas: troposfera, estratosfera, mesosfera, termosfera y exosfera. Protege la vida en la Tierra al absorber la radiación ultravioleta del Sol, calentar la superficie mediante la retención de calor (efecto invernadero) y reducir las diferencias de temperatura entre el día y la noche.",
    facts: [
      "La troposfera (0-12 km) contiene el 75% de la masa atmosférica y es donde ocurre el clima",
      "La capa de ozono en la estratosfera absorbe el 97-99% de la radiación UV del Sol",
      "La línea de Kármán (100 km) se considera el límite entre la atmósfera y el espacio exterior",
      "La atmósfera terrestre es la única conocida con un 21% de oxígeno libre",
      "Sin la atmósfera, la temperatura promedio de la Tierra sería de -18°C en lugar de 15°C",
    ],
    icon: "🌤️",
  },
  {
    id: "crust",
    name: "Corteza Terrestre",
    nameEn: "Crust",
    depth: "0 - 70 km",
    thickness: "5-70 km",
    temperature: "0°C a 500°C",
    state: "Sólido",
    composition:
      "Corteza oceánica: basalto (rica en silicio y magnesio). Corteza continental: granito (rica en silicio y aluminio)",
    density: "2.7 - 3.0 g/cm³",
    color: "from-amber-600 to-yellow-700",
    colorHex: "#b45309",
    glowColor: "#d97706",
    radius: 2.8,
    description:
      "La corteza terrestre es la capa más externa y delgada de la Tierra. Existen dos tipos: la corteza oceánica (5-10 km de espesor, más densa) y la corteza continental (30-70 km, menos densa). La corteza forma parte de las placas tectónicas que flotan sobre el manto superior. Representa menos del 1% del volumen total de la Tierra.",
    facts: [
      "La corteza oceánica es más joven (máx. 200 millones de años) que la continental (hasta 4,400 millones de años)",
      "El punto más profundo perforado por el ser humano es el Pozo Superprofundo de Kola: 12.26 km",
      "La corteza continental es como una 'balsa' de granito flotando sobre rocas más densas",
      "Los terremotos ocurren cuando las placas tectónicas de la corteza se mueven y chocan entre sí",
      "La corteza representa solo el 0.5% de la masa total de la Tierra",
    ],
    icon: "🏔️",
  },
  {
    id: "upper-mantle",
    name: "Manto Superior",
    nameEn: "Upper Mantle",
    depth: "70 - 670 km",
    thickness: "~600 km",
    temperature: "500°C a 900°C",
    state: "Sólido/Plástico (parcialmente fundido)",
    composition:
      "Peridotita (olivino, piroxeno). Rica en silicatos de hierro y magnesio",
    density: "3.4 - 4.4 g/cm³",
    color: "from-orange-500 to-red-600",
    colorHex: "#ea580c",
    glowColor: "#f97316",
    radius: 2.4,
    description:
      "El manto superior se extiende desde la base de la corteza hasta unos 670 km de profundidad. Incluye la astenosfera, una zona parcialmente fundida y plástica donde las placas tectónicas se deslizan. Las corrientes de convección en esta capa son el motor que mueve las placas tectónicas, causando terremotos, volcanes y la formación de montañas.",
    facts: [
      "La astenosfera (100-300 km) se comporta como un fluido viscoso, permitiendo el movimiento de las placas",
      "Las corrientes de convección del manto mueven las placas tectónicas a una velocidad de 2-15 cm/año",
      "El magma que sale en los volcanes proviene principalmente del manto superior",
      "La litosfera (corteza + manto superior rígido) tiene entre 70-250 km de espesor",
      "La temperatura aumenta aproximadamente 25°C por cada kilómetro de profundidad en esta capa",
    ],
    icon: "🌋",
  },
  {
    id: "lower-mantle",
    name: "Manto Inferior",
    nameEn: "Lower Mantle",
    depth: "670 - 2,900 km",
    thickness: "~2,230 km",
    temperature: "900°C a 3,700°C",
    state: "Sólido (pero fluye lentamente)",
    composition:
      "Silicatos de magnesio y hierro bajo alta presión (bridgmanita, ferropericlasa)",
    density: "4.4 - 5.6 g/cm³",
    color: "from-red-600 to-red-800",
    colorHex: "#dc2626",
    glowColor: "#ef4444",
    radius: 1.9,
    description:
      "El manto inferior es la capa más voluminosa de la Tierra, extendiéndose desde los 670 km hasta los 2,900 km de profundidad. Aunque es sólido, fluye extremadamente lento debido a las enormes presiones y temperaturas. Los minerales aquí adoptan estructuras cristalinas únicas debido a la presión extrema. Se cree que grandes estructuras termoquímicas (LLSVPs) en la base del manto influyen en la actividad volcánica superficial.",
    facts: [
      "La presión en el manto inferior alcanza los 140 GPa (1.4 millones de atmósferas)",
      "El mineral más abundante de la Tierra, la bridgmanita, se encuentra aquí",
      "Las 'superplumas' del manto inferior pueden causar erupciones volcánicas masivas en la superficie",
      "El manto inferior representa el 56% del volumen total de la Tierra",
      "Se han detectado 'cementerios de placas tectónicas' hundidas hasta el fondo del manto inferior",
    ],
    icon: "🔥",
  },
  {
    id: "outer-core",
    name: "Núcleo Externo",
    nameEn: "Outer Core",
    depth: "2,900 - 5,150 km",
    thickness: "~2,250 km",
    temperature: "3,700°C a 4,500°C",
    state: "Líquido",
    composition: "Hierro y níquel líquidos, con pequeñas cantidades de azufre, oxígeno y silicio",
    density: "9.9 - 12.2 g/cm³",
    color: "from-yellow-500 to-orange-600",
    colorHex: "#f59e0b",
    glowColor: "#eab308",
    radius: 1.4,
    description:
      "El núcleo externo es una capa de hierro y níquel en estado líquido que rodea el núcleo interno. Su movimiento de convección genera corrientes eléctricas que producen el campo magnético de la Tierra (la geodínamo). Este campo magnético es esencial para la vida, ya que protege al planeta del viento solar y la radiación cósmica. Sin él, la atmósfera sería erosionada por el viento solar, como ocurrió en Marte.",
    facts: [
      "Las corrientes de hierro líquido generan el campo magnético terrestre mediante el efecto dinamo",
      "El campo magnético se invierte periódicamente: la última inversión fue hace 780,000 años",
      "La velocidad del flujo del hierro líquido es de aproximadamente 20 km/año",
      "El núcleo externo es tan caliente como la superficie del Sol",
      "Sin el campo magnético generado aquí, la vida en la Tierra sería imposible como la conocemos",
    ],
    icon: "🧲",
  },
  {
    id: "inner-core",
    name: "Núcleo Interno",
    nameEn: "Inner Core",
    depth: "5,150 - 6,371 km",
    thickness: "~1,221 km de radio",
    temperature: "5,000°C a 7,000°C",
    state: "Sólido",
    composition: "Hierro y níquel cristalinos, posiblemente con algo de oro y platino",
    density: "12.6 - 13.1 g/cm³",
    color: "from-yellow-300 to-yellow-500",
    colorHex: "#fbbf24",
    glowColor: "#fde047",
    radius: 0.7,
    description:
      "El núcleo interno es una esfera sólida de hierro y níquel cristalino en el centro mismo de la Tierra. A pesar de tener temperaturas comparables a la superficie del Sol (5,000-7,000°C), permanece sólido debido a la presión extrema de 360 GPa (3.6 millones de atmósferas). Fue descubierto en 1936 por la sismóloga danesa Inge Lehmann mediante el análisis de ondas sísmicas.",
    facts: [
      "El núcleo interno tiene aproximadamente el tamaño de la Luna (1,221 km de radio)",
      "Crece aproximadamente 1 mm por año a medida que el núcleo externo se solidifica",
      "La presión aquí es 3.6 millones de veces la presión atmosférica en la superficie",
      "Descubierto en 1936 por Inge Lehmann al estudiar ondas sísmicas de terremotos",
      "Estudios recientes sugieren que podría tener una estructura cristalina anisotrópica con un 'núcleo más interno'",
      "Se estima que contiene suficiente oro para cubrir la superficie terrestre con una capa de 45 cm",
    ],
    icon: "💎",
  },
];
