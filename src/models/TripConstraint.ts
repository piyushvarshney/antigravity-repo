export enum ConstraintType {
  HARD = "HARD",
  SOFT = "SOFT"
}

export enum ConstraintCategory {
  DIETARY = "DIETARY",
  LOGISTICAL = "LOGISTICAL",
  SCHEDULING = "SCHEDULING",
  LOYALTY = "LOYALTY",
  GROUP_DYNAMICS = "GROUP_DYNAMICS"
}

export enum EntityEnum {
  NODE = "NODE",
  PATH = "PATH",
  GLOBAL = "GLOBAL"
}

/**
 * Defines the rules the solver must evaluate.
 */
export interface TripConstraint {
  id: string;
  type: ConstraintType;
  category: ConstraintCategory;
  weight?: number; // Used only if type is SOFT.
  targetEntity: EntityEnum;
  ruleDefinition: Record<string, any>;
  
  // Example ruleDefinitions:
  // Dietary: { mustHave: ["STRICT_VEGETARIAN"] }
  // Logistical: { provider: "IndiGo", requiresValidation: "Cabin Guitar" }
  // Scheduling: { blockedTime: { start: "06:00", end: "07:30" } }
  // Loyalty: { preferredBrand: "Marriott Bonvoy", bonusScore: 500 }
  // Group: { syncNodes: ["LODGING"], minCapacity: 8 }
}
