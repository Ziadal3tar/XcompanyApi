import mongoose from "mongoose";

const connection = async ()=>{
  mongoose.set('strictQuery', true);
    return await mongoose.connect("mongodb+srv://ziad:00241300@cluster0.bxnbg.mongodb.net/Company")
    .then(()=> console.log(`connected on ...... `))
    .catch(err=>console.log(`fail to connect `))
}

export default connection;
