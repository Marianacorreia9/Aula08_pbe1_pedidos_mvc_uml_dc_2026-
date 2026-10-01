const clientes = require("../../clientes.json")

const criar = (req, res) => {

    const dados = req.body

    dados.id = Number(clientes[clientes.length - 1].id) + 1

    clientes.push(dados)

    res.status(201).json(dados)

}

const listar = (req, res) => {

    res.json(clientes)

}

const alterar = (req, res) => {

    const id = Number(req.params.id)

    const indice = clientes.findIndex(cliente => Number(cliente.id) === id)

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Cliente não encontrado"
        })
    }

    clientes[indice] = {
        ...clientes[indice],
        ...req.body,
        id: clientes[indice].id
    }

    res.json(clientes[indice])

}

const excluir = (req, res) => {

    const id = Number(req.params.id)

    const indice = clientes.findIndex(cliente => Number(cliente.id) === id)

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Cliente não encontrado"
        })
    }

    const clienteExcluido = clientes.splice(indice, 1)

    res.json(clienteExcluido[0])

}

module.exports = {
    criar,
    listar,
    alterar,
    excluir
}