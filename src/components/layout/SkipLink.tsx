/** Keyboard skip-link to main content (§11). */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only rounded-md bg-bone px-4 py-2 text-sm font-medium text-bg focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]"
    >
      Перейти до вмісту
    </a>
  );
}
