export const calculatePriceTax = (price: number, tax: boolean) => {
  if (!tax) return price
  return (price + (price * 0.12))
} 