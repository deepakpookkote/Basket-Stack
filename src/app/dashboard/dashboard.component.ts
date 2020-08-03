import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../login/login.component';

export interface Product {
  name: string;
  type: string;
  stock: number;
  initialStock: number;
  purchased?: number;
  productId: number;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  productsList: Product[] = [
    {
      name: 'apple',
      type: 'fruit',
      stock: 10,
      initialStock: 10,
      purchased: 0,
      productId: 1,
      color: '#ed4d3b'
    },
    {
      name: 'orange',
      type: 'fruit',
      initialStock: 10,
      stock: 10,
      purchased: 0,
      productId: 2,
      color: '#e45a1b'

    },
    {
      name: 'grapes',
      type: 'fruit',
      stock: 10,
      initialStock: 10,
      purchased: 0,
      productId: 3,
      color: '#a75c9f'
    },
    {
      name: 'banana',
      type: 'fruit',
      stock: 15,
      initialStock: 15,
      purchased: 0,
      productId: 4,
      color: '#d0d042'
    },
    {
      name: 'tomato',
      type: 'vegetable',
      stock: 15,
      initialStock: 15,
      purchased: 0,
      productId: 5,
      color: '#a54128'
    },
    {
      name: 'mango',
      type: 'fruit',
      stock: 10,
      initialStock: 15,
      purchased: 0,
      productId: 6,
      color: '#efa001'
    },
  ];

  userInfo: User;
  itemStack = [];
  warningMessage = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
    if (!this.userInfo) {
      this.router.navigate(['/']);
    }
  }

  invokeUserCase(errorMessage: string) {
    this.warningMessage = errorMessage;
  }

  adBasketActions(itemId: number, index: number) {
    const updateItem: Product = this.productsList[index];
    if (updateItem.stock <= 0) {
      this.invokeUserCase(`${updateItem.name} empty!`);
      return;
    }
    updateItem.stock--;
    this.productsList[index] = updateItem;
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

}
