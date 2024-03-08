import { useSelector } from 'src/store';
import { calculatePriceTax } from 'src/utils/calculatePricesTax';

const useCardCount = () => {
  const { card } = useSelector((store) => store.product_state);
  if (!card || card.length === 0) return {
    count: 0,
    card: null,
    totalPrice: 0
  };
  let count = 0;
  let totalPrice = 0;
  card.map((itm) => {
    count += itm.quantity;
    totalPrice += calculatePriceTax(itm.product.prices, itm.product.tax, itm.quantity);
    return itm;
  });
  return {
    card,
    count,
    totalPrice
  }
};
export default useCardCount;
