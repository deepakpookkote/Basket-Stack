import { Component, Input } from "@angular/core";
import { Product } from "src/app/shared/models";

@Component({
  selector: "app-product-summary",
  templateUrl: "./product-summary.component.html",
  styleUrls: ["./product-summary.component.scss"],
})
export class ProductSummaryComponent {
  @Input() public productList: Product;

  @Input() public cartItems;

  /**
   * This variable stores the updated cartItems array dynamically when user changes
   * this value will be updated in the onChanges life cycle
   * this variable needs to be removed in the future
   */
  public cartDisplayItems = [];

  /**TODO
   * Need to find a better way to do this and get the cart values
   * may be we can use a subject or behavior subject here!!!
   */
  public ngOnChanges(): void {
    this.cartDisplayItems = this.cartItems;
  }
}
