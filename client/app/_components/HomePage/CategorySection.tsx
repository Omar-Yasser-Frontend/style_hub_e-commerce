import ProductCard from "../ProductCard";
import HomeSectionLayout from "./HomeSectionLayout";

function CategorySection() {
  return (
    <section>
      <HomeSectionLayout headText="Featured Products">
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          }}
        >
          <ProductCard
            category="men's"
            title="Men's Collection"
            isProduct={false}
            img="https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/thumbnail.webp"
          />

          <ProductCard
            category="women's"
            title="women's Collection"
            isProduct={false}
            img="https://cdn.dummyjson.com/product-images/womens-dresses/corset-with-black-skirt/thumbnail.webp"
          />
        </div>
      </HomeSectionLayout>
    </section>
  );
}

export default CategorySection;
