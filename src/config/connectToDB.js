const mongoose=require("mongoose");
const DB_URL=process.env.MONGO_URI || "mongodb://localhost:27017/clothing-e-commerce";
//will get from .env file
async function connectToDB(){
    try{
        await mongoose.connect(DB_URL);
        console.log("✅ Connected to DB...");
    }
    catch(err){

        console.log("❌ Error Occured while Connecting To DB...");
        console.log("Error",err);
    }
    
}
module.exports=connectToDB;