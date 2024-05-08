const express = require("express")
const app = express()
const mysql = require("mysql")
const cors = require("cors")
const bcrypt = require("bcrypt")
const saltRounds = 10

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

  db.query("SELECT * FROM usuarios WHERE email = ?;", [email], (err, result) => {
    if (err) res.send(err) 
    if (result.length == 0) {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        db.query("INSERT INTO usuarios ( email, password ) VALUES ( ?,? )", [email, hash], 
          (err, result) => {
            if (err) res.send(err)
            else res.send({ msg: "Cadastrado com sucesso!" })
        })
      })
      
    }
    else res.send({ msg: "Já existe um email cadastrado" })
  })
})

app.post("/login", (req, res) => {
  const email = req.body.email
  const password = req.body.password

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
    if (err) res.send(err)
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (err, result) => {
        if(result) res.send({ msg: "Usuário logado" })
        else res.send({ msg: "A senha está incorreta" })
      })      
    }
    else res.send({ msg: "Usuário não encontrado" })
  })
})

app.listen(8080, () => {
  console.log("Rodando na porta 8080")
})