export type SearchPizzaParams = {
  search: string,
  order: string,
  category: string,
  sortBy: string,
  currentPage: string
}

export type PizzaProps = {
  id: string,
  imageUrl: string,
  title: string,
  price: number,
  sizes: number[],
  types: number[]
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export interface PizzaSliceState {
  items: PizzaProps[];
  status: Status;
}