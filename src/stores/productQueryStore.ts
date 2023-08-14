import { create } from 'zustand';

interface ProductQueryStore {
  isActive: boolean | null;
  setIsActive: (value: string) => void;
}

const useProductQueryStore = create<ProductQueryStore>(set => ({
  isActive: null,
  setIsActive: value =>
    set(() => {
      const isBoolean =
        value === 'true' ? true : value === 'false' ? false : null;
      return { isActive: isBoolean };
    }),
}));

export default useProductQueryStore;
