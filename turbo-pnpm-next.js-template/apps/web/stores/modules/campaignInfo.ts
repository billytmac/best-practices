import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// interface CampaignStore {
//   loginPopupShow: boolean;
// }

const useCampaignStore = create<CampaignStore>()(
  persist(
    (set) => ({
      // loginPopupShow: false,
      // setLoginPopupShow: (value) => set({ loginPopupShow: value }),
    }),
    {
      name: "web-storage",
      partialize: (state) => ({
        // loginPopupShow: state.loginPopupShow,
      }),
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? window.localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            },
      ),
    },
  ),
);

export default useCampaignStore;
// export type { CampaignStore };
