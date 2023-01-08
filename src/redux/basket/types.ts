export type CartItem = {
  id: string;
  imageUrl: string;
  count: number;
  title: string;
  price: number;
  size: number;
  type: string;
}

export interface BasketSliceState {
  totalPrice: number;
  items: CartItem[];
}