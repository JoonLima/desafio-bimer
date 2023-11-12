const COLUNAS_TABELA_CLIENTE = [
    { text: "Código", value: "id" },
    { text: "Nome", value: "nome" },
    { text: "CPF / CNPJ", value: "cpfOuCnpj" },
    { text: "E-mail", value: "email" },
    { text: "Telefone", value: "telefone" },
    { text: "Data cadastro", value: "dataCadastro" },
    { text: "Actions", value: "actions", sortable: false },
]

const COLUNAS_TABELA_PRODUTO = [
    { text: "Código", value: "id" },
    { text: "Nome", value: "nome" },
    { text: "Valor", value: "valor" },
    { text: "Quantidade", value: "quantidadeEstoque" },
    { text: "Observação", value: "observacao" },
    { text: "Data cadastro", value: "dataCadastro" },
    { text: "Actions", value: "actions", sortable: false },
]


export {
    COLUNAS_TABELA_CLIENTE,
    COLUNAS_TABELA_PRODUTO
}