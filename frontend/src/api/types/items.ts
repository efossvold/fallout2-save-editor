export interface Item {
  id: string
  desc: string
}

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export interface Items {
  [id: string]: Item
}

export interface InventoryItem {
  id: string
  qty: number
  desc: string
  category: string
  qtyContained: number
}
