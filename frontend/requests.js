export async function fetchAllTodos() {
  let response = await (await fetch('http://localhost:3000/todos')).json();
  return response;
}
export async function insertTodo(todo) {
  let response = await (
    await fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(todo)
    })
  ).json();
  console.log(response);
  return response;
}
export async function updateTodoById(id, body) {
  let response = await (
    await fetch('http://localhost:3000/todos/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body)
    })
  ).json();
  console.log(await response)
  return response;
}

export async function deleteTodoById(id) {
  let response = await (
    await fetch('http://localhost:3000/todos/' + id, {
      method: 'DELETE'
    })
  ).json();
  console.log(response);
  return response;
}

export async function markAllDone() {
    await fetch('http://localhost:3000/todos/all/check', {
      method: 'PUT'
    })
}
