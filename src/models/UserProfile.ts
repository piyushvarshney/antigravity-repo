export enum DietaryEnum {
  STRICT_VEGETARIAN = "STRICT_VEGETARIAN",
  VEGAN = "VEGAN",
  HALAL = "HALAL",
  NONE = "NONE"
}

export enum LoyaltyTier {
  BASIC = "BASIC",
  SILVER = "SILVER",
  GOLD = "GOLD",
  PLATINUM = "PLATINUM",
  TITANIUM = "TITANIUM"
}

export interface Equipment {
  type: string;
  requiresCabin: boolean;
}

export interface TimeBlock {
  start: string; // HH:mm format
  end: string;   // HH:mm format
  reason: string;
}

/**
 * Defines the individual or core entity traveling.
 */
export interface UserProfile {
  id: string;
  groupId: string | null;
  timezone: string; // Ensure schedule blocks respect destination local time
  dietaryRequirements: DietaryEnum[];
  loyaltyPrograms: Record<string, LoyaltyTier>;
  specialEquipment: Equipment[];
  dailyScheduleBlocks: TimeBlock[];
}
