export const setLocalStorage = (data: Record<string, string>) => {
  Object.entries(data).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });
};
export const removeLocalStorage = (keys: string[]) => {
  keys.forEach((key) => localStorage.removeItem(key));
};
