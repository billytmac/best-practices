// 通用 store
// 例:

// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";

// export interface UserInfo {
//   uid?: string | number
//   role_id?: string | number
//   [key: string]: any
// }

// export interface PickerDataItem {
//   selectedData: number[]
//   dataList: { label: string, value: number }[][]
//   extendSelectedData: any
// }

// export interface PickerData {
//   server: PickerDataItem
//   role: PickerDataItem
//   [key: string]: PickerDataItem
// }

// interface ServerItem {
//   server_id: string | number
//   roles?: any[]
//   [key: string]: any
// }

// interface UserStore {
//   userInfo: UserInfo
//   pickerData: PickerData
//   serverList: ServerItem[]
//   setUserInfo: (info: UserInfo) => void
//   setPickerData: (data: PickerData) => void
//   userInfoToBeStored: Record<string, any>
//   setUserInfoToBeStored: (info: Record<string, any>) => void
//   setServerList: (list: ServerItem[]) => void
// }

// const defaultPickerData: PickerData = {
//   server: { selectedData: [], dataList: [[]], extendSelectedData: {} },
//   role: { selectedData: [], dataList: [[]], extendSelectedData: {} },
// }

// const useCommonStore = create<UserStore>()(
//   persist(
//     (set) => ({
//       userInfo: {},
//       pickerData: defaultPickerData,
//       serverList: [],
//       userInfoToBeStored: {},
//       setUserInfo: (info) => set({ userInfo: info }),
//       setPickerData: (data) => set({ pickerData: data }),
//       setUserInfoToBeStored: (info) => set({ userInfoToBeStored: info }),
//       setServerList: (list) => set({ serverList: list }),
//     }),
//     {
//       name: 'user-storage',
//       partialize: (state) => ({ userInfo: state.userInfo }),
//       storage: createJSONStorage(() =>
//         typeof window !== 'undefined' ? window.localStorage : {
//           getItem: () => null,
//           setItem: () => {},
//           removeItem: () => {},
//         }
//       ),
//     }
//   )
// )

// export default useCommonStore
// export type { UserStore }
