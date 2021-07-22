export interface productActionInfo {
  productId: number;
  index: number;
  userAction: string;
}

export interface Product {
  name: string;
  type: string;
  stock: number;
  initialStock: number;
  purchased?: number;
  productId: number;
  color: string;
}
