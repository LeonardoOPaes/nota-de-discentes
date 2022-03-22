const inputNome = document.querySelector('#inserir-nome')
const inputNota1 = document.getElementById('nota1')
const inputNota2 = document.getElementById('nota2')
const inputNota3 = document.getElementById('nota3')
const btnEnviar = document.getElementById('Enviar')
const tabela = document.querySelector('#tabela-alunos')
const btnLimpar = document.querySelector('#Limpar')
const tr = document.getElementsByTagName("tr")
let btns = document.getElementsByTagName('button')

const localStorageTransactions = JSON.parse(localStorage.getItem('discentes'))
arraydiscentes = localStorage.getItem('discentes') !== null ? localStorageTransactions : []

const updateLocalStorage = () => {
    localStorage.setItem('discentes', JSON.stringify(arraydiscentes))
}

let arraydados = [...arraydiscentes]
arraydados.forEach((element) => {
    criarElementos(element.nome, element.nota1, element.nota2, element.nota3, element.media)
});

btnDeletar(btns)

function btnDeletar(params) {
    Array.from(params).forEach(element => {
        if (element.getAttribute("id") === "excluir") {
            element.addEventListener('click', deletar)
        }
    });
}

function adicionarDiscente() {
    if (inputNome.value != "" && inputNota1.value != "" && inputNota2.value != "" && inputNota3.value != "") {
        let discente = {
            nome: inputNome.value,
            nota1: parseFloat(inputNota1.value),
            nota2: parseFloat(inputNota2.value),
            nota3: parseFloat(inputNota3.value),
            media: media(parseFloat(inputNota1.value), parseFloat(inputNota2.value), parseFloat(inputNota3.value))
        }
        gerarArrayDiscentes(discente)
        criarElementos(discente.nome, discente.nota1, discente.nota2, discente.nota3, discente.media)
        limparClasses()
        Limpar()
        btnDeletar(btns)
        inputNome.focus()
    } else {
        alert('Preencha os Campos!')

        if (inputNome.value == "") {
            inputNome.classList.add('preencher')
        }
        if (inputNota1.value == "") {
            inputNota1.classList.add('preencher')
        }
        if (inputNota2.value == "") {
            inputNota2.classList.add('preencher')
        }
        if (inputNota3.value == "") {
            inputNota3.classList.add('preencher')
        }
    }
}

function gerarArrayDiscentes(discentes) {
    arraydiscentes.push(discentes)
    console.log(arraydiscentes)
    return arraydiscentes

}

function limparClasses() {
    inputNome.classList.remove('preencher')
    inputNota1.classList.remove('preencher')
    inputNota2.classList.remove('preencher')
    inputNota3.classList.remove('preencher')
}

function Limpar() {
    inputNome.value = ""
    inputNota1.value = ""
    inputNota2.value = ""
    inputNota3.value = ""
    limparClasses()
    inputNome.focus()
}

function media(n1, n2, n3) {
    return (n1 + n2 + n3) / 3
}

function criarElementos(nome, nota1, nota2, nota3, media) {
    const tr = document.createElement('tr')
    const td = document.createElement('td')
    tabela.appendChild(tr)
    tr.innerHTML = `
    <td class="nome">${nome}</td>
    <td class="nota">${nota1}</td>
    <td class="nota">${nota2}</td>
    <td class="nota">${nota3}</td>
    <td class=${media < 6 ? "reprovado" : "aprovado"}>${media.toFixed(1)}</td>
    <td><button id="excluir" data-action>X</button></td>
    `
    updateLocalStorage()
}

function deletar(e) {
    console.log(e)
    let index = e.target.parentNode.parentNode  
    let trs = [...tr].indexOf(index) - 1
    arraydiscentes.splice(trs, 1)
    e.target.parentNode.parentNode.remove()
    updateLocalStorage()
}

btnEnviar.addEventListener('click', adicionarDiscente)
btnLimpar.addEventListener('click', Limpar)
