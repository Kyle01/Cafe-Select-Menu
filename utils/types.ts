export type MenuItem = {
    id: string
    name: string
    description?: string
    category: string
    inventory: number
}

export const CATEGORIES = [
    "Cocktails",
    "Wine",
    "Beer"
]
Object.freeze(CATEGORIES)