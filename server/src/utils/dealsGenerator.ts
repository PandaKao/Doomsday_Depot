import cron from "node-cron";
import { Product } from "../models/index.js";

export const dealsUpdate = () => {
    cron.schedule('0 0 * * *', async () => {
        console.log("cron running every day");

        try {
            const expiredProducts = await Product.find({ onSaleDate: { $lt: new Date() } });
            const randomProducts = await Product.aggregate([
                { $match: { onSaleDate: { $lt: new Date() } } },
                { $sample: { size: 9 } }
            ]);

            const updatedProducts = await Promise.all(randomProducts.map(product =>
                Product.findByIdAndUpdate(product._id, {
                    onSaleDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
                }, { new: true })
            ));

            console.log("Updated products: ", updatedProducts);
        } catch (err) {
            console.error('Error updating products: ', err);
        }
    });
};