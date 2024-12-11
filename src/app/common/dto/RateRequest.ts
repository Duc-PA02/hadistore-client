export interface RateRequest {
    id: number;
    rating: number;
    comment: string;
    rateDate: Date;
    userId: number;
    productId: number;
    orderDetailId: number;
}