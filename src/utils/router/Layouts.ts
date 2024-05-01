export type Layout = {
    layout: string
}

export const baseLogoLayout: Layout = {
    layout: "base-logo"
}

export const errorLayout: Layout = {
    layout: "error"
}

export const emptyLayout: Layout = {
    layout: "empty"
}

export const mainLayout: Layout = {
    layout: "main"
}

export enum Layouts {
    MAIN= "main",
    ERROR="error",
    EMPTY="empty",
    LOGO="base-logo"
}

