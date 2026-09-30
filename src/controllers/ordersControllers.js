const Order=require("../models/ordersModel")
async function getAllOrders(req,res){
    const allOrders=await Order.find({});
    return res.send({
        success:true,
        message:"Success",
        data:allOrders,
    });
    
}

async function getUserOrders(req,res){
    const userData=req.user;
    const userId=userData._id;
    const userOrders=await Order.find({userId:userId}).populate("items");
    return res.send({
        success:true,message:"Success",
        data:userOrders,
    });
}

async function createOrder(req,res){
    const userData=req.user;//will get userData
    const userId=userData._id;//will get userId
    const data=req.body//all(userData,userId) this info will get from req.body
        const{items,ShippingAddress,totalOrderValue,paymentStatus,paymentMode,}=data;//data me se required cheezo ko destructure kr denge//orderstatus by default pending
        const newOrder=new Order({userId,items,shippingAddress,totalOrderValue,paymentMode,paymentStatus,deliveredAt:null,});//create new order
        const newOrderData=await newOrder.save();
        res.send({success:true,message:"Order Placed Successfully",data:newOrderData,});
    }
    


async function updateOrder(req,res){
    const data=req.body;
    const{orderId, status}=data;
    let deliveredAt=null;
    if(status=="delivered"){
        deliveredAt=Date.now();
    }
       
        const updatedOrderData =await Order.findByIdAndUpdate(OrderId,{
           orderStatus:status,
           deliveredAt,
        });
        return res.send({success:true,message:"Order Status Updated",data:updatedOrderData,});
        }
    

module.exports={getAllOrders,getUserOrders,createOrder,updateOrder};