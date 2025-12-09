import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Re-export node status utilities
export { calculateNodeStatus, getTimeSinceLastSeen } from "./utils/node-status";
