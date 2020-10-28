// Interfaces: Dialogs

export interface DialogMessage {
    title: string;
    message: string;
    confirm?: boolean;
}

export interface DialogList {
    title: string;
    message?: string;
    list: any[];
}

export interface DialogImage {
    title: string;
    message?: string;
    image: string;
    width: string;
}
