import Product from "../entities/Product";

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch("https://fakestoreapi.in/api/products");
    const data = await response.json();

    if (data.status !== "SUCCESS" || !Array.isArray(data.products)) {
      throw new Error("Invalid API response");
    }

    // Transform the API response to match the Product interface
    const products: Product[] = data.products.map((item: any) => ({
      id: item.id,
      name: item.title, // Mapping "title" to "name"
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
