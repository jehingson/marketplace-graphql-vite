
export const calculatePriceTax = (price: number, tax: boolean, quantity: number) => {
  const priceQuantity = price * quantity 
  if (!tax) return priceQuantity
  return (priceQuantity + (priceQuantity * 0.12))
}

export const formatNumberCurrency = (data: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency',  currency: 'USD' }).format(data)
}