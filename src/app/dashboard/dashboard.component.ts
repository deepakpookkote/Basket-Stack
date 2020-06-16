import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
  }

  addItemToStack(action) {
    if (this.userInfo.permission === 'none') {
      alert('user dont have permission to perform this action');
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
      alert('user dont have permission to perform this action');
      return;
    }
    switch (action) {
      case 'removeApple':
        if (this.appleStockCountInStack === 0) return;
        if ((this.itemStack.slice(-1)[0] !== 1)) {
          alert('items can only be removed in Last In First Out order');
          return;
        }
        this.appleStockCount++;
        this.appleStockCountInStack--;
        this.itemStack.pop();
        break;
      case 'removeOrange':
        if (this.orangeStockCountInStack === 0) return;
        if ((this.itemStack.slice(-1)[0] !== 2)) {
          alert('items can only be removed in Last In First Out order');
          return;
        }
        this.orangeStockCount++;
        this.orangeStockCountInStack--;
        this.itemStack.pop();
        break;
      case 'removeGrapes':
        if (this.grapesStockCountInStack === 0) return;
        if ((this.itemStack.slice(-1)[0] !== 3)) {
          alert('items can only be removed in Last In First Out order');
          return;
        }
        this.grapesStockCount++;
        this.grapesStockCountInStack--;
        this.itemStack.pop();
        break;
    }
  }

}
