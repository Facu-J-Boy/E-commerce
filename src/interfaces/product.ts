export interface product {
  _id: string;
  title: string;
  price: number;
  description?: string;
  category?: { _id: string; name: string };
  image: string;
  rating?: number;
}
