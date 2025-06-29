// data/entities/Product.ts
export default interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category?: string;
  rating?: {
    rate: number;
    count: number;
  };
}
