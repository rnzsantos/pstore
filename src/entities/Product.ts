export default interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  stocks: number;
  gameImage: string;
  isActive: boolean;
  createdOn: Date;
}
