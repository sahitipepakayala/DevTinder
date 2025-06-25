const mongoose=require('mongoose');

const connect=async()=>{
  await  mongoose.connect("mongodb+srv://pepakayalasahiti23:zCE0rLQopMFeRxng@namastenode.e3lodm5.mongodb.net/")

}
module.exports={connect}