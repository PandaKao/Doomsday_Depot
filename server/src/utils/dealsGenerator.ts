import cron from "node-cron";
import { Product } from "../models/index.js";

export const dealsUpdate = () => {
    cron.schedule('* * * * *', async () => {
        console.log("cron running every minute");

        try {
            const expiredProducts = await Product.find({ onSaleDate: { $lt: new Date() } });
            const randomProducts = expiredProducts.sort(() => 0.5 - Math.random()).slice(0, 9);

            const updatedProducts = await Promise.all(randomProducts.map(product =>
                Product.findByIdAndUpdate(product._id, {
                    // onSaleDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
                    onSaleDate: new Date(Date.now() + 1000 * 60),
                }, { new: true })
            ));

            console.log("Updated products: ", updatedProducts);
        } catch (err) {
            console.error('Error updating products: ', err);
        }
    });
};