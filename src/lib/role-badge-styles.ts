import { UserRole } from "@/types/enum";

// Semantic color configuration based on roles
export const ROLE_BADGE_STYLES: Record<UserRole, string> = {
  [UserRole.ADMIN]:
    "bg-amber-200 text-amber-700 border-amber-200 dark:bg-amber-500 dark:text-amber-100 dark:border-amber-500",
  [UserRole.AUTHOR]:
    "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800",
  [UserRole.USER]:
    "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
};