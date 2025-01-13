import { Product } from "../models/index.js";

const dealsUpdate = async () => {

    console.log("Starting deals update...");

    try {
        const expiredProducts = await Product.find({ onSaleDate: { $lt: new Date() } });
        const randomProducts = expiredProducts.sort(() => 0.5 - Math.random()).slice(0, 9);

        const updatedProducts = await Promise.all(randomProducts.map(product =>
            Product.findByIdAndUpdate(product._id, {
                onSaleDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
            }, { new: true })
        ));

        console.log("Updated products: ", updatedProducts);
        process.exit(0);
    } catch (err) {
        console.error('Error updating products: ', err);
        process.exit(1);
    }
};

dealsUpdate();