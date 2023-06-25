import express from 'express'
import { discountController } from '../controllers';

const router = express.Router();

router.get('/getDiscount', async (req, res) => {
    const discountCode = req.body.code;
    try {
        const discount = await discountController.getDiscount(discountCode);
        console.log(discount)
        if (discount) {
            res.status(200).send({ value: discount.value })
        } else {
            res.status(404).send({ message: 'No discount found , please try another code! ' })
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'something went wrong, please try again!' })
    }
})

router.post('/addDiscount', async (req, res) => {
    const discount = req.body;
    try {
        const addDiscount = await discountController.addDiscount(discount);
        if (addDiscount) {
            res.status(201).send({ message: 'discount added successfully' })
        } else {
            res.status(400).send({ message: 'discount code and value are both required!' })
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'something went wrong, please try again!' })
    }
})

export default router