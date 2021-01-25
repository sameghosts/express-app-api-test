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
  
  // console.log(queryTerm)
//search query types
  //multiversid
  //name
  //color
  let mtgURL = `https://api.magicthegathering.io/v1/cards?${req.query.select}=${req.query.value}&page=1&pageSize=20`;
  
  

  axios.get(mtgURL).then(response => {
  // axios.get(mtgURLmultiverseid).then(response => {
    //lol quickchange
    let valueSel;
    // let getOption =  () => {
    //   // selectElement= document.querySelector('#selectpick');
    //   valueSel = selectElement.options[selectElement.selectedIdex].value
    // };
    // getOption();
    // console.log(req.body.select);
    console.log(req.query);
    console.log(req.query.value);
    // console.log(response);
    // console.log(response.data);
//results view
  // res.send(response.data);
  res.render('cards', {data: response.data})
  }).catch(err =>{
    console.log(err);
  });
})

//details route
app.get('/cards/:multiverseId', (req, res) =>{
  console.log(req.params.multiverseId);
  // res.send(req.params.multiverseId);
  let multiIdURL = `https://api.magicthegathering.io/v1/cards?multiverseid=${req.params.multiverseId}`

  axios.get(multiIdURL).then(response => {
    //lol quickchange
    // console.log(response);
    // console.log(response.data);
  // res.send(response.data);
  res.render('details', {data: response.data})
  }).catch(err =>{
    console.log(err);
  });
})



app.listen(3000);

// module.exports = server;