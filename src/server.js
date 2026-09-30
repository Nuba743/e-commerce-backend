const express=require("express");
const path=require("path");
const dotenv=require("dotenv");
dotenv.config();//so that we can access .env file's variable here
const cors=require("cors");
const connectToDB = require("./config/connectToDB");
const authRoutes=require("./routes/authRoutes");
const categoryRoutes=require("./routes/categoryRoutes");
const productRoutes=require("./routes/productRoutes")
const orderRoutes=require("./routes/orderRoutes")
const cookieParser=require("cookie-parser");
const app=express();
app.use(
    "/uploads",
    express.static(path.join(__dirname, "../uploads"))
)
connectToDB();//call connect to db



app.use(express.json());//so that data come from json 
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,

}),
);


app.get("/health",(req,res)=>{
    res.send("Server is Running Perfectly...");
});

app.use("/api/v1/auth",authRoutes);//POST :http://localhost:4000/api/v1/auth/register
app.use("/api/v1/category",categoryRoutes);//GET: http://localhost:4000/api/v1/category, //POST :http://localhost:4000/api/v1/category, 
//PUT: http://localhost:4000/api/v1/category, //DELETE :http://localhost:4000/api/v1/category
app.use("/api/v1/products",productRoutes);
app.use("/api/v1/orders",orderRoutes);

const PORT=process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log(`Server Started! \nAccess At: http://localhost:${PORT}/health`);
});