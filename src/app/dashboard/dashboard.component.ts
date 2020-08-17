import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../login/login.component';
import { DashboardService, Product } from './dashboard.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, OnDestroy {

  productsList: Product[] = [];
  productSubscription: Subscription;
  errorMessageSubscription: Subscription;

  userInfo: User;
  itemStack = [];
  warningMessage = null;

  constructor(private router: Router, private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
    if (!this.userInfo) {
      this.router.navigate(['/']);
    }
    this.productsList = this.dashboardService.getProducts();
    this.productSubscription = this.dashboardService.productChanges.subscribe((products: Product[]) => {
      this.productsList = products;
    });
    this.errorMessageSubscription = this.dashboardService.warningMessage.subscribe((errorMessage) => {
      this.warningMessage = errorMessage;
    });
  }

  invokeUserCase(errorMessage: string) {
    this.warningMessage = errorMessage;
  }

  adBasketActions(itemId: number, index: number) {
    this.dashboardService.adBasketActions(index);
    if (this.warningMessage) {
      return;
    }
    this.itemStack.push(itemId);
  }

  removeItemFromBasketActions(index: number) {
    const updatedItem: Product = this.productsList[index];
    if (this.itemStack.some((item) => item === updatedItem.productId)) {
      if ((this.itemStack.slice(-1)[0] !== updatedItem.productId)) {
        this.invokeUserCase(`${updatedItem.name} can only be removed after removing fruit\'s on top`);
        return;
      }
      if (updatedItem.initialStock > updatedItem.stock) {
        updatedItem.stock++;
        this.itemStack.pop();
      }
      this.productsList[index] = updatedItem;
    } else {
      this.invokeUserCase(`${updatedItem.name} not exist in bucket`);
    }
  }

  initiateCartAction(itemId: string, index: number, operator: string) {
    if (this.userInfo.permission === 'none') {
      this.invokeUserCase('user don\'t have permission to perform this action');
      return;
    }
    if (operator === 'addItem') {
      this.adBasketActions(+itemId, index);
    } else {
      this.removeItemFromBasketActions(index);
    }
  }

  getItemName(itemId: any) {
    return this.productsList.find((item: any) => item.productId === itemId);
  }

  closeAlert() {
    this.warningMessage = null;
  }

  ngOnDestroy() {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
    if (this.errorMessageSubscription) {
      this.errorMessageSubscription.unsubscribe();
    }
  }

}
