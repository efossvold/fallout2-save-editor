export interface Item {
  id: string
  desc: string
}
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
