import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {mmkvStorage} from './storage';

type WaterStore = {
  waterDrinkStamps: string[];
  addWaterIntake: (timestamp: string) => void;
  resetWaterIntake: () => void;
};

export const useWaterStore = create<WaterStore>()(
  persist(
    (set, get) => ({
      waterDrinkStamps: [],
      addWaterIntake: timestamp => {
        const waterDrinkStamps = [...get().waterDrinkStamps, timestamp];
        set({waterDrinkStamps});
      },
      resetWaterIntake: () => {
        set({waterDrinkStamps: []});
      },
    }),
    {
      name: 'water-storage',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
