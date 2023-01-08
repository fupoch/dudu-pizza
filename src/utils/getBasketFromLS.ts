import { calcTotalPrice } from "./calcTotalPrice"

export const getBasketFromLS = () => {
  const data = localStorage.getItem('basket')
  const items = data ? JSON.parse(data) : []
  const totalPrice = calcTotalPrice(items)
  console.log(data)
  return {
    items,
    totalPrice
  }

}