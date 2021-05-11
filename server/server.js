const express = require('express')
const mongoose = require('mongoose');
// const bodyParser = require('body-parser')
require('./config/config')
const app = express()


// app.use(bodyParser.urlencoded({ extended: false }))

// // parse application/json
// app.use(bodyParser.json())

//Reemplazo del body-parse

app.use(express.urlencoded({
    extended: true
}));

// app.get('/usuarios', function (req, res) {
//     res.json('GET usuarios')
// })
// app.post('/usuarios', function (req, res) {
//     // res.json('POST usuarios')

//     let body = req.body;

//     if (body.usuario === undefined) {

//         res.status(400).json({
//             ok: false,
//             message: 'El usuario es requerido'
//         })
//     } else {

//         res.json({
//             body
//         })
//     }

// })
// app.put('/usuarios/:id', function (req, res) {
//     res.json('PUT usuarios')
// })
// app.delete('/usuarios/:id', function (req, res) {
//     res.json('DELETE usuarios')
// })
app.use(require('./rutas/usuario'))

/*
Mongoose es una herramienta de modelado de objetos de MongoDB diseñada para funcionar en un entorno asincrónico. Mongoose admite tanto promesas como devoluciones de llamada.
*/
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
},(err, res)=>{
    if(err) throw err;
    console.log('Base de datos online')
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto ', process.env.PORT)
})