import create from "zustand";
import { EditedTask, EditedNotice } from "./types/types";

type State = {
    editedTask: EditedTask
    editedNotice: EditedNotice
    updateEditedTask: (payload: EditedTask) => void
    updateEditedNotice: (payload: EditedNotice) => void
    resetEditedTask: () => void
    resetEditedNotice: () => void
}
/** store.tsはzustand（ライブラリ）で状態管理のオブジェクトと更新用の関数を定義 */
// ZustandはReactの状態管理ライブラリで、グローバルな状態を簡単に管理できます。
// EditedTaskとEditedNoticeは、タスクと通知の編集状態を表す型です。
const useStore = create<State>((set) => ({
                    editedTask: { id: "", title: ""},
                    editedNotice: { id: "", content: ""},
                updateEditedTask: (payload) =>
                    set({ editedTask: {id: payload.id, title: payload.title,}}),

                resetEditedTask: () => set({ editedTask: { id: "", title: ""}}),

                updateEditedNotice: (payload) =>
                    set({ editedNotice: {id: payload.id, content:payload.content,}}),

                resetEditedNotice: () => set({ editedNotice: { id: "", content: ""}}),
}))

export default useStore;