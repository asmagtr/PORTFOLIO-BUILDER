const mongoose=require("mongoose");
const connectToDB = async(url)=>{
    try{
        await mongoose.connect(url, {
            dbName: "portfolioBuilder",
          });
    
        console.log("connected to the databse");
    }catch(error){
        console.log(error)
    }


}

module.exports=connectToDB;