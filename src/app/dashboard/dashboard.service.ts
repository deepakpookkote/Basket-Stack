import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Product } from "../shared/models/product-models";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  productsList = PRODUCT_LIST;

  productChanges = new Subject<Product[]>();
  warningMessage = new Subject<string>();

  constructor() {}

  getProducts() {
    return this.productsList;
  }

  public addBasketItem(index: number) {
    const updateItem: Product = this.productsList[index];
    if (updateItem.stock <= 0) {
      this.warningMessage.next(`${updateItem.name} empty!`);
      return;
    }
    updateItem.stock--;
    this.productsList[index] = updateItem;
    this.productChanges.next(this.productsList.slice());
  }
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
