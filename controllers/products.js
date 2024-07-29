const product=require('../models/product')

const getproductsstatic= async (req,res)=>{
    res.status(200).send("this is static path");
}

const getproducts= async (req,res)=>{
    const {feature,company,nam,sort,fields,numericfilter}=req.query;
    const queryobject={};
    if(feature)
    {
        queryobject.featured=feature==='true' ? true : false;
    }
    if(company)
    {
        queryobject.company=company;
    }
    if(nam)
    {
        queryobject.name=nam;
    }
    if(numericfilter)
    {
        const opmap={
            ">":"$gt",
            "<":"$lt",
            ">=":"$gte",
            "<=":"$lte",
            "=":"$eq"
        }
        const reg=/\b(>|>=|=|<=|<)\b/g;
        let filt=numericfilter.replace(reg,(match)=>`-${opmap[match]}-`)
        const options=['price','rating']
        filt.split(",").forEach((element) => {
            const [fie,op,val]=element.split("-")
            if(options.includes(fie))
            {
                queryobject[fie] = { [op]: Number(val) };
            }
        });       
    }
    let sortList ='createdAt';
    if (sort) 
    {
        sortList = sort.split(',').join(' ');
    } 
    let field;
    if(fields)
    {
        field=fields.split(',').join(' ');
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let result=await product.find(queryobject).sort(sortList).select(field).skip(skip).limit(limit);

    
    res.status(200).json({msg:"success",data:{result},nbhits:result.length});
}

module.exports={getproducts,getproductsstatic};