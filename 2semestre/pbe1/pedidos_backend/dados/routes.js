const express = require("express")

const router = express.Router()

const Cliente = require("./src/controllers/cliente")
const Pedido = require("./src/controllers/pedido")
const Produto = require("./src/controllers/produto")
const Item = require("./src/controllers/item")

const rotaInicial = (req, res) => {
    res.json("Pedidos MVC respondendo")
}

router.get("/", rotaInicial)

router.get("/clientes", Cliente.listar)
router.get("/pedidos", Pedido.listar)
router.get("/produtos", Produto.listar)
router.get("/itens", Item.listar)

router.post("/clientes", Cliente.criar)
router.post("/pedidos", Pedido.criar)
router.post("/produtos", Produto.criar)
router.post("/itens", Item.criar)

router.patch("/clientes/:id", Cliente.alterar)
router.patch("/pedidos/:id", Pedido.alterar)
router.patch("/produtos/:id", Produto.alterar)
router.patch("/itens/:id", Item.alterar)

router.delete("/clientes/:id", Cliente.excluir)
router.delete("/pedidos/:id", Pedido.excluir)
router.delete("/produtos/:id", Produto.excluir)
router.delete("/itens/:id", Item.excluir)

module.exports = router