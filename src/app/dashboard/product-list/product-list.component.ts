import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import {
  Product,
  productActionInfo,
} from "src/app/shared/models/product-models";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  /**
   * Product List array from the parent component
   * */
  @Input() public productList: Product;
  @Output() productActionEvent = new EventEmitter<any>();

  ngOnInit(): void {
    console.log(this.productList);
  }

  /**
   * This method will emit user selected action and other product information to the parent component
   * @param productId
   * @param index
   * @param userAction
   */
  public emitProductionActionEvent(
    productId: number,
    index: number,
    userAction: string
  ) {
    const actionObject: productActionInfo = {
      productId: productId,
      index: index,
      userAction: userAction,
    };
    this.productActionEvent.emit(actionObject);
  }
}
