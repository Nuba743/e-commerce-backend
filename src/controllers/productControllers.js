const Product=require ("../models/productsModel");
async function getAllProducts(req,res) {
    //PAGINATION
    let page=1;//by default =1//agr hmne page ar limit me koi value ni pass kre toh by default it will be 1 or 8
    let limit=8;//by default =8

    if(req.query?.page){//agr req.query se hme page mil rha h
        page=parseInt(req.query.page);//is page wle var me aa jayega ,jo hme page no. mil rha h (integer part get)
    }
    if(req.query?.limit){//agr req.query se limit mil rhe h
        limit=parseInt(req.query?.limit);//toh limit wle var me hme mil jyega ,jo limit ki value mile h ...uska integer part
    }
    const data=await Product.find({})
    .skip((page-1) * limit)
    .limit(limit);
    const total=await Product.countDocuments();//total products
    const totalPages=Math.ceil(total/limit);//what are the total pages
    const isNextPage=page<totalPages;//how to find that this is the last page or after this page there is some other page
    const isPrevPage=page<1;//how to find that before page 1 u can't move for prev page
    return res.send({success:true,
        message:`${total }Products Found`,
        data:data,
    pagination:{total,totalPages,page,limit,isNextPage,isPrevPage},
});
    
}


async function getSingleProduct(req,res) {
    const productId =req.params.productId;
    //findById
    const productData= await Product.findById(productId);
    if(!productData){
        return res.status(404).send({
            success:false,mesaage:"Product not found."
        });
    }
    return res.send({success:true,message:"Product Data",data:productData});

}  

async function addProduct(req,res) {
    const data=req.body;
    const{title,description,price,category,subcategory,discount,stock,features,variants}=data;
    const images=req.files?.map((file) =>file.filename) || [];
    const productData=new Product({title,description,price,category,subcategory,discount,stock,features,variants,images,});
        const newProductData=await productData.save();
        return res.send({success:true,message:"Product Added Successfully",data:newProductData,});
    }

async function updateProduct(req,res) {
     const data=req.body;
        const{title,description,price,category,subcategory,discount,stock,features,variants,productId,oldImages}=data;
        const newImages=req?.files?.map((file) =>file.filename);//jo images update ni krne h usko oldimages me bhej do ar jis image ko uodate krna h wo newimages me bhej do
        const images=[...oldImages,...newImages]//oldImages+newImages=images,...oldImages means all images in it
        const updatedProductData =await Product.findByIdAndUpdate(productId,{
            title,description,price,category,subcategory,discount,stock,features,variants,images,
        });
        return res.send({success:true,message:"Product Updated Successfully",data:updatedProductData});
        }


async function deleteProduct(req,res) {
    const data=req.body;
    const{ productId }=data;
    await Product.findByIdAndDelete(productId);
    return res.send({success:true,message:"Product Deleted Successfully"});

}


module.exports={getAllProducts,getSingleProduct,addProduct,updateProduct,deleteProduct};