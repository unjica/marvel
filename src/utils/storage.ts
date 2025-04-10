const STORAGE_KEY = 'marvel_comics_filter';

export const getStoredFilter = (): string => {
  if (typeof window === 'undefined') return 'All';
  return localStorage.getItem(STORAGE_KEY) || 'All';
};

export const setStoredFilter = (format: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, format);
}; 
