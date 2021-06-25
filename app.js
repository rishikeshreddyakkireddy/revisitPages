const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/revistpages",{ useUnifiedTopology: true ,useNewUrlParser: true});

app.use(express.static('public'));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');


const pagesSchema = new  mongoose.Schema({
    title : String,
    link : String,
    description : String
})

const Page = mongoose.model('Page', pagesSchema);

app.get('/',(req,res) => {
    Page.find({},(err,pages)=>{
        if(!err){
            res.render('index',{pages: pages});
        }
    })
})

app.post('/',(req,res) => {
    const title = req.body.title;
    const description = req.body.description;
    const link = req.body.link;
    Page({
        title : title,
        description : description,
        link : link
    }).save()
    res.redirect("/");
})

app.post('/delete',(req, res)=>{
    Page.deleteOne({_id: req.body.id},(err)=>{
        if(!err){
            res.redirect("/");
        }
    })
})

app.listen(3000,()=>{
    console.log("listening on port 3000");
});

