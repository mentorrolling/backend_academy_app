const express = require('express')
const app = express()

app.get('/usuarios', function (req, res) {
    res.json('GET usuarios')
})
app.post('/usuarios', function (req, res) {
    // res.json('POST usuarios')

    let body = req.body;

    if (body.usuario === undefined) {

        res.status(400).json({
            ok: false,
            message: 'El usuario es requerido'
        })
    } else {

        res.json({
            body
        })
    }

})
app.put('/usuarios/:id', function (req, res) {
    res.json('PUT usuarios')
})
app.delete('/usuarios/:id', function (req, res) {
    res.json('DELETE usuarios')
})




module.exports = app;
