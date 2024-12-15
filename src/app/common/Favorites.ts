import { Customer } from "./Customer";
import { Product } from "./Product";

export class Favorites {
    'favoriteId': number;
    'user': Customer;
    'product': Product;

    constructor(user: Customer, product: Product) {
        this.product = product;
        this.user = user;
    }
}
