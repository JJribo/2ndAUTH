//Needs to donwload
/*cors dotenv express jsonwebtoken mercedlogger mongoose morgan nodemailer nodemon*/


require("dotenv").config()
const express = require("express") 
const morgan = require("morgan")
const {log} = require("mercedlogger")
const cors = require("cors")
const UserRouter = require("./controllers/User")
const TodoRouter = require("./controllers/Todo")
const bodyParser = require("body-parser")


const {PORT = 3000} = process.env


const app = express()


app.use(cors())
app.use(morgan("tiny"))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())


app.get("/", (req, res) => {
    res.send("this is the test route to make sure server is working")
})
app.use("/user", UserRouter)
app.use("/todos", TodoRouter)

app.listen(PORT, () => log.green("SERVER STATUS", `Listening on port ${PORT}`))