export enum NodeType {
  TRANSIT = "TRANSIT",
  LODGING = "LODGING",
  DINING = "DINING",
  ACTIVITY = "ACTIVITY"
}

export interface GeoLocation {
  lat: number;
  lng: number;
}

/**
 * Represents a discrete event or state in the trip.
 */
export interface ItineraryNode {
  id: string;
  nodeType: NodeType;
  startTime: Date;
  endTime: Date;
  provider: string; // e.g., "IndiGo", "Marriott"
  capacityAvailable: number; // Critical for group dynamics
  cost: number;
  geoLocation: GeoLocation; // Added for transit time calculations
  attributes: string[]; // e.g., ["STRICT_VEGETARIAN", "Cabin Guitar Allowed"]
  metadata: Record<string, any>;
}
