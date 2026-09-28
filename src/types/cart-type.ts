export type Cart = {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  // image: string;
  image: {
    id: string;
    name: string;
    url: string;
  };
  category: string;
  subcategory: string;
};