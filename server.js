const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const axios = require('axios');
const app = express();
const mtgSDK = require('mtgsdk');

// Sets EJS as the view engine
app.set('view engine', 'ejs');

// Enables EJS Layouts middleware
app.use(ejsLayouts);
app.use(require('morgan')('dev'));

//Routes
app.get('/', (req, res) =>{
  res.render('index');
});

//results
  // primary search tool to whos view /controller make a partial
app.get('/results', (req, res) =>{
  // let queryTerm= req.query;
  //I basically hacked this from OMDB you want to check your api to see what kind of search parameters you can get or add to the argument. for my magic API i know name is something i can specifiy
  // console.log(queryTerm)
//search query types
  //multiversid
  //name
  //color
  let mtgURLname = `https://api.magicthegathering.io/v1/cards?name=${req.query.name}&page=1&pageSize=20`;
  let mtgURLmultiverseid = `https://api.magicthegathering.io/v1/cards?multiverseid=${req.query.name}&page=1&pageSize=20`;
  // let mtgURLcolor = `https://api.magicthegathering.io/v1/cards?name=${req.query.name}&page=1&pageSize=20`;
  // fix let mtgURLtype = `https://api.magicthegathering.io/v1/cards?name=${req.query.name}&page=1&pageSize=20`;
  // fix let mtgURLset = `https://api.magicthegathering.io/v1/cards?name=${req.query.name}&page=1&pageSize=20`;
  
  // Multiverse Id Card Type queries 
  //creature (leg)
  // winota multiverse id
  // 479736

//creature
// narset IKO
// 479715

//sourcery 

//instant

//enchantment

//planeswalker

  axios.get(mtgURLmultiverseid).then(response => {
    // var mtg = response.data
    // console.log(req.params);
    console.log(req.query.name);
    // console.log(response);
    // console.log(response.data);
//results view
  res.send(response.data);
  // res.render('cards', {data: response.data})
  }).catch(err =>{
    console.log(err);
  });
})




app.listen(3000);

// module.exports = server;