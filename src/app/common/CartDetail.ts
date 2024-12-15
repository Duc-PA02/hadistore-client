import { Cart } from "./Cart";
import { Product } from "./Product";

export class CartDetail {
    'cartDetailId': number;
    'quantity': number;
    'price': number;
    'product': Product;
    'cart': Cart;

    constructor(quantity: number, price: number, product: Product, cart: Cart) {
        this.quantity = quantity;
        this.price = price;
        this.product = product;
        this.cart = cart;
    }
}
