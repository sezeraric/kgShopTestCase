import axios from 'axios';

const fetchProducts = async ({ search, selectedCategory, sort, page }: any) => {
  const PAGE_SIZE = 12;
  let url = '';
  let params: any = {};
  const skip = page * PAGE_SIZE;
  if (search) {
    url = 'https://dummyjson.com/products/search';
    params = { q: search, limit: PAGE_SIZE, skip };
  } else if (selectedCategory && selectedCategory !== 'all') {
    url = `https://dummyjson.com/products/category/${selectedCategory}`;
    params = { limit: PAGE_SIZE, skip };
  } else {
    url = 'https://dummyjson.com/products';
    params = { limit: PAGE_SIZE, skip };
  }
  if (sort === 'price-asc') {
    params.sortBy = 'price'; params.order = 'asc';
  } else if (sort === 'price-desc') {
    params.sortBy = 'price'; params.order = 'desc';
  } else if (sort === 'name-asc') {
    params.sortBy = 'title'; params.order = 'asc';
  } else if (sort === 'name-desc') {
    params.sortBy = 'title'; params.order = 'desc';
  }
  const res = await axios.get(url, { params });
  const newProducts = res.data.products || res.data;
  return {
    products: newProducts,
    total: res.data.total || newProducts.length || 0,
    hasMore: (skip + newProducts.length) < (res.data.total || 0),
  };
};

const fetchCategories = async () => {
  const res = await axios.get('https://dummyjson.com/products/categories');
  return res.data.map((cat: any) => ({ slug: cat.slug, name: cat.name }));
};

const productService = { fetchProducts, fetchCategories };
export default productService; 