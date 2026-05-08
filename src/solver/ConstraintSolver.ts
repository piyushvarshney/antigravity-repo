import {
  ItineraryNode,
  TripConstraint,
  UserProfile,
  ConstraintType,
  ConstraintCategory,
  NodeType,
  DietaryEnum
} from "../models";

/**
 * Result object for a evaluated path.
 */
export interface SolverResult {
  path: ItineraryNode[];
  isValid: boolean;
  score: number;
  violations: string[]; // Reasons for invalidity
}

/**
 * High-Performance Weighted Multi-Constraint Solver
 * Utilizes a DAG traversal approach (abstracted here as path evaluation) to resolve conflicts.
 */
export class ConstraintSolver {
  /**
   * Evaluates a set of possible itinerary paths against user profiles and constraints.
   *
   * @param {ItineraryNode[][]} possiblePaths - An array of potential paths (each path is an array of nodes).
   * @param {TripConstraint[]} constraints - The rules to apply.
   * @param {UserProfile[]} users - The traveling users (e.g., family of 4 + secondary group of 4).
   * @returns {SolverResult[]} The ranked list of valid paths.
   */
  static solve(
    possiblePaths: ItineraryNode[][],
    constraints: TripConstraint[],
    users: UserProfile[]
  ): SolverResult[] {
    const results: SolverResult[] = [];
    const totalGroupSize = users.length;

    for (const path of possiblePaths) {
      let isValid = true;
      let score = 0;
      const violations: string[] = [];

      // Evaluate each node in the path
      for (const node of path) {
        // 1. Group Dynamics - Capacity check (Basic)
        if (node.capacityAvailable < totalGroupSize) {
          // Check if we require strict sync for this node type
          const syncConstraint = constraints.find(
            (c) =>
              c.category === ConstraintCategory.GROUP_DYNAMICS &&
              c.ruleDefinition?.syncNodes?.includes(node.nodeType)
          );
          if (syncConstraint && syncConstraint.type === ConstraintType.HARD) {
             isValid = false;
             violations.push(`Capacity violation on strictly synchronized node: ${node.id}`);
             break;
          }
        }

        for (const constraint of constraints) {
          // HARD CONSTRAINTS
          if (constraint.type === ConstraintType.HARD) {
            // DIETARY
            if (
              constraint.category === ConstraintCategory.DIETARY &&
              node.nodeType === NodeType.DINING
            ) {
              const mustHave = constraint.ruleDefinition?.mustHave || [];
              const hasOptions = mustHave.every((req: string) => node.attributes.includes(req));
              if (!hasOptions) {
                isValid = false;
                violations.push(`Dietary constraint failed on node: ${node.id}`);
              }
            }

            // LOGISTICAL
            if (
              constraint.category === ConstraintCategory.LOGISTICAL &&
              node.nodeType === NodeType.TRANSIT
            ) {
              const reqProvider = constraint.ruleDefinition?.provider;
              const reqVal = constraint.ruleDefinition?.requiresValidation;
              if (reqProvider && node.provider === reqProvider) {
                if (reqVal && !node.attributes.includes(reqVal)) {
                  isValid = false;
                  violations.push(`Logistical constraint failed on node: ${node.id}`);
                }
              }
            }

            // SCHEDULING (Run block)
            if (constraint.category === ConstraintCategory.SCHEDULING) {
              const blockedTime = constraint.ruleDefinition?.blockedTime;
              if (blockedTime) {
                const userTimezone = users[0]?.timezone || 'UTC';
                const formatter = new Intl.DateTimeFormat('en-US', {
                  timeZone: userTimezone,
                  hourCycle: 'h23',
                  hour: '2-digit',
                  minute: '2-digit'
                });
                const nodeStartHourStr = formatter.format(node.startTime);
                const nodeEndHourStr = formatter.format(node.endTime);

                // Overlap condition:
                // 1. Node starts during the block
                // 2. Node ends during the block
                // 3. Node envelops the block
                if (
                  (nodeStartHourStr >= blockedTime.start && nodeStartHourStr < blockedTime.end) ||
                  (nodeEndHourStr > blockedTime.start && nodeEndHourStr <= blockedTime.end) ||
                  (nodeStartHourStr <= blockedTime.start && nodeEndHourStr >= blockedTime.end)
                ) {
                   isValid = false;
                   violations.push(`Scheduling constraint failed on node: ${node.id} (Overlaps ${blockedTime.start}-${blockedTime.end} in ${userTimezone})`);
                }
              }
            }
          }

          // SOFT CONSTRAINTS
          if (constraint.type === ConstraintType.SOFT && isValid) {
            if (
              constraint.category === ConstraintCategory.LOYALTY &&
              node.nodeType === NodeType.LODGING
            ) {
              const preferredBrand = constraint.ruleDefinition?.preferredBrand;
              if (preferredBrand && node.provider === preferredBrand) {
                score += constraint.weight || 0;
              }
            }
          }
        }
        if (!isValid) break;
      }

      if (isValid) {
        results.push({ path, isValid, score, violations });
      }
    }

    // Sort valid paths by score in descending order
    return results.sort((a, b) => b.score - a.score);
  }
}
