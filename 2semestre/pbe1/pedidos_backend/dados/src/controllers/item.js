const itens = require("../../itens.json")

function calcularSubtotais() {
    itens.forEach(item => {
        item.subtotal = Number(item.preco) * Number(item.quantidade)
    })
}

const criar = (req, res) => {

    const dados = req.body

    dados.id = Number(itens[itens.length - 1].id) + 1

    itens.push(dados)

    res.status(201).json(dados)
}

const listar = (req, res) => {

    calcularSubtotais()

    res.json(itens)
}

const alterar = (req, res) => {

    const id = Number(req.params.id)

    const indice = itens.findIndex(
        item => Number(item.id) === id
    )

    if (indice === -1) {

        return res.status(404).json({
            mensagem: "Item não encontrado"
        })
    }

    itens[indice] = {
        ...itens[indice],
        ...req.body,
        id: itens[indice].id
    }

    res.json(itens[indice])
}

const excluir = (req, res) => {

    const id = Number(req.params.id)

    const indice = itens.findIndex(
        item => Number(item.id) === id
    )

    if (indice === -1) {

        return res.status(404).json({
            mensagem: "Item não encontrado"
        })
    }

    const itemExcluido = itens.splice(indice, 1)

    res.json(itemExcluido[0])
}

module.exports = {
    criar,
    listar,
    alterar,
    excluir
}