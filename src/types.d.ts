export type View = "form" | "menu";
export interface FormData {
    cardNumber: string;
    cvc: string;
    expiry: string;
}
