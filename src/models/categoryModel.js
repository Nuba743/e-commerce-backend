const mongoose=require("mongoose");
const categorySchema=mongoose.Schema({
    name:String,
    icon:String,//images ka url toh string he hota h na
    subcategory:{
        type:[],
        default:[],
    },
},{timestamps:true},);

const categoryModel=mongoose.model("category",categorySchema);
module.exports=categoryModel;