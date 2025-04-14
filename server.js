const express = require('express')
const cors = require("cors");
const app = express()
const port = 3003
const postsRouter = require('./routers/posts')
const serverError = require('./middleware/serverError')
const notFound = require('./middleware/error_404')

//rgistro il body-parsr pr "application/jason"
app.use(express.json())

// asset statici per le immagini di ogni post
app.use(express.static('public'))

//cors
app.use(cors({origin: 'http://localhost:5173'}));

app.post("/", (req, res) => {
  //dentro req.body troveremo
  //i dati ricevuti in formato json
  console.log(req.body);

})

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
})

app.get('/', (req, res) => {

  res.send('Server del mio blog')
})

app.use("/posts", postsRouter)

//server error
app.use(serverError)

app.get('/', (req, res) => {
  throw new Error('Server Error')
})

//error 404
app.use(notFound)