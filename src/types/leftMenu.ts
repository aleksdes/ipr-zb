export interface ISubLink {
    title: string;
    path: string;
}

export interface ILink {
    title: string;
    icon: string;
    name?: string;
    links: ISubLink[];
}


export interface ISubmenu {
    isOpen: boolean;
    content:  ILink | null
}