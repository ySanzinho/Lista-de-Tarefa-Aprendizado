const localStorageKey = 'to-do-list'

function newTask() {
  let input = document.getElementById('input-new-task')
  // validation
  if(!input.value) {
    alert('Digite algo para inserir na sua lista.')
  }
  else if(validateNewTask()) {
    alert('Já existe uma task com essa descrição!')
  }
  else {
    // increment to localStoreage
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    values.push({
      name: input.value
    })
    localStorage.setItem(localStorageKey, JSON.stringify(values))
    showValues()
  }
  input.value = ''
}
addEventListener('keydown', function(evento) {
  if (evento.key === 'Enter') {
    evento.preventDefault();
    newTask();
  }
})

function validateNewTask() {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  let inputValue = document.getElementById('input-new-task').value
  let exists = values.find(x => x.name == inputValue)
  return !exists ? false : true
}

function showValues() {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  let list = document.getElementById('to-do-list')
  list.innerHTML = ''
  for(let i = 0; i < values.length; i++) {
    list.innerHTML += `<li>${values[i]['name']}<button id='btn-ok' onclick='removeItem("${values[i]['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg></button></li>`
  }
}

function removeItem(data) {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  let index = values.findIndex(x => x.name == data)
  values.splice(index,1)
  localStorage.setItem(localStorageKey, JSON.stringify(values))
  showValues()
}
showValues()