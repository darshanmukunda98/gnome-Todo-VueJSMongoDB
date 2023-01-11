async function fetchAllTodos() {
  let response = await (await fetch('http://localhost:3000/')).json();
  console.log(response);
}
async function insertTodo(todo) {
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
}
async function updateTodo(id, body) {
  let response = await (
    await fetch('http://localhost:3000/update/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body)
    })
  ).json();
  console.log(response);
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
updateTodo('63be93baf728db150ff01855', {
  title: 'Todo 11',
  done: true,
  notes: '',
  date: '',
  priority: 'none',
  deleted: false
});
