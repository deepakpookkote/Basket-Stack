import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../login/login.component";
import { DashboardService } from "./dashboard.service";
import { Subscription } from "rxjs";
import { Product, productActionInfo } from "../shared/models/product-models";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public productsList: Product[] = [];

  private productSubscription: Subscription;

  private errorMessageSubscription: Subscription;

  public userInfo: User;

  public cartItems = [];

  public warningMessage = null;

  constructor(
    private router: Router,
    private dashboardService: DashboardService
  ) {}

  public ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem("user"));
    if (!this.userInfo) {
      this.router.navigate(["/"]);
    }
    this.productsList = this.dashboardService.getProducts();
    this.productSubscription =
      this.dashboardService.selectedProductChanges$.subscribe(
        (products: Product[]) => {
          this.productsList = products;
        }
      );
    this.errorMessageSubscription =
      this.dashboardService.warningMessage$.subscribe((errorMessage) => {
        this.warningMessage = errorMessage;
      });
  }

  private initWarningMessage(errorMessage: string) {
    this.warningMessage = errorMessage;
  }

  private adBasketActions(itemId: number, index: number) {
    this.dashboardService.addBasketItem(index);
    if (this.warningMessage) {
      return;
    }
    this.cartItems = [...this.cartItems, itemId];
  }

  private removeItemFromBasketActions(index: number) {
    const updatedItem: Product = this.productsList[index];
    if (this.cartItems.some((item) => item === updatedItem.productId)) {
      if (this.cartItems.slice(-1)[0] !== updatedItem.productId) {
        this.initWarningMessage(
          `${updatedItem.name} can only be removed after removing fruit\'s on top`
        );
        return;
      }
      if (updatedItem.initialStock > updatedItem.stock) {
        updatedItem.stock++;
        this.cartItems.pop();
      }
      this.productsList[index] = updatedItem;
    } else {
      this.initWarningMessage(`${updatedItem.name} not exist in bucket`);
    }
  }

  /**
   *
   * @param productActionInfo - this object contains user actions which is performed on the products
   * this will get {productId, index, and userAction as parameters}
   */
  public initiateCartAction(productActionInfo: productActionInfo) {
    if (this.userInfo.permission === "none") {
      this.initWarningMessage(
        "user don't have permission to perform this action"
      );
      return;
    }
    if (productActionInfo.userAction === "addItem") {
      this.adBasketActions(
        +productActionInfo.productId,
        productActionInfo.index
      );
    } else {
      this.removeItemFromBasketActions(productActionInfo.index);
    }
  }

  public closeAlert() {
    this.warningMessage = null;
  }

  public ngOnDestroy() {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
    if (this.errorMessageSubscription) {
      this.errorMessageSubscription.unsubscribe();
    }
  }
}
