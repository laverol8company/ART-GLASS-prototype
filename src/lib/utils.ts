type ClassValue = string | number | false | null | undefined;

/** Join truthy class names with a single space. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
