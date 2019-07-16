export interface Key {
    key: string | number;
}

export interface Condition<T> {
    condition: (input: T) => boolean;
}

export interface Loading {
    loading: boolean;
}

export interface Items<T> {
    items: Array<T>;
}

export interface URI {
    uri: string;
}

export interface Display {
    readOnly: boolean;
}

export interface IURILink {
    href: string;
}