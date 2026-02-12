import { FC } from "react";
export type HeaderVariant = "form" | "menu";
interface HeaderProps {
    variant: HeaderVariant;
    title: string;
    onIconClick: () => void;
}
export declare const Header: FC<HeaderProps>;
export {};
