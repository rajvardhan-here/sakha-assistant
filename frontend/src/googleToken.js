const STORAGE_KEY = "sakha_google_token";

export const setGoogleToken = (token) => {
  if (token) {
    localStorage.setItem(STORAGE_KEY, token);
  }
};

export const getGoogleToken = () => {
  return localStorage.getItem(STORAGE_KEY);
};

export const clearGoogleToken = () => {
  localStorage.removeItem(STORAGE_KEY);
};