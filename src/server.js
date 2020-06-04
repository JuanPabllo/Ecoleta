const express = require("express")
const server = express()


// Configurar pasta publica
server.use(express.static("public"))


//Ultilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


// Configurar caminhos da nossa aplicação
// Página inicial
// req: requisição
// res: Resposta
server.get("/", (req, res) => {
    return res.render("index.html", {
        title: "Um titulo"
    })
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.get("/search", (req, res) => {
    return res.render("search-results.html")
})


//Ligar o servidor
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);
// server.listen(3000)