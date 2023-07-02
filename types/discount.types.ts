namespace DiscountNS {
    export interface Discount {
        code: string;
        value: number;
        daysInterval: number;
        token: string;
    }
}
export default DiscountNS