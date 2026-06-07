import type { CharacterUnit } from "@sdg/shared";
import type { CardTemplate } from "./cardTemplate";
import { dpsTemplates } from "./dpsTemplates";
import { specialistTemplates } from "./specialistTemplates";
import { supportTemplates } from "./supportTemplates";
import { tankTemplates } from "./tankTemplates";

export const roleTemplates: Record<CharacterUnit["role"], CardTemplate[]> = {
  DPS: dpsTemplates,
  Support: supportTemplates,
  Tank: tankTemplates,
  Specialist: specialistTemplates
};
