export type Product = { id: number; quantity: number; price: number };
export type Cart = Product[];
export type CartAction =
  | { type: "create"; payload: Product }
  | { type: "delete"; payload: { id: number } }
  | { type: "update"; payload: Product };
