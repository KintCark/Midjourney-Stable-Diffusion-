
const outdoorScenes = ["Forest", "Beach", "Desert", "Mountains", "Fantasy Realm"];
const indoorScenes = ["Studio Backdrop", "Cyberpunk City", "Classroom", "Bedroom", "Ancient Cathedral Interior"];




const backgroundOverrides = {
  "Anime": "sakura field",
  "Photorealistic": "realistic studio backdrop",
  "Cyberpunk": "neon-lit city street",
  "Fantasy": "enchanted forest",
  "Gothic": "ancient cathedral interior",
  "Oil Painting": "renaissance backdrop",
  "Pixel Art": "pixelated dungeon",
  "3D Render": "virtual modeling space",
  "Dark Art": "shadowy void"
};

const focalMap = {
  "Anime": "shallow depth of field, large aperture",
  "Photorealistic": "DSLR clarity, natural bokeh",
  "Cyberpunk": "depth-enhanced futuristic lensing",
  "Fantasy": "ethereal focus, cinematic blur",
  "Dark Art": "heavy vignetting, surreal focus"
};

const cameraMap = {
  "Photorealistic": "full-body shot",
  "Anime": "close-up anime portrait",
  "Oil Painting": "half-length painted portrait",
  "Sketch": "sketched bust drawing",
  "Cyberpunk": "cinematic close-up with neon lights",
  "Fantasy": "epic fantasy portrait",
  "Gothic": "dark gothic bust",
  "Watercolor": "delicate watercolor bust",
  "Cartoon": "cartoon character portrait",
  "Pixel Art": "pixelated sprite view",
  "3D Render": "3D rendered perspective",
  "Film Noir": "dramatic film noir headshot",
  "Steampunk": "steampunk bust with props",
  "Sci-Fi": "futuristic tech bust",
  "Pastel": "soft pastel close-up",
  "Dark Art": "haunting dark art close-up"
};


const API_VERSION = "1.0.0";

function getLightingOverride(style) {
  const map = {
    "Photorealistic": "natural window",
    "Anime": "soft",
    "Oil Painting": "rim light",
    "Sketch": "soft",
    "Cyberpunk": "cinematic",
    "Fantasy": "backlit",
    "Gothic": "rim light",
    "Watercolor": "soft",
    "Cartoon": "studio",
    "Pixel Art": "studio",
    "3D Render": "cinematic",
    "Film Noir": "rim light",
    "Steampunk": "cinematic",
    "Sci-Fi": "cinematic",
    "Pastel": "soft",
    "Dark Art": "backlit"
  };
  return map[style] || null;
}

const ethnicityList = ["White", "Black", "East Asian", "South Asian", "Southeast Asian", "Middle Eastern", "Latino/Hispanic", "Native American", "Mixed Race", "Pacific Islander", "African", "Mediterranean", "Central Asian", "Indigenous Australian", "European", "Arctic Indigenous"];
const backgroundList = ["Studio Backdrop", "Forest", "Beach", "Urban Street", "Desert", "Mountains", "Cyberpunk City", "Fantasy Realm", "Classroom", "Bedroom"];
const tattooList = ["None", "Small", "Sleeve", "Back Tattoo", "Face Tattoo", "Leg Tattoo", "Neck Tattoo", "Hand Tattoo"];
const accessoryList = ["None", "Glasses", "Sunglasses", "Earrings", "Necklace", "Hat", "Headband", "Scarf", "Piercing", "Watch", "Bracelet"];
const styleList = ["Photorealistic", "Anime", "Oil Painting", "Sketch", "Cyberpunk", "Fantasy", "Gothic", "Watercolor", "Cartoon", "Pixel Art", "3D Render", "Film Noir", "Steampunk", "Sci-Fi", "Pastel", "Dark Art"];
const styleDescriptions = {
  "Photorealistic": "photorealistic, ultra-detailed",
  "Anime": "anime style, cel-shaded",
  "Oil Painting": "oil painting, brush strokes",
  "Sketch": "pencil sketch, monochrome",
  "Cyberpunk": "cyberpunk theme, neon lights",
  "Fantasy": "fantasy setting, ethereal lighting",
  "Gothic": "gothic horror, moody atmosphere",
  "Watercolor": "soft watercolor style, blended tones",
  "Cartoon": "cartoon, bold outlines",
  "Pixel Art": "pixel art, 8-bit style",
  "3D Render": "3D render, cinematic lighting",
  "Film Noir": "film noir, dramatic shadows",
  "Steampunk": "steampunk, gears and brass",
  "Sci-Fi": "futuristic sci-fi scene",
  "Pastel": "pastel palette, soft tones",
  "Dark Art": "dark surrealism, horror theme"
};

const [gender] = requestFromUser("Portrait Creator", "Next", function () {
  return [this.segmented(0, ["Male", "Female"])];
});

let selections = requestFromUser((gender === 0 ? "Male" : "Female") + " Portrait Options", "Generate", function () {
  const shared = [
    this.switch(false, "Randomize"),
    this.switch(true, "Use Style-Based Camera Logic"),
    this.slider(1, this.slider.fractional(1), 1, 10, "Batch Count"),
    this.textField("", "Fixed Seed (Optional)", false, 1),
    this.menu(0, ethnicityList, "Ethnicity"),
    this.menu(0, ["Front Facing", "3/4 Angle", "Profile Left", "Profile Right"], "Pose"),
    this.menu(0, ["Short", "Medium", "Long", "Buzz Cut", "Mohawk", "Bald", "Pixie", "Braids", "Ponytail", "Curly", "Straight", "Wavy"], "Hair Style"),
    this.menu(0, ["Black", "Brown", "Blonde", "Red", "White", "Gray", "Pink", "Blue", "Purple", "Green"], "Hair Color"),
    this.menu(0, ["Blue", "Green", "Brown", "Hazel", "Gray", "Amber"], "Eye Color"),
    this.menu(0, ["Smiling", "Serious", "Angry", "Sad", "Surprised", "Neutral"], "Expression"),
    this.menu(0, ["Calm", "Mysterious", "Joyful", "Intense", "Focused", "Gentle", "Elegant", "Happy", "Mystical", "Confident", "Dreamy", "Shy"], "Mood"),
    this.menu(0, ["Soft", "Studio", "Cinematic", "Backlit", "Natural Window", "Rim Light"], "Lighting"),
    this.menu(0, ["Teen", "Young Adult (20s)", "Adult (30s-40s)", "Mature (50s-60s)"], "Age Range"),
    this.menu(0, backgroundList, "Background"),
    this.menu(0, styleList, "Style Filter"),
    this.menu(0, ["Close-up portrait", "Medium shot", "Full-body shot", "Head and shoulders", "Bust view", "3/4 length", "Over-the-shoulder", "Low angle shot", "High angle shot", "Dynamic action pose"], "Camera Composition Override (Optional)"),
  ];

  const body = gender === 0
    ? [
        this.menu(0, ["Square", "Rectangle", "Oval", "Diamond", "Triangle", "Round", "Chiseled", "Strong Jaw", "Long", "Wide"], "Face Shape"),
                this.menu(0, ["Muscular", "Slim", "Athletic", "Stocky", "Lean", "Bodybuilder", "Average", "Tall", "Bulked"], "Body Shape")
      ]
    : [
        this.menu(0, ["Oval", "Heart", "Round", "Diamond", "Soft Square", "Long", "Petite", "Triangular", "Narrow", "Wide"], "Face Shape"),
        this.menu(0, ["Flat", "Small", "Medium", "Large", "Very Large"], "Breast Size"),
        this.menu(0, ["Hourglass", "Pear", "Slim", "Athletic", "Petite", "Plus Size", "Curvy", "Tall", "Thick"], "Body Shape"),
        this.menu(0, ["Natural", "Light Glam", "Bold", "Smokey Eyes", "Glossy Lips", "Heavy Blush", "Artistic"], "Makeup Style")
      ];

  const clothing = [
    this.menu(0,
      gender === 0
        ? ["Suit", "T-Shirt & Jeans", "Hoodie", "Jacket", "Dress Shirt", "Tank Top", "Robes", "Uniform", "Casual", "Swimwear"]
        : ["Dress", "Skirt & Top", "Blouse", "Crop Top", "Gown", "Jumpsuit", "Casual", "Jacket", "Bikini", "Lingerie"],
      "Clothing Type"
    ),
    this.menu(0,
      gender === 0
        ? ["Formal", "Business", "Casual", "Sporty", "Rugged", "Streetwear", "Vintage", "Hip Hop", "Military", "Gothic"]
        : ["Elegant", "Fashionable", "Casual", "Sporty", "Chic", "Vintage", "Business", "Bohemian", "Streetwear", "Gothic"],
      "Outfit Style"
    ),
    this.menu(0, accessoryList, "Accessories"),
    this.menu(0, tattooList, "Tattoos")
  ];

  return shared.concat(body).concat(clothing);
});

let promptList = [];


const [random, count, seedBase, ...traits] = selections;
if (random) {
  if (gender === 0) {
    // Male traits - indexes align with menu definitions
    traits[0] = Math.floor(Math.random() * ethnicityList.length); // Ethnicity
    traits[1] = Math.floor(Math.random() * 4); // Pose
    traits[2] = Math.floor(Math.random() * 13); // Hair Style
    traits[3] = Math.floor(Math.random() * 11); // Hair Color
    traits[4] = Math.floor(Math.random() * 6); // Eye Color
    traits[5] = Math.floor(Math.random() * 6); // Expression
    traits[6] = Math.floor(Math.random() * 13); // Mood
    traits[7] = Math.floor(Math.random() * 6); // Lighting
    traits[8] = Math.floor(Math.random() * 4); // Age
    traits[9] = Math.floor(Math.random() * backgroundList.length); // Background
    traits[10] = Math.floor(Math.random() * 16); // Style

    traits[11] = Math.floor(Math.random() * 10); // Face
    traits[12] = Math.floor(Math.random() * 6); // Facial Hair
    traits[13] = Math.floor(Math.random() * 9); // Body Shape

    traits[14] = Math.floor(Math.random() * 10); // Clothing Type Male
    traits[15] = Math.floor(Math.random() * 10); // Outfit Style Male
    traits[16] = Math.floor(Math.random() * accessoryList.length); // Accessories
    traits[17] = Math.floor(Math.random() * tattooList.length); // Tattoos

  } else {
    // Female traits
    traits[0] = Math.floor(Math.random() * ethnicityList.length); // Ethnicity
    traits[1] = Math.floor(Math.random() * 4); // Pose
    traits[2] = Math.floor(Math.random() * 13); // Hair Style
    traits[3] = Math.floor(Math.random() * 11); // Hair Color
    traits[4] = Math.floor(Math.random() * 6); // Eye Color
    traits[5] = Math.floor(Math.random() * 6); // Expression
    traits[6] = Math.floor(Math.random() * 13); // Mood
    traits[7] = Math.floor(Math.random() * 6); // Lighting
    traits[8] = Math.floor(Math.random() * 4); // Age
    traits[9] = Math.floor(Math.random() * backgroundList.length); // Background
    traits[10] = Math.floor(Math.random() * 16); // Style

    traits[11] = Math.floor(Math.random() * 10); // Face
    traits[12] = Math.floor(Math.random() * 5); // Breast Size
    traits[13] = Math.floor(Math.random() * 9); // Body Shape
    traits[14] = Math.floor(Math.random() * 7); // Makeup

    traits[15] = Math.floor(Math.random() * 10); // Clothing Type Female
    traits[16] = Math.floor(Math.random() * 10); // Outfit Style Female
    traits[17] = Math.floor(Math.random() * accessoryList.length); // Accessories
    traits[18] = Math.floor(Math.random() * tattooList.length); // Tattoos
  }
}

if (random) {
  if (gender === 0) {
    traits.length = 18; // truncate any extra female-only values
  } else {
    traits.length = 19; // keep female-specific structure
  }
}

  let background = traits[9];
  const rawBackground = backgroundList[background];
for (let i = 0; i < count; i++) {
// moved rawBackground below after background = traits[9]
  let scenePhrase = "standing in front of";
  if (["Studio Backdrop", "Cyberpunk City", "Classroom", "Bedroom", "Ancient Cathedral Interior"].includes(rawBackground)) {
    const indoorOptions = ["inside", "within", "set inside", "framed by", "surrounded by"];
    scenePhrase = indoorOptions[Math.floor(Math.random() * indoorOptions.length)];
  } else if (["Forest", "Beach", "Desert", "Mountains", "Fantasy Realm"].includes(rawBackground)) {
    const outdoorOptions = ["standing in front of", "surrounded by", "posed beside", "within", "set in"];
    scenePhrase = outdoorOptions[Math.floor(Math.random() * outdoorOptions.length)];
  } else {
    const generalOptions = ["near", "next to", "in view of", "overlooking", "situated in"];
    scenePhrase = generalOptions[Math.floor(Math.random() * generalOptions.length)];
  }

  const seed = seedBase !== "" ? parseInt(seedBase) + i : Math.floor(Math.random() * 999999999);
  pipeline.seed = seed;

  let style = traits[10];
  
  
  // moved below
  let overrideLighting = getLightingOverride(style);
  if (overrideLighting) traits[10] = overrideLighting;

  let prompt = "portrait of a " + (gender === 0 ? "male" : "female") + ", " + scenePhrase + " " + rawBackground + ", ";
  let cameraDesc = cameraMap[style];
  if (cameraDesc) prompt += cameraDesc + ", ";
  
const face = ["Oval", "Heart", "Round", "Diamond", "Soft Square", "Long", "Petite", "Triangular", "Narrow", "Wide"][traits[11]];
  const breasts = ["Flat", "Small", "Medium", "Large", "Very Large"][traits[12]];
  const bodyShape = ["Hourglass", "Pear", "Slim", "Athletic", "Petite", "Plus Size", "Curvy", "Tall", "Thick"][traits[13]];
  const makeup = ["Natural", "Light Glam", "Bold", "Smokey Eyes", "Glossy Lips", "Heavy Blush", "Artistic"][traits[14]];

  const clothing = ["flowing dress", "skirt and top", "blouse", "crop top", "evening gown", "jumpsuit", "casual outfit", "fitted jacket", "bikini", "lace lingerie"][traits[15]];
  const outfitStyle = ["elegant", "high-fashion", "laid-back", "athletic", "chic", "vintage-inspired", "professional", "bohemian", "urban streetwear", "dark gothic"][traits[16]];
  const accessories = ["none", "gold earrings", "silver bracelet", "pearl necklace", "stylish sunglasses", "ribbon headband", "charm anklet", "elegant scarf", "leather choker", "diamond ring"][traits[17]];
  const tattoos = tattooList[traits[18]];

  const ethnicity = ethnicityList[traits[0]];
  const pose = ["gently facing forward", "soft three-quarter angle", "graceful left profile", "elegant right profile"][traits[1]];
  const hairStyle = ["Short", "Medium", "Long", "Buzz Cut", "Mohawk", "Bald", "Pixie", "Braids", "Ponytail", "Curly", "Straight", "Wavy"][traits[2]];
  const hairColor = ["Black", "Brown", "Blonde", "Red", "White", "Gray", "Pink", "Blue", "Purple", "Green"][traits[3]];
  const eyeColor = ["Blue", "Green", "Brown", "Hazel", "Gray", "Amber"][traits[4]];
  const expression = ["gentle smile", "serene gaze", "intense stare", "melancholy look", "graceful surprise", "calm expression"][traits[5]];
  const mood = ["calm serenity", "mysterious allure", "joyful radiance", "intense emotion", "graceful focus", "gentle presence", "elegant demeanor", "bright happiness", "mystical charm", "quiet confidence", "dreamlike tone", "delicate shyness"][traits[6]];
  const lighting = ["soft diffused light", "controlled studio glow", "cinematic ambiance", "backlit radiance", "natural window lighting", "rim-lit silhouette"][traits[7]];
  const age = ["Teen", "Young Adult (20s)", "Adult (30s-40s)", "Mature (50s-60s)"][traits[8]];
  const cameraComposition = ["Close-up portrait", "Medium shot", "Full-body shot", "Head and shoulders", "Bust view", "3/4 length", "Over-the-shoulder", "Low angle shot", "High angle shot", "Dynamic action pose"][traits[10]];

  prompt += cameraComposition + ", " + pose + ", " + scenePhrase + " " + rawBackground + ", " +
            "wearing a " + clothing + " in " + outfitStyle + " style" +
            (accessories !== "None" ? ", accessorized with " + (accessories ? accessories.toLowerCase() : "") : "") +
            (tattoos && tattoos !== "None" ? ", showing " + tattoos.toLowerCase() + " tattoo" : "") +
            ", " + hairColor + " " + (hairStyle ? hairStyle.toLowerCase() : "") + ", " +
            eyeColor.toLowerCase() + " eyes, " + (expression ? expression.toLowerCase() : "") + " expression, " +
            (mood ? mood.toLowerCase() : "") + " mood, " + (lighting ? (lighting ? lighting.toLowerCase() : "") : "") + " lighting, " +
            age + ", " + face + " face, " + (gender === 0 ? bodyShape + " build" : breasts + " chest, " + bodyShape + " build, " + (makeup ? makeup.toLowerCase() : "") + " makeup");

  if (style && styleDescriptions[style]) prompt += ", " + styleDescriptions[style];

  // Show preview before saving
  
  promptList.push({
    seed: seed,
    prompt: prompt
  });

}


// Generate and save portraits, export prompts to a text file
let promptText = "";
for (let j = 0; j < promptList.length; j++) {
  const entry = promptList[j];promptText += "Seed " + entry.seed + ": " + entry.prompt + "\n";
}

// Save prompts to a file
console.log("Generated Prompts:\n" + promptText);
