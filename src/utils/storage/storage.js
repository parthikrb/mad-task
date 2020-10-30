
export const setStorageItem = (key, value) => {
  localStorage.setItem(key, value);
};

export const getStorageItem = key => {
  return localStorage.getItem(key);
};

export const clearStorageItem = key => {
  localStorage.removeItem(key);
};

export const clearStorage = () => {
  localStorage.clear();
};
