export const setLocalStorage = (data: Record<string, string>) => {
  Object.entries(data).forEach(([keyBy, value]) => {
    localStorage.setItem(keyBy, value);
  });
};
export const removeLocalStorage = (keys: string[]) => {
  keys.forEach((key) => localStorage.removeItem(key));
};
