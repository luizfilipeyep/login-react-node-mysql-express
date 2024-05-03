const express = require("express")
const app = express()
const mysql = require("mysql")

const db = mysql.createPool(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "users"
  }
)


app.use(express.json())
app.use(cors())


app.post("/register", (req, res) => {
  const email = req.body.email
  const password = req.body.password
})


app.listen(8080, () => {
  console.log("Rodando na porta 8080")
})