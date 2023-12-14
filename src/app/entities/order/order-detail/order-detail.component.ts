import {Component, Input} from '@angular/core';
import {Order} from "../../../api/order";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent {
  @Input() order!: Order;
  display: boolean = false;

  showDetail(order: Order) {
    this.display = true;
    this.order = order;
  }

  getProductPrice(orderProduct: any): number | null {
    if (orderProduct && orderProduct.product && orderProduct.quantity) {
      return orderProduct.product.price * orderProduct.quantity;
    }
    return null;
  }

  hideDetail(): void {
    this.display = false;
  }
}
