export const YEAR = Array.from(
  { length: new Date().getFullYear() - 2024 },
  (_, index) => 2025 + index,
);
