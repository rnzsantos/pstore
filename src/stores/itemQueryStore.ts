import { create } from 'zustand';

interface ItemQueryStore {
  itemQuery: { searchText?: string };
  setText: (searchText: string) => void;
}

const useItemQueryStore = create<ItemQueryStore>(set => ({
  itemQuery: { searchText: '' },
  setText: searchText => set(() => ({ itemQuery: { searchText } })),
}));

export default useItemQueryStore;
