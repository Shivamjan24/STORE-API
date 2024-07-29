const mongoose=require('mongoose');

const product=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please provide some value for name"]
    },
    price:{
        type:Number,
        required:[true,"please provide some value for price"]
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:4.5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    company:{
        type:String,
        enum:{
            values:['ikea', 'liddy', 'caressa', 'marcos'],
            message:"invalid company name"
        }
    }
})

module.exports=mongoose.model('product',product)