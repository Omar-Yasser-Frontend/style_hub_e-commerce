import Product from "@/app/_types/Products";
import HomeSectionLayout from "./HomeSectionLayout";
import ProductsSwiper from "./ProductsSwiper";
import { getProducts } from "@/app/_utils/productsApi";

async function NewArrivalSection() {
  try {
    const data = await getProducts();

    return (
      <section>
        <HomeSectionLayout headText="New Arrival">
          <ProductsSwiper
            products={(data as unknown as { products: Product[] }).products}
          />
        </HomeSectionLayout>
      </section>
    );
  } catch (e) {
    console.error("Error fetching products:", e);

    return (
      <section>
        <HomeSectionLayout headText="New Arrival">
          <p className="text-red-600 text-lg">
            Failed to load products. Please try again later.
          </p>
        </HomeSectionLayout>
      </section>
    );
  }
}

export default NewArrivalSection;
