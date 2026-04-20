import mongoose from "mongoose";

const connection = async ()=>{
  mongoose.set('strictQuery', true);
    return await mongoose.connect(process.env.DB_URL)
    .then(()=> console.log(`connected on ...... `))
    .catch(err=>console.log(`fail to connect `))
}

export default connection;
