 const mongoose =require("mongoose")

 mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology:true
 })

 .then(()=> {
    console.log("basarıyla verıtabanına bağlandı")
 })
 .catch((err)=>{
    console.log("verıtabanına bağlanırken hata çıktı:", err);
 })