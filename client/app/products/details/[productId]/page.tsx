import { getCommentsById } from "@/app/_lib/actions";
import { getProductById } from "@/app/_utils/productsApi";
import ProductDetails from "./ProductDetails";
import Product from "@/app/_types/Products";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function generateStaticParams() {
  const res = await fetch(`${API_URL}/products/get-ids`);

  const { data } = await res.json();

  console.log(data);

  const result = (data as unknown as { id: number }[]).map(
    (productId: { id: number }) => ({
      productId: String(productId.id),
    })
  );

  return result;
}

async function page({ params }: { params: Promise<{ productId: string }> }) {
  try {
    const { productId } = await params;
    const product = await getProductById(productId);
    const reviews = await getCommentsById((product as unknown as Product)._id);

    return (
      <ProductDetails
        product={product as unknown as Product}
        reviews={reviews}
      />
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return (
      <div>
        <p>Error: Something Went Wrong</p>
      </div>
    );
  }
}

export default page;
