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

export const PRODUCT_LIST: Product[] = [
  {
    name: "apple",
    type: "fruit",
    stock: 10,
    initialStock: 10,
    purchased: 0,
    productId: 1,
    color: "#ed4d3b",
  },
  {
    name: "orange",
    type: "fruit",
    initialStock: 10,
    stock: 10,
    purchased: 0,
    productId: 2,
    color: "#e45a1b",
  },
  {
    name: "grapes",
    type: "fruit",
    stock: 10,
    initialStock: 10,
    purchased: 0,
    productId: 3,
    color: "#a75c9f",
  },
  {
    name: "banana",
    type: "fruit",
    stock: 15,
    initialStock: 15,
    purchased: 0,
    productId: 4,
    color: "#d0d042",
  },
  {
    name: "tomato",
    type: "vegetable",
    stock: 15,
    initialStock: 15,
    purchased: 0,
    productId: 5,
    color: "#a54128",
  },
  {
    name: "mango",
    type: "fruit",
    stock: 10,
    initialStock: 10,
    purchased: 0,
    productId: 6,
    color: "#efa001",
  },
];
