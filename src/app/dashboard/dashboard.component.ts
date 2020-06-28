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

  addItemToStack(action) {
    if (this.userInfo.permission === 'none') {
      this.invokeUserCase('user don\'t have permission to perform this action');
      return;
    }
    switch (action) {
      case 'addApple':
        if (this.appleStockCount === 0) return;
        this.appleStockCount--;
        this.appleStockCountInStack++;
        this.itemStack.push(1);
        break;
      case 'addOrange':
        if (this.orangeStockCount === 0) return;
        this.orangeStockCount--;
        this.orangeStockCountInStack++;
        this.itemStack.push(2);
        break;
      case 'addGrapes':
        if (this.grapesStockCount === 0) return;
        this.grapesStockCount--;
        this.grapesStockCountInStack++;
        this.itemStack.push(3);
        break;
    }
  }
  removeItemFromStack(action) {
    if (this.userInfo.permission === 'none') {
      this.invokeUserCase('user don\'t have permission to perform this action');
      return;
    }
    switch (action) {
      case 'removeApple':
        if (this.appleStockCountInStack === 0) return;
        if ((this.itemStack.slice(-1)[0] !== 1)) {
          this.invokeUserCase('Apple can only be removed after removing fruit\'s on top');
          return;
        }
        this.appleStockCount++;
        this.appleStockCountInStack--;
        this.itemStack.pop();
        break;
      case 'removeOrange':
        if (this.orangeStockCountInStack === 0) return;
        if ((this.itemStack.slice(-1)[0] !== 2)) {
          this.invokeUserCase('Orange can only be removed after removing fruit\'s on top');
          return;
        }
        this.orangeStockCount++;
        this.orangeStockCountInStack--;
        this.itemStack.pop();
        break;
      case 'removeGrapes':
        if (this.grapesStockCountInStack === 0) return;
        if ((this.itemStack.slice(-1)[0] !== 3)) {
          this.invokeUserCase('Grapes can only be removed after removing fruit\'s on top');
          return;
        }
        this.grapesStockCount++;
        this.grapesStockCountInStack--;
        this.itemStack.pop();
        break;
    }
  }

  getItemName(item) {
    switch (item) {
      case 1:
        return 'apple';
        break;
      case 2:
        return 'orange';
        break;
      case 3:
        return 'grapes';
        break;
      default:
        break;
    }
  }

}
