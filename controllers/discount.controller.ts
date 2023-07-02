import { Discount } from "../models"
import { DiscountNS } from "../types";
import jwt from 'jsonwebtoken'

const getDiscount = async (discountCode: string) => {
    try {
        const discount: DiscountNS.Discount | null = await Discount.findOne({ code: discountCode })
        if (discount) {
            try {
                if (jwt.verify(discount?.token || '', process.env.SECRET_KEY || ''))
                    return discount;
                else {
                    return false
                }
            } catch (error) {
                console.error(error);
                return false
            }
        } else {
            return false
        }
    } catch (error) {
        console.error(error)
        return false;
    }
}

const addDiscount = async (discount: DiscountNS.Discount) => {
    const token = jwt.sign(discount, process.env.SECRET_KEY || '', { expiresIn: `${discount.daysInterval}d` })
    const newDiscount = new Discount({
        code: discount.code,
        value: discount.value,
        token: token
    })
    try {
        const addDicsount = await newDiscount.save()
        return addDicsount
    } catch (error) {
        console.error(error);
        return false
    }
}

export default { getDiscount, addDiscount }