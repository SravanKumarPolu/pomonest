// Removed duplicate SelectedPageType declaration to avoid errors.
export interface User {
    id: string;
    name: string;
    email: string;
    role: "user" | "admin";  }
export type SelectedPageEnum = 
    | "pomodoro"
    | "settings"
    | "tasks";

    export const SelectedPage = {
        Pomodoro: "Pomodoro",
        ContactUs: "ContactUs",
        home: "home",
        setting: "setting",
        login: "login",
        report: "report",
      } as const;
      
      export type SelectedPageType = (typeof SelectedPage)[keyof typeof SelectedPage];
      
      