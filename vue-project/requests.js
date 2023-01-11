async function fetchAllTodos(){
    let response = (await (await fetch('http://localhost:3000/')).json())
    console.log(response)
}

fetchAllTodos()