import { Discount } from "../models"
import { DiscountNS } from "../types";

const getDiscount = async (discountCode: string) => {
    try {
        const discount: DiscountNS.Discount | null = await Discount.findOne({ code: discountCode })
        return discount;
    } catch (error) {
        console.error('something went wrong , please try again!')
        return false;
    }
}

const addDiscount = async (discount: DiscountNS.Discount) => {
    const newDiscount = new Discount({
        code: discount.code,
        value: discount.value
    })
    try {
        const addDicsount = await newDiscount.save()
        return addDicsount
    } catch (error) {
        console.error(error);
        return false
    }
}

export default { getDiscount , addDiscount }