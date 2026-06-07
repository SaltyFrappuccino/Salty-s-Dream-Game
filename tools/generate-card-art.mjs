import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const out = "apps/client/public/assets";
const characters = [
  ["chihiro_enten", "Чихиро", "#d73737", "#d8a74a"],
  ["sojo_kuregumo", "Соджо", "#4aa3ff", "#f4f1ea"],
  ["hakuri_storehouse", "Хакури", "#a66cff", "#d8a74a"],
  ["shiba", "Шиба", "#d8a74a", "#f4f1ea"],
  ["hinao", "Хинао", "#5ee083", "#f4f1ea"],
  ["char", "Чар", "#ffcc66", "#f4f1ea"],
  ["hiyuki_flame_bone", "Хиюки", "#ff315f", "#d8a74a"],
  ["tafuku", "Тафуку", "#7f8794", "#f4f1ea"],
  ["uruha", "Уруха", "#8f5cff", "#f4f1ea"],
  ["uruha_kumeyuri", "Уруха", "#ff315f", "#d8a74a"],
  ["samura_tobimune", "Самура", "#d8a74a", "#07070a"],
  ["hiruhiko", "Хирухико", "#a66cff", "#ff315f"]
];
const suffixes = ["quick_slash", "spirit_cut", "marked_strike", "adrenaline", "counter_stance", "ultimate_blade", "gentle_light", "ward", "seal_break", "focus_prayer", "reaction_guard", "ultimate_revival", "body_block", "taunting_blow", "anchor", "seal_slam", "last_wall", "ultimate_guard", "hex_cut", "shadow_tag", "fracture", "scheming", "bait_reaction", "ultimate_scheme"];
const common = ["quick_bandage", "combat_barrier", "evasion", "concentration", "tactical_breath", "precise_strike", "remove_seal", "remove_wound", "temporary_shield", "distracting_maneuver", "draw", "regroup", "risky_lunge", "defensive_stance", "technique_setup", "last_dash"];

function esc(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;");
}

function svg(title, a, b, kind) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 896">
  <defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient><filter id="noise"><feTurbulence baseFrequency=".85" numOctaves="3" seed="7"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="table" tableValues="0 .14"/></feComponentTransfer></filter></defs>
  <rect width="640" height="896" rx="38" fill="#07070a"/>
  <rect x="22" y="22" width="596" height="852" rx="32" fill="url(#g)" opacity=".88"/>
  <rect x="22" y="22" width="596" height="852" rx="32" fill="#07070a" opacity=".34"/>
  <path d="M76 716 C180 606 216 434 325 338 C430 246 492 156 552 76" fill="none" stroke="${b}" stroke-width="18" opacity=".72"/>
  <path d="M90 130 C210 194 398 182 540 300" fill="none" stroke="#f4f1ea" stroke-width="7" opacity=".48"/>
  <path d="M112 748 L514 144 L552 184 L160 792 Z" fill="#f4f1ea" opacity=".86"/>
  <path d="M146 796 L548 192 L574 288 L260 810 Z" fill="${a}" opacity=".82"/>
  <circle cx="500" cy="148" r="66" fill="${b}" opacity=".24"/>
  <rect width="640" height="896" filter="url(#noise)" opacity=".7"/>
  <text x="54" y="76" fill="#f4f1ea" font-family="Georgia,serif" font-size="30" font-weight="700">${esc(kind)}</text>
  <text x="54" y="838" fill="#f4f1ea" font-family="Georgia,serif" font-size="42" font-weight="700">${esc(title)}</text>
</svg>`;
}

for (const [id, title, a, b] of characters) {
  const dir = join(out, "characters", id);
  mkdirSync(dir, { recursive: true });
  const portrait = svg(title, a, b, "BLADEBOUND");
  writeFileSync(join(dir, "portrait.svg"), portrait);
  writeFileSync(join(dir, "avatar.svg"), portrait);
  writeFileSync(join(dir, "full.svg"), portrait);

  const cardDir = join(out, "cards", id);
  mkdirSync(cardDir, { recursive: true });
  for (const suffix of suffixes) {
    writeFileSync(join(cardDir, `${id}_${suffix}.svg`), svg(title, a, b, suffix.replaceAll("_", " ")));
  }
}

mkdirSync(join(out, "cards", "common"), { recursive: true });
for (const id of common) {
  writeFileSync(join(out, "cards", "common", `common_${id}.svg`), svg(id.replaceAll("_", " "), "#d73737", "#d8a74a", "COMMON"));
}
