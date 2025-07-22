import axios from 'axios';

const checkOutOfStock = async (items: any[]) => {
  const outOfStockIds: number[] = [];
  for (const item of items) {
    const res = await axios.get(`https://dummyjson.com/products/${item.id}`);
    if (res.data.stock <= 0) {
      outOfStockIds.push(item.id);
    }
  }
  return outOfStockIds;
};

const cartService = { checkOutOfStock };
export default cartService; 