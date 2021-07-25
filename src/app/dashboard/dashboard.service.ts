import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Product, PRODUCT_LIST } from "../shared/models/product-models";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  productsList: Product[] = PRODUCT_LIST;

  private productDataSource = new Subject<Product[]>();

  public selectedProductChanges$: Observable<Product[]> =
    this.productDataSource.asObservable();

  private warningMessage = new Subject<string>();

  public warningMessage$: Observable<string> =
    this.warningMessage.asObservable();

  /**
   * This method will be used to get the name of the item using the item Id
   * also this method will be used to get the color of the item from css file
   * @param itemId
   * @returns
   */
  public getItemName(itemId: any) {
    return this.productsList.find((item: any) => item.productId === itemId);
  }

  public getProducts() {
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
    this.productDataSource.next(this.productsList.slice());
  }
}
