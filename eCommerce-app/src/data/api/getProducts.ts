import Product from "../entities/Product";

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    console.log("API Response:", response.status);
    if (response.status !== 200) {
      throw new Error("Invalid API response");
    }

    // Transform the API response to match the Product interface
    const products: Product[] = data.map((item: any) => ({
      id: item.id,
      name: item.title,
      price: item.price,
      description: item.description,
      image: item.image,
    }));

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
