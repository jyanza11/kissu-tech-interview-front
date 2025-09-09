import type { BadgeProps } from "@/components/ui/badge";

type Severity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
type SeverityVariant =
  | "severity-low"
  | "severity-medium"
  | "severity-high"
  | "severity-critical";

/**
 * Maps severity enum values to badge variant names
 */
export function getSeverityBadgeVariant(severity: Severity): SeverityVariant {
  const severityMap: Record<Severity, SeverityVariant> = {
    LOW: "severity-low",
    MEDIUM: "severity-medium",
    HIGH: "severity-high",
    CRITICAL: "severity-critical",
  };

  return severityMap[severity];
}

/**
 * Gets badge props for severity display
 */
export function getSeverityBadgeProps(
  severity: Severity
): Pick<BadgeProps, "variant"> {
  return {
    variant: getSeverityBadgeVariant(severity),
  };
}
