import { Component, Input } from "@angular/core";
import { DashboardService } from "../dashboard.service";

@Component({
  selector: "app-product-cart",
  templateUrl: "./product-cart.component.html",
  styleUrls: ["./product-cart.component.scss"],
})
export class ProductCartComponent {
  /**
   * cart items array input from the parent component
   */
  @Input() public cartItems;

  /**
   * This variable stores the updated cartItems array dynamically when user changes
   * this value will be updated in the onChanges life cycle
   * this variable needs to be removed in the future
   */
  public cartDisplayItems = [];

  constructor(public dashboardService: DashboardService) {}

  /** TODO
   * Need to find a better way to do this and get the cart values
   * may be we can use a subject or behavior subject here!!!
   */
  public ngOnChanges(): void {
    this.cartDisplayItems = this.cartItems;
  }
}
