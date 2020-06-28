import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  appleStockCount: any = 10;
  orangeStockCount: any = 10;
  grapesStockCount: any = 10;
  basketItemsInitialCount: any = 0;
  appleStockCountInStack = 0;
  orangeStockCountInStack = 0;
  grapesStockCountInStack = 0;
  userInfo;
  itemStack = [];
  useCaseError = false;
  warningMessage = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
    if (!this.userInfo) {
      this.router.navigate(['/']);
    }
  }

  invokeUserCase(errorMessage) {
    this.useCaseError = true;
    this.warningMessage = errorMessage;
    setTimeout(() => {
      this.useCaseError = false;
    }, 3000);
  }

  adBasketActions(itemName, itemId) {
    if (this[`${itemName}StockCount`] === 0) {
      this.invokeUserCase(`${itemName} stock empty!`);
      return;
    }
    this[`${itemName}StockCount`]--;
    this[`${itemName}StockCountInStack`]++;
    this.itemStack.push(itemId);
  }

  removeItemFromBasketActions(itemName, itemId) {
    if (this[`${itemName}StockCountInStack`] === 0) {
      this.invokeUserCase(`${itemName} not exist in bucket`);
      return;
    }
    if ((this.itemStack.slice(-1)[0] !== itemId)) {
      this.invokeUserCase(`${itemName} can only be removed after removing fruit\'s on top`);
      return;
    }
    this[`${itemName}StockCount`]++;
    this[`${itemName}StockCountInStack`]--;
    this.itemStack.pop();
  }

  addItemToStack(action: string) {
    if (this.userInfo.permission === 'none') {
      this.invokeUserCase('user don\'t have permission to perform this action');
      return;
    }
    switch (action) {
      case 'addApple':
        this.adBasketActions('apple', 1);
        break;
      case 'addOrange':
        this.adBasketActions('orange', 2);
        break;
      case 'addGrapes':
        this.adBasketActions('grapes', 3);
        break;
    }
  }
  removeItemFromStack(action: string) {
    if (this.userInfo.permission === 'none') {
      this.invokeUserCase('user don\'t have permission to perform this action');
      return;
    }
    switch (action) {
      case 'removeApple':
        this.removeItemFromBasketActions('apple', 1);
        break;
      case 'removeOrange':
        this.removeItemFromBasketActions('orange', 2);
        break;
      case 'removeGrapes':
        this.removeItemFromBasketActions('grapes', 3);
        break;
    }
  }

  getItemName(itemId: any) {
    const fruitList = [{id: 1, name: 'apple'}, {id: 2, name: 'orange'}, {id: 3, name: 'grapes'}];
    return fruitList.find((item) => item.id === itemId);
  }

}
