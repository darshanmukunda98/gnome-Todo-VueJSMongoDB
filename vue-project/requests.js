export async function fetchAllTodos() {
  let response = await (await fetch('http://localhost:3000/')).json();
  //console.log(response)
  return response
  
}
export async function insertTodo(todo) {
  let response = await (
    await fetch('http://localhost:3000/insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(todo)
    })
  ).json();
  console.log(response);
  return response
}
export async function updateTodo(id, body) {
  let response = await (
    await fetch('http://localhost:3000/update/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body)
    })
  ).json();
  //console.log(response);
  return response
}
export async function updates(body){
  console.log(body)
  let response = await (
    await fetch('http://localhost:3000/updates/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body)
    })
  ).json();
  //console.log(response);
  return response
}
export async function deleteTodo(id) {
  let response = await (
    await fetch('http://localhost:3000/delete/' + id, {
      method: 'DELETE'
    })
  ).json();
  console.log(response);
  return response
}
export async function markAllDone() {
  let response = await (
    await fetch('http://localhost:3000/done/', {
      method: 'PUT'
    })
  ).json();
  console.log(response);
  return response
}
//fetchAllTodos();
/* insertTodo({
  title: 'Todo 11',
  done: true,
  notes: '',
  date: '',
  priority: 'none',
  deleted: false
}); */
/* updateTodo('63be93baf728db150ff01855', {
  title: 'Todo 11',
  done: true,
  notes: '',
  date: '',
  priority: 'none',
  deleted: false
}); */
/* deleteTodo('63be9414f728db150ff01857') */
//markAllDone();
