const mongoose = require('mongoose');


 const connectToDB=async()=>{

    if (mongoose.connection.readyState === 1) {
        console.log("the db is already connected");
        return;
    }
    const MONGODB_URI=process.env.MONGODB_URI


    try{
        await mongoose.connect(MONGODB_URI,{
            dbName:"portfolioBuilder",
        });
        console.log("db connected succesfully")
    }catch(e){
        console.log(e);
    }

    
}

module.exports= connectToDB;