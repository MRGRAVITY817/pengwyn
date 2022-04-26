import create from "zustand";

export type PopupPage =
  | "intro"
  | "welcome"
  | "setup"
  | "main"
  | "history"
  | "qrcode"
  | "activity"
  | "profile"
  | "support"
  | "settings";

interface UsePopupPageProps {
  currentPage: PopupPage;
  setCurrentPage: (page: PopupPage) => void;
}

export const usePopupPage = create<UsePopupPageProps>((set) => ({
  currentPage: "intro",
  setCurrentPage: (page: PopupPage) => set((_state) => ({ currentPage: page })),
}));