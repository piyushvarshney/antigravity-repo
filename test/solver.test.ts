import { describe, it, expect } from "vitest";
import { ConstraintSolver } from "../src/solver/ConstraintSolver";
import {
  UserProfile,
  TripConstraint,
  ConstraintType,
  ConstraintCategory,
  EntityEnum,
  NodeType,
  DietaryEnum
} from "../src/models";

describe("ConstraintSolver High-Performance Test Suite", () => {
  const mockUsers: UserProfile[] = new Array(8).fill(null).map((_, i) => ({
    id: `user-${i}`,
    groupId: i < 4 ? "core-family" : "secondary-group",
    timezone: "Asia/Kolkata",
    dietaryRequirements: [DietaryEnum.STRICT_VEGETARIAN],
    loyaltyPrograms: { "Marriott Bonvoy": "GOLD" as any },
    specialEquipment: i === 0 ? [{ type: "Acoustic Guitar", requiresCabin: true }] : [],
    dailyScheduleBlocks: [{ start: "06:00", end: "07:30", reason: "5k run" }]
  }));

  const constraints: TripConstraint[] = [
    {
      id: "c1",
      type: ConstraintType.HARD,
      category: ConstraintCategory.DIETARY,
      targetEntity: EntityEnum.NODE,
      ruleDefinition: { mustHave: ["STRICT_VEGETARIAN"] }
    },
    {
      id: "c2",
      type: ConstraintType.HARD,
      category: ConstraintCategory.LOGISTICAL,
      targetEntity: EntityEnum.NODE,
      ruleDefinition: { provider: "IndiGo", requiresValidation: "Cabin Guitar" }
    },
    {
      id: "c3",
      type: ConstraintType.HARD,
      category: ConstraintCategory.SCHEDULING,
      targetEntity: EntityEnum.NODE,
      ruleDefinition: { blockedTime: { start: "06:00", end: "07:30" } }
    },
    {
      id: "c4",
      type: ConstraintType.SOFT,
      category: ConstraintCategory.LOYALTY,
      weight: 100,
      targetEntity: EntityEnum.NODE,
      ruleDefinition: { preferredBrand: "Marriott Bonvoy", bonusScore: 500 }
    },
    {
      id: "c5",
      type: ConstraintType.HARD,
      category: ConstraintCategory.GROUP_DYNAMICS,
      targetEntity: EntityEnum.NODE,
      ruleDefinition: { syncNodes: [NodeType.LODGING], minCapacity: 8 }
    }
  ];

  it("should invalidate paths with dining nodes lacking strict vegetarian options", () => {
    const invalidPath = [
      {
        id: "d1",
        nodeType: NodeType.DINING,
        startTime: new Date("2026-06-01T19:00:00Z"),
        endTime: new Date("2026-06-01T20:00:00Z"),
        provider: "Steakhouse",
        capacityAvailable: 10,
        cost: 100,
        geoLocation: { lat: 12.9716, lng: 77.5946 },
        attributes: ["MEAT_ONLY"], // Missing STRICT_VEGETARIAN
        metadata: {}
      }
    ];

    const results = ConstraintSolver.solve([invalidPath], constraints, mockUsers);
    expect(results.length).toBe(0);
  });

  it("should invalidate paths with IndiGo flights lacking acoustic guitar cabin allowance", () => {
    const invalidPath = [
      {
        id: "f1",
        nodeType: NodeType.TRANSIT,
        startTime: new Date("2026-06-01T10:00:00Z"),
        endTime: new Date("2026-06-01T12:00:00Z"),
        provider: "IndiGo",
        capacityAvailable: 50,
        cost: 200,
        geoLocation: { lat: 12.9716, lng: 77.5946 },
        attributes: [], // Missing 'Cabin Guitar'
        metadata: {}
      }
    ];

    const results = ConstraintSolver.solve([invalidPath], constraints, mockUsers);
    expect(results.length).toBe(0);
  });

  it("should invalidate paths overlapping with the 06:00-07:30 run block", () => {
    const invalidPath = [
      {
        id: "a1",
        nodeType: NodeType.ACTIVITY,
        startTime: new Date("2026-06-01T06:30:00+05:30"), // Overlaps in Asia/Kolkata
        endTime: new Date("2026-06-01T08:00:00+05:30"),
        provider: "City Tour",
        capacityAvailable: 20,
        cost: 50,
        geoLocation: { lat: 12.9716, lng: 77.5946 },
        attributes: [],
        metadata: {}
      }
    ];

    const results = ConstraintSolver.solve([invalidPath], constraints, mockUsers);
    expect(results.length).toBe(0);
  });

  it("should invalidate paths where lodging capacity < 8 (strict sync)", () => {
    const invalidPath = [
      {
        id: "l1",
        nodeType: NodeType.LODGING,
        startTime: new Date("2026-06-01T15:00:00Z"),
        endTime: new Date("2026-06-02T11:00:00Z"),
        provider: "Small Inn",
        capacityAvailable: 4, // Too small for 8
        cost: 100,
        geoLocation: { lat: 12.9716, lng: 77.5946 },
        attributes: [],
        metadata: {}
      }
    ];

    const results = ConstraintSolver.solve([invalidPath], constraints, mockUsers);
    expect(results.length).toBe(0);
  });

  it("should prioritize paths with Marriott Bonvoy lodging", () => {
    const path1 = [
      {
        id: "l1",
        nodeType: NodeType.LODGING,
        startTime: new Date("2026-06-01T15:00:00Z"),
        endTime: new Date("2026-06-02T11:00:00Z"),
        provider: "Generic Hotel",
        capacityAvailable: 10,
        cost: 100,
        geoLocation: { lat: 12.9716, lng: 77.5946 },
        attributes: [],
        metadata: {}
      }
    ];
    
    const path2 = [
      {
        id: "l2",
        nodeType: NodeType.LODGING,
        startTime: new Date("2026-06-01T15:00:00Z"),
        endTime: new Date("2026-06-02T11:00:00Z"),
        provider: "Marriott Bonvoy",
        capacityAvailable: 10,
        cost: 150,
        geoLocation: { lat: 12.9716, lng: 77.5946 },
        attributes: [],
        metadata: {}
      }
    ];

    const results = ConstraintSolver.solve([path1, path2], constraints, mockUsers);
    expect(results.length).toBe(2);
    expect(results[0].path[0].id).toBe("l2"); // Marriott path should score higher
    expect(results[0].score).toBe(100);
    expect(results[1].score).toBe(0);
  });
});
