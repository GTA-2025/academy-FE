import { ReactNode } from "react";

export type HeaderItems = {
  name: string;
  link: string;
};

export interface CustomButtonProps {
  title: string;
  action: () => void;
  styles?: string;
  bgVirant?: string;
  textVirant?: string;
  Icon?: React.ComponentType<any>;
}

export interface HeaderProps {
  logo: StaticImageData;
  navLinks: HeaderItems[];
  modeToggler: ReactNode;
}


export interface ResponseTypes {
  [key]: {
    [key]: any;
  }
}
