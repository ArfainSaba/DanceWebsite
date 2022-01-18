const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
const res = require("express/lib/response");

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactdance');
}
const port = 80;

// define mongo schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email:String,
    address:String,
    desc:String
  });

  const contact = mongoose.model('contact', contactSchema);

//express specific stuff
//first serve static files
//app.use(express.static('static'))
app.use('/static',express.static('static')) //for serving static files
app.use(express.urlencoded())

//PUG SPECIFIC STUFF
app.set('view engine','pug') //set the templet engine as pug
app.set('views',path.join(__dirname,'views'))//set the views directory

//ENDPOINTS
app.get('/',(req,res)=>{
    const params ={ }
    res.status(200).render('home.pug',params);
})
app.get('/contact',(req,res)=>{
  const params ={ }
  res.status(200).render('contact.pug',params);
})

app.post('/contact',(req,res)=>{
   var mydata= new contact(req.body);
   mydata.save().then(()=>{
    res.send("this item has been saved to the db")
}).catch(()=>{
    res.status(400).send("item was not saved to data base")
});
// res.status(200).render('contact.pug');
})



//START THE SERVER
app.listen(port,()=>{
    console.log(`the application started successfully on port ${port}`)
});

