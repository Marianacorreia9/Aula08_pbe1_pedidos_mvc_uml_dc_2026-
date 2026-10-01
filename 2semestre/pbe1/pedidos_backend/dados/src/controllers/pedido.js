const pedidos = require("../../pedidos.json")
const itens = require("../../itens.json")

function calcTotais() {

    pedidos.forEach(pedido => {

        const itensDoPedido = itens.filter(
            item => Number(item.pedido_id) === Number(pedido.id)
        )

        pedido.total = itensDoPedido.reduce(
            (total, item) => {
                return total + (Number(item.preco) * Number(item.quantidade))
            },
            0
        )
    })
}

const criar = (req, res) => {

    const dados = req.body

    dados.id = Number(pedidos[pedidos.length - 1].id) + 1

    pedidos.push(dados)

    res.status(201).json(dados)
}

const listar = (req, res) => {

    calcTotais()

    res.json(pedidos)
}

const alterar = (req, res) => {

    const id = Number(req.params.id)

    const indice = pedidos.findIndex(
        pedido => Number(pedido.id) === id
    )

    if (indice === -1) {

        return res.status(404).json({
            mensagem: "Pedido não encontrado"
        })
    }

    pedidos[indice] = {
        ...pedidos[indice],
        ...req.body,
        id: pedidos[indice].id
    }

    res.json(pedidos[indice])
}

const excluir = (req, res) => {

    const id = Number(req.params.id)

    const indice = pedidos.findIndex(
        pedido => Number(pedido.id) === id
    )

    if (indice === -1) {

        return res.status(404).json({
            mensagem: "Pedido não encontrado"
        })
    }

    const pedidoExcluido = pedidos.splice(indice, 1)

    res.json(pedidoExcluido[0])
}

module.exports = {
    criar,
    listar,
    alterar,
    excluir
}