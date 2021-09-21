export type MenuItem = {
    id: string
    name: string
    description?: string
    category?: Category
}

export type Restaurant = {
    id: string
    name: string,
    about_section: string
}

export type Category = {
    id: string 
    name: string
    path: string
    level: number
    has_header: boolean
    menu_item?: Array<MenuItem>
}