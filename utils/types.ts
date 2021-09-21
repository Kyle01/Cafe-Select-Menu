export type MenuItem = {
    id: string
    name: string
    description?: string
    category: string
    inventory: number
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
}

export const CATEGORIES = [
    "Cocktails",
    "Wine",
    "Beer"
]
Object.freeze(CATEGORIES)