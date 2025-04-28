// api: 1.0

const config = requestFromUser("Photorealism Builder", "Generate Prompt", function() {
  return [
    this.section("Style", "Choose the style of the photo", [
      this.menu(0, [
        "abstract", "analogue", "beauty", "candid", "documentary photography",
        "glamour photography", "high fashion photography", "instant photo",
        "large format", "lifestyle photography", "modernist", "paparazzi",
        "pictorialist style", "polaroid", "pinhole photography",
        "street fashion photography", "surrealist", "tintype"
      ])
    ]),
    this.section("Subject Details", "Describe your subject", [
      this.textField("", "Enter the subject (e.g., young woman, elderly man)", false, 94),
      this.textField("", "Important feature (e.g., sparkling eyes, freckles)", false, 94),
      this.textField("", "More details (e.g., wearing a sundress, backpack)", false, 94)
    ]),
    this.section("Pose & Framing", "Action, pose, and framing of the subject", [
      this.menu(0, [
        "standing with hands on hips", "leaning against a wall", "laughing",
        "dancing", "playing guitar", "jumping in the air", "taking a bow",
        "looking over shoulder", "running", "sitting cross-legged"
      ]),
      this.menu(0, [
        "close up on face", "full body", "head shot", "upper body"
      ])
    ]),
    this.section("Setting", "Describe the environment", [
      this.textField("", "Describe background/setting (e.g., misty forest, beach at sunset)", false, 94)
    ]),
    this.section("Lighting", "Choose a lighting style", [
      this.menu(0, [
        "bounced lighting", "candlelight", "chiaroscuro", "cinematic lighting",
        "soft diffused lighting", "edge lighting", "fill lighting",
        "flash photography", "god rays", "golden hour", "hard light",
        "high key lighting", "low key lighting", "natural lighting",
        "neon lighting", "overcast lighting", "rim lighting", "shadow play",
        "silhouette lighting", "soft lighting"
      ])
    ]),
    this.section("Camera Angle", "Choose camera angle", [
      this.menu(0, [
        "eye level", "dutch angle", "from above/high angle", "from below/low angle"
      ])
    ]),
    this.section("Camera & Film", "Camera, film, and lens selections", [
      this.menu(0, [
        "Aaton LTR", "ARRI ALEXA 65", "Bolex H16", "RED Digital Cinema Camera",
        "Canon EOS 5D", "Fujifilm X-T4", "GoPro Hero", "Hasselblad X1D II",
        "Lumix GH5", "Pentax 645Z", "Sony A7III", "Leica T", "Diana F+",
        "Hasselblad 500CM", "HOLGA 120n", "Kodak Brownie", "Kodak Funsaver",
        "Leica M3", "Rolleiflex", "Polaroid SX-70"
      ]),
      this.menu(0, [
        "Agfa Vista", "Cinestill 800T", "Ektar 100", "Ilford HP5 Plus", "Kodak Vision3",
        "Kodak Vision3 IMAX", "Lomochrome color film", "Porta 160", "Tri-X 400",
        "Velvia 100", "Fujicolor Pro"
      ]),
      this.menu(0, [
        "8mm Fisheye Lens", "Voigtländer Nokton 50mm f1.1", "50mm prime lens"
      ])
    ]),
    this.section("Effects & Filters", "Optional filters to apply", [
      this.menu(0, [
        "black and white", "color filter", "bokeh", "desaturated grunge filter",
        "dreamy haze", "glitch style", "hologram effect", "infrared filter",
        "lens flare", "sepia tone", "soft focus", "solarized",
        "long exposure", "ND filter", "overexposed", "technicolor",
        "underexposed", "vignette"
      ])
    ]),
    this.section("Photographer", "Choose a photographer style", [
      this.menu(0, [
        "Alfred Stieglitz", "Wes Anderson", "Richard Avedon", "Nathan Wirth",
        "Liam Wong", "Paolo Roversi", "James Bidgood", "David LaChapelle",
        "Walker Evans", "Germaine Krull", "Anne Brigman", "Tim Walker",
        "Eugene Atget", "Yousuf Karsh", "Mickalene Thomas", "Chris Friel",
        "Miko Lagerstedt", "George Hurrell", "Nick Knight", "Hayao Miyazaki",
        "Brandon Woelfel", "Oskar Fischinger", "Misha Gordin", "Kim Keever",
        "Lotte Reiniger", "Oleg Oprisco", "Ando Fuchs", "August Sander",
        "Miles Aldridge", "Nan Goldin", "Tyler Shields", "Paul Barson"
      ])
    ])
  ];
});

// Get selections
const [
  styleIndex, subjectText, importantFeatureText, moreDetailsText, poseIndex, framingIndex, settingText,
  lightingIndex, cameraAngleIndex, cameraIndex, filmIndex, lensIndex, filterIndex, photographerIndex
] = config;

function getMenuValue(menu, index) {
  return menu[index] || "";
}

// Parts
const parts = [];

const style = getMenuValue([
  "abstract", "analogue", "beauty", "candid", "documentary photography",
  "glamour photography", "high fashion photography", "instant photo",
  "large format", "lifestyle photography", "modernist", "paparazzi",
  "pictorialist style", "polaroid", "pinhole photography",
  "street fashion photography", "surrealist", "tintype"
], styleIndex);

const pose = getMenuValue([
  "standing with hands on hips", "leaning against a wall", "laughing",
  "dancing", "playing guitar", "jumping in the air", "taking a bow",
  "looking over shoulder", "running", "sitting cross-legged"
], poseIndex);

const framing = getMenuValue([
  "close up on face", "full body", "head shot", "upper body"
], framingIndex);

const lighting = getMenuValue([
  "bounced lighting", "candlelight", "chiaroscuro", "cinematic lighting",
  "soft diffused lighting", "edge lighting", "fill lighting",
  "flash photography", "god rays", "golden hour", "hard light",
  "high key lighting", "low key lighting", "natural lighting",
  "neon lighting", "overcast lighting", "rim lighting", "shadow play",
  "silhouette lighting", "soft lighting"
], lightingIndex);

const cameraAngle = getMenuValue([
  "eye level", "dutch angle", "from above/high angle", "from below/low angle"
], cameraAngleIndex);

const camera = getMenuValue([
  "Aaton LTR", "ARRI ALEXA 65", "Bolex H16", "RED Digital Cinema Camera",
  "Canon EOS 5D", "Fujifilm X-T4", "GoPro Hero", "Hasselblad X1D II",
  "Lumix GH5", "Pentax 645Z", "Sony A7III", "Leica T", "Diana F+",
  "Hasselblad 500CM", "HOLGA 120n", "Kodak Brownie", "Kodak Funsaver",
  "Leica M3", "Rolleiflex", "Polaroid SX-70"
], cameraIndex);

const film = getMenuValue([
  "Agfa Vista", "Cinestill 800T", "Ektar 100", "Ilford HP5 Plus", "Kodak Vision3",
  "Kodak Vision3 IMAX", "Lomochrome color film", "Porta 160", "Tri-X 400",
  "Velvia 100", "Fujicolor Pro"
], filmIndex);

const lens = getMenuValue([
  "8mm Fisheye Lens", "Voigtländer Nokton 50mm f1.1", "50mm prime lens"
], lensIndex);

const filter = getMenuValue([
  "black and white", "color filter", "bokeh", "desaturated grunge filter",
  "dreamy haze", "glitch style", "hologram effect", "infrared filter",
  "lens flare", "sepia tone", "soft focus", "solarized",
  "long exposure", "ND filter", "overexposed", "technicolor",
  "underexposed", "vignette"
], filterIndex);

const photographer = getMenuValue([
  "Alfred Stieglitz", "Wes Anderson", "Richard Avedon", "Nathan Wirth",
  "Liam Wong", "Paolo Roversi", "James Bidgood", "David LaChapelle",
  "Walker Evans", "Germaine Krull", "Anne Brigman", "Tim Walker",
  "Eugene Atget", "Yousuf Karsh", "Mickalene Thomas", "Chris Friel",
  "Miko Lagerstedt", "George Hurrell", "Nick Knight", "Hayao Miyazaki",
  "Brandon Woelfel", "Oskar Fischinger", "Misha Gordin", "Kim Keever",
  "Lotte Reiniger", "Oleg Oprisco", "Ando Fuchs", "August Sander",
  "Miles Aldridge", "Nan Goldin", "Tyler Shields", "Paul Barson"
], photographerIndex);

// Assemble
if (style) parts.push(`${style} photo of a`);
if (subjectText) parts.push(subjectText);
if (importantFeatureText) parts.push(importantFeatureText);
if (moreDetailsText) parts.push(moreDetailsText);
if (settingText) parts.push(settingText);
if (pose) parts.push(pose);
if (framing) parts.push(framing);
if (lighting) parts.push(lighting);
if (cameraAngle) parts.push(cameraAngle);

const cameraParts = [];
if (camera) cameraParts.push(`shot on ${camera}`);
if (film) cameraParts.push(`using ${film}`);
if (lens) cameraParts.push(`with ${lens}`);
if (filter) cameraParts.push(`with ${filter}`);
if (cameraParts.length > 0) parts.push(cameraParts.join(", "));

if (photographer) parts.push(`in style of ${photographer}`);

const finalPrompt = parts.join(", ");
console.log(finalPrompt);
