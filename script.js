const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const nomeDoPorto = document.querySelector('#m-nome')
const localizacaoDoPorto = document.querySelector('#m-localizacao')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    nomeDoPorto.value = itens[index].nome
    localizacaoDoPorto.value = itens[index].localizacao
    id = index
  } else {
    nomeDoPorto.value = ''
    localizacaoDoPorto.value = ''
  }
  
}

function editItem(index) {
  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBancoDados()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.localizacao}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (nomeDoPorto.value == '' || localizacaoDoPorto.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = nomeDoPorto.value
    itens[id].localizacao = localizacaoDoPorto.value
  } else {
    itens.push({'nome': nomeDoPorto.value, 'localizacao': localizacaoDoPorto.value, })
  }

  setItensBancoDados()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBancoDados = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
