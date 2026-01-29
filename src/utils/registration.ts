export type RegistrationStatus = "open" | "closing-soon" | "closed" | "unknown";

export interface RegistrationInfo {
  status: RegistrationStatus;
  daysLeft: number | null;
  formattedDeadline: string | null;
}

/**
 * Get registration status and related info based on deadline
 * @param registrationDeadline - ISO date string (e.g., "2025-06-25")
 * @param closingSoonThreshold - Number of days to consider "closing soon" (default: 3)
 */
export function getRegistrationInfo(
  registrationDeadline?: string,
  closingSoonThreshold: number = 28
): RegistrationInfo {
  if (!registrationDeadline) {
    return {
      status: "unknown",
      daysLeft: null,
      formattedDeadline: null,
    };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const deadline = new Date(registrationDeadline);
  deadline.setHours(23, 59, 59, 999); // End of deadline day
  
  const diffTime = deadline.getTime() - today.getTime();
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Format the deadline for display
  const formattedDeadline = new Date(registrationDeadline).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  let status: RegistrationStatus;
  
  if (daysLeft <= 0) {
    status = "closed";
  } else if (daysLeft <= closingSoonThreshold) {
    status = "closing-soon";
  } else {
    status = "open";
  }

  return {
    status,
    daysLeft: daysLeft >= 0 ? daysLeft : null,
    formattedDeadline,
  };
}

/**
 * Get a human-readable label for days remaining
 */
export function getDaysLeftLabel(daysLeft: number | null): string {
  if (daysLeft === null) return "";
  if (daysLeft === 1) return "Last day to register!";
  if (daysLeft === 2) return "1 day left to register";
  return `${daysLeft} days left to register`;
}