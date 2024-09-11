export interface productType {
  title: string;
  desc: string | null;
  price: number;
  state: boolean;
  showcase: boolean;
  id: string;
  imageLink: string;
  createdAt: string;
  catId: string | null;
  categories: {
    title: string;
    desc: string | null;
    state: string;
    id: string;
  } | null;
  _count: {
    orders: number;
  };
}
