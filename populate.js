require('dotenv').config();
const connectDB=require('./db/connect');
const product=require('./models/product')
const productlist=require('./products.json')

const start = async () =>{
    try
    {
        await connectDB(process.env.MONGODB_URL);
        await product.create(productlist);
        console.log("SUCCESS!!!!");
        process.exit(0);
    }
    catch(error)
    {
        console.log(error);
        process.exit(1);
    }
}

start();