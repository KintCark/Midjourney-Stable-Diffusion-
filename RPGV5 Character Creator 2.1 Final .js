// api: 1.0

function pickRandom(options) {
  return Math.floor(Math.random() * options.length);
}

function safePick(array, index) {
  return array[Math.max(0, Math.min(index || 0, array.length - 1))];
}

const genderOptions = [
  { label: "Male", text: "a male character" },
  { label: "Female", text: "a female character" }
];
const raceOptions = [
  { label: "Human", text: "of human race" },
  { label: "Elf", text: "an elven warrior" },
  { label: "Orc", text: "a fierce orc" },
  { label: "Demon", text: "a demonic being" },
  { label: "Undead", text: "an undead creature" },
  { label: "Angel", text: "a celestial angel" },
  { label: "Warframe", text: "a biomechanical Warframe" }
];
const roleOptions = [
  { label: "Warrior", text: "in combat stance" },
  { label: "Mage", text: "casting spells" },
  { label: "Rogue", text: "in stealth movement" },
  { label: "Assassin", text: "with lethal intent" },
  { label: "Paladin", text: "radiating holy light" },
  { label: "Druid", text: "surrounded by nature" },
  { label: "Pirate", text: "aboard a ship" },
  { label: "Excalibur", text: "with exalted blade" },
  { label: "Mag", text: "manipulating magnetic fields" },
  { label: "Volt", text: "charged with electricity" },
  { label: "Rhino", text: "in heavy rhino armor" },
  { label: "Wisp", text: "emitting motes of light" },
  { label: "Sevagoth", text: "shrouded in shadow" },
  { label: "Xaku", text: "assembled from void parts" },
  { label: "Styanax", text: "brandishing spear and shield" },
  { label: "Dagath", text: "surrounded by spectral spirits" },
  { label: "Yareli", text: "gliding across water" }
];
const armorOptions = [
  { label: "Heavy Armor", text: "wearing plated heavy armor" },
  { label: "Light Armor", text: "wearing light armor" },
  { label: "Leather Armor", text: "dressed in rugged leather" },
  { label: "Bone Armor", text: "encased in bone armor" },
  { label: "Warframe Exosuit", text: "equipped with a Warframe exosuit" },
  { label: "Infested Flesh", text: "mutated with infested tissue" },
  { label: "Orokin Plating", text: "coated in ornate Orokin plating" }
];
const weaponOptions = [
  { label: "None", text: "" },
  { label: "Energy Sword", text: "wielding an energy sword" },
  { label: "Dual Daggers", text: "armed with dual daggers" },
  { label: "Longbow", text: "carrying a longbow" },
  { label: "Heavy Rifle", text: "equipped with a heavy rifle" },
  { label: "Scythe", text: "holding a spectral scythe" },
  { label: "Staff", text: "channeling power through a staff" }
];
const factionOptions = [
  { label: "None", text: "" },
  { label: "Tenno", text: "aligned with the Tenno" },
  { label: "Corpus", text: "serving the Corpus" },
  { label: "Grineer", text: "from the Grineer Empire" },
  { label: "Orokin", text: "descended from the Orokin" },
  { label: "Infested", text: "tainted by the Infestation" },
  { label: "Sentient", text: "reborn as a Sentient construct" }
];
const featureOptions = ["None", "Long dark hair", "Short white hair", "Hooded", "Face mask", "Cybernetic faceplate", "Glowing energy core"];
const environmentOptions = ["None", "Void temple", "Cyberpunk city", "Infested hive", "Ancient battlefield", "Frozen ruins", "Orokin tower"];
const emotionOptions = ["None", "Angry", "Calm", "Heroic", "Sinister", "Peaceful", "Focused", "Ghostly"];
const cameraOptions = ["None", "Close-up", "Medium Shot", "Full Body", "Over-the-shoulder", "Low angle", "Tilted", "Dramatic zoom"];
const lightingOptions = ["None", "Volumetric light", "Bloom HDR", "Backlit silhouette", "Rim lighting", "Energy glow"];
const colorOptions = ["None", "Neon palette", "Monochrome", "Gold and blue", "Desaturated", "Colorful haze"];
const artistOptions = [
  { label: "None", text: "" },
  { label: "Greg Rutkowski", text: "by Greg Rutkowski" },
  { label: "Artgerm", text: "by Artgerm" },
  { label: "Jeremy Mann", text: "by Jeremy Mann" },
  { label: "Alphonse Mucha", text: "by Alphonse Mucha" },
  { label: "Ilya Kuvshinov", text: "by Ilya Kuvshinov" },
  { label: "WLOP", text: "by WLOP" }
];
const photorealOptions = [
  { label: "None", text: "" },
  { label: "Cinematic Realism", text: "cinematic lighting, photorealistic render" },
  { label: "Studio Photography", text: "studio lighting, shallow depth of field" },
  { label: "Analog Film Look", text: "35mm film grain, analog realism" },
  { label: "Ultra Sharp", text: "ultra detailed, sharp image, hyperrealism" }
];
const threeDOptions = [
  { label: "None", text: "" },
  { label: "ZBrush", text: "3D sculpted in ZBrush" },
  { label: "Blender Render", text: "rendered in Blender" },
  { label: "Octane Render", text: "Octane render, ray tracing" },
  { label: "Unreal Engine", text: "Unreal Engine lighting and detail" }
];

const config = requestFromUser("Final RPGV5 Prompt Builder", "Save Prompt", function () {
  return [
    this.segmented(0, ["Manual", "Random"]),
    this.menu(0, genderOptions.map(x => x.label)),
    this.menu(0, raceOptions.map(x => x.label)),
    this.menu(0, roleOptions.map(x => x.label)),
    this.menu(0, armorOptions.map(x => x.label)),
    this.menu(0, weaponOptions.map(x => x.label)),
    this.menu(0, factionOptions.map(x => x.label)),
    this.menu(0, featureOptions),
    this.menu(0, environmentOptions),
    this.menu(0, emotionOptions),
    this.menu(0, cameraOptions),
    this.menu(0, lightingOptions),
    this.menu(0, colorOptions),
    this.menu(0, artistOptions.map(x => x.label)),
    this.menu(0, photorealOptions.map(x => x.label)),
    this.menu(0, threeDOptions.map(x => x.label))
  ];
});

const isRandom = config[0] === 1;

const gender = safePick(genderOptions, isRandom ? pickRandom(genderOptions) : config[1]);
const race = safePick(raceOptions, isRandom ? pickRandom(raceOptions) : config[2]);
const role = safePick(roleOptions, isRandom ? pickRandom(roleOptions) : config[3]);
const armor = safePick(armorOptions, isRandom ? pickRandom(armorOptions) : config[4]);
const weapon = safePick(weaponOptions, isRandom ? pickRandom(weaponOptions) : config[5]);
const faction = safePick(factionOptions, isRandom ? pickRandom(factionOptions) : config[6]);
const feature = safePick(featureOptions, isRandom ? pickRandom(featureOptions) : config[7]);
const environment = safePick(environmentOptions, isRandom ? pickRandom(environmentOptions) : config[8]);
const emotion = safePick(emotionOptions, isRandom ? pickRandom(emotionOptions) : config[9]);
const camera = safePick(cameraOptions, isRandom ? pickRandom(cameraOptions) : config[10]);
const lighting = safePick(lightingOptions, isRandom ? pickRandom(lightingOptions) : config[11]);
const color = safePick(colorOptions, isRandom ? pickRandom(colorOptions) : config[12]);
const artist = safePick(artistOptions, isRandom ? pickRandom(artistOptions) : config[13]);
const photo = safePick(photorealOptions, isRandom ? pickRandom(photorealOptions) : config[14]);
const threeD = safePick(threeDOptions, isRandom ? pickRandom(threeDOptions) : config[15]);

let prompt = `${camera}, ${gender.text}, ${race.text}, ${role.text}, ${armor.text}`;
if (weapon.text) prompt += `, ${weapon.text}`;
if (faction.text) prompt += `, ${faction.text}`;
if (feature !== "None") prompt += `, ${feature}`;
if (environment !== "None") prompt += `, ${environment}`;
if (emotion !== "None") prompt += `, ${emotion}`;
if (lighting !== "None") prompt += `, ${lighting}`;
if (color !== "None") prompt += `, ${color}`;
if (artist.text) prompt += `, ${artist.text}`;
if (photo.text) prompt += `, ${photo.text}`;
if (threeD.text) prompt += `, ${threeD.text}`;
prompt += ", (high detail), (photorealistic), (best quality)";

// Output
console.log("Prompt:");
console.log(prompt);

requestFromUser("Prompt Saved", "Done", function () {
  return [
    this.textField(prompt, "Final Prompt Saved to Log", true, 120)
  ];
});



// repeat generating batchCount (72) times or until one cancels
// use any whole number larger that 0 :) as a value 

const skipUI = true; // if false - show UI for params
const batchCount = 15; // this many pics will generate

// setting things up
let configuration = pipeline.configuration;
let mSeed = configuration.seed;

if (!skipUI) {
  // UI could go here if needed
}

// process below
let itStartTime = new Date();
let GlobalStartTime = new Date();
let itEndTime = new Date();
console.log("time: " + itStartTime);

for (let i = 0; i < batchCount; i++) {
  configuration.seed = mSeed;
  pipeline.run({ configuration: pipeline.configuration , prompt:prompt});

  itEndTime = new Date();
  console.log("∆time: " + ((itEndTime - itStartTime) / 1000));
  itStartTime = itEndTime;
}

console.repl();
