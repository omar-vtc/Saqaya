// data/api/getProducts.ts
import Product from "../entities/Product";

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    console.log("API Response:", response.status);
    if (response.status !== 200) {
      throw new Error("Invalid API response");
    }

    const products: Product[] = data.map((item: any) => ({
      id: item.id,
      name: item.title,
      price: item.price,
      description: item.description,
      image: item.image,
      category: item.category,
      rating: {
        rate: item.rating?.rate ?? 0,
        count: item.rating?.count ?? 0,
      },
    }));

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
