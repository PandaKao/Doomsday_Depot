import cron from "node-cron";
import { Product } from "../models/index.js";

export const dealsUpdate = () => {
    cron.schedule('* * * * *', async () => {
        console.log("cron running every minute");

        try {
            const activeDeals = await Product.findOne({ onSaleDate: {$gte: new Date() }});

            if (activeDeals) {
                return;
            }

            const randomProducts = await Product.aggregate([
                { $match: { onSaleDate: { $lt: new Date() } } },
                { $sample: { size: 9 } }
            ]);

            const updatedProducts = await Promise.all(randomProducts.map(product =>
                Product.findByIdAndUpdate(product._id, {
                    onSaleDate: new Date(Date.now() + 1000 * 60 * 60 * 23),
                }, { new: true })
            ));

            console.log("Updated products: ", updatedProducts);
        } catch (err) {
            console.error('Error updating products: ', err);
        }
    });
};