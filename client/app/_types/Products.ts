type Product = {
  _id: string;
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  discountPercentage: number;
  rating: number;
  stock: number;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    _id: string;
    userImage: string;
    userName: string;
    createdAt: Date;
    rating: number;
    comment: string;
  }[];
  thumbnail: string;
  images: string[];
};

export default Product;
