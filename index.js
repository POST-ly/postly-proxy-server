/** require dependencies */
const express = require("express")
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const path = require('path')
const axios = require("axios")

const log = console.log
const app = express()

let port = 4000 || process.env.PORT

/** set up middlewares */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(helmet())

app.get("/proxy", (req, res) => {
    var url = req.param('proxyUrl')
    log(url)
    axios({
        url,
        method: "GET"
    }).then(response => {
        log(response.data)
        res.json(response.data);
    }).catch(err => {
        res.status(500).json({ type: 'error', message: err.toString() });
    })
});

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, './index.html'));
});

/** start server */
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});