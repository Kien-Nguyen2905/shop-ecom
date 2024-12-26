export const YEAR = Array.from(
  { length: new Date().getFullYear() - 2023 },
  (_, index) => 2024 + index,
);
