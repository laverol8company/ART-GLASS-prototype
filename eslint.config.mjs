import next from "eslint-config-next";

/**
 * Next.js 16 ships eslint-config-next as a native flat config (core-web-vitals
 * + typescript combined), so we spread it directly — no FlatCompat bridge.
 */
const eslintConfig = [
  ...next,
  {
    ignores: ["next-env.d.ts", ".next/**", "out/**"],
  },
];

export default eslintConfig;
