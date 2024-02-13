const express= require('express');
const mongoose= require('mongoose');
const {searchProduct, filterProduct, update } = require('./controllers/product.controller');
const dotenv= require('dotenv').config();
const cors= require('cors');
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Connected"))
.catch(err=>console.log(err))

const app= express();
app.use(express.json())
app.use("/uploads",express.static("uploads"));
app.use(cors());

app.use('/api/product',require('./routes/product.route'))
app.get('/api/searchproduct',searchProduct)
app.get('/api/filterproduct/',filterProduct)
app.put('/api/update/:id',update)

app.listen(process.env.PORT,()=>{
    console.log("Server Started");
})