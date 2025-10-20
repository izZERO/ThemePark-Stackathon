const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const PORT = process.env.PORT || 3001

const db = require("./db")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan("dev"))

app.listen(PORT, () => {
  console.log(`Express Server Running on Port`, PORT, `. . .`)
})
