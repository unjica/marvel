interface Price {
  type: string;
  price: number;
}

export const formatPrice = (prices: Price[]): string => {
  if (!prices || prices.length === 0) return 'N/A';
  
  const printPrice = prices.find(price => price.type === 'printPrice');
  if (printPrice) {
    return printPrice.price > 0 ? `${printPrice.price} €` : 'Free';
  }
  
  // If no print price, find the lowest price
  const lowestPrice = Math.min(...prices.map(price => price.price));
  return lowestPrice > 0 ? `${lowestPrice} €` : 'Free';
}; 