<script setup>
import { ref } from 'vue';
import { fetchAllTodos, insertTodo, updateTodoById,deleteTodoById, markAllDone } from '../requests.js';

// let todos = ref(loadData() || []);
let todos = ref([]);
(async()=>{
  todos.value= await loadData()
})()
let reset = '';
let filter = ref();
filter.value = (todo) => {
  return !todo.deleted;
};

const isDone = (todo) => todo.done === true;
let checkAllDone = todos.value.length != 0 && todos.value.every(isDone)

async function loadData() {
  //return JSON.parse(localStorage.getItem('todos')); //getAllTodos
  return await fetchAllTodos()
}

// async function saveData(data) {
//   // localStorage.setItem('todos', JSON.stringify(data));
//   //todos.value = await fetchAllTodos()
// }

function createTodo(title) {
  return {
    title: title,
    done: false,
    notes: '',
    date: '',
    priority: 'none',
    deleted: false
  };
}

function addTodo(event) {
  if (event.target.value === '') return;
  const target = event.target;
  let title = target.value;
  let todo = createTodo(title)
  todos.value.push(todo);
  insertTodo(todo)
   //saveData(todos.value)

}

function saveTodoDetails(e) {
  //console.log(e.target.name)
  //console.log(e.currentTarget.id +"****"+ e.target.value+"****"+e.target.name)
  let id = e.currentTarget.id
  let body = Object.fromEntries(new Map([
  [e.target.name, e.target.value]
]))
  updateTodoById(id, body)
  //saveData(todos.value);
}

function deleteTodo(e) {
  todos.value.find((todo) => todo.id == e.target.id).deleted = true;
  deleteTodoById(e.target.id)
  //saveData(todos.value);
}

function setAllDone(e) {
  todos.value.map((todo) => {
    todo.done = checkAllDone;
  });
  markAllDone()
  //saveData(todos.value);
}

function filterAll() {
  filter.value = (todo) => {
    return !todo.deleted;
  };
  return filter.value;
}

function filterActive() {
  filter.value = (todo) => {
    return !todo.done && !todo.deleted;
  };
}

function filterCompleted() {
  filter.value = (todo) => {
    return todo.done && !todo.deleted;
  };
}
</script>
<template>
  <div class="app">
    <h1>todos</h1>
    <div class="list">
      <span class="todo--input">
        <input type="checkbox" @change="setAllDone" v-model="checkAllDone" />
        <input
          @keydown.enter="addTodo"
          :value="reset"
          class="todo--title--input"
          autofocus
          placeholder="Whats needs to be done?"
        />
      </span>
      <div v-for="(item, index) in todos" :key="item.id">
        <details
          v-if="filter(item)"
          class="todo--item"
          :id="item.id"
          @change="saveTodoDetails"
        >
          <summary class="todo--item--menu" style="">
            <input
              class="todo--item--checkbox"
              type="checkbox"
              name="done"
              v-model="item.done"
            />

            <input
              class="todo--item--title"
              :class="{ done: todos[index].done }"
              v-model="item.title"
              name="title"
            />
            <span class="todo--item--expand">▼</span>

            <button
              class="todo--item--delete"
              :id="item.id"
              @click="deleteTodo"
            >
              ❌
            </button>
          </summary>
          <div class="todo--item--menu--content">
            <div style="display: flex; flex-direction: column">
              <label class="todo--item--notes--label">Notes</label>
              <textarea
                class="todo--item--notes"
                name="notes"
                style="height: 98px; width: 400px"
                v-model="item.notes"
              ></textarea>
            </div>
            <div style="display: flex; flex-direction: column; margin: auto">
              <div style="display: flex; flex-direction: column; padding: 10px">
                <label class="todo--item--date--label">Date</label>
                <input
                  class="todo--item--date"
                  name="date"
                  type="date"
                  v-model="item.date"
                />
              </div>
              <div style="display: flex; flex-direction: column; padding: 10px">
                <label class="todo--item--priority--label">Priority</label>
                <select
                  class="todo--item--priority"
                  name="priority"
                  v-model="item.priority"
                >
                  <option value="none">None</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
          </div>
        </details>
      </div>
      <footer class="footer">
        <span
          >{{
            todos.filter((todo) => !todo.deleted && !todo.done).length
          }}
          items left</span
        >
        <input
          class="footer--button"
          type="button"
          value="All"
          @click="filterAll"
        />
        <input
          class="footer--button"
          type="button"
          value="Active"
          @click="filterActive"
        />
        <input
          class="footer--button"
          type="button"
          value="Completed"
          @click="filterCompleted"
        />
      </footer>
    </div>
  </div>
</template>
<style scoped>
.app {
  display: flex;
  flex-direction: column;
  font-family: sans-serif;
  align-items: center;
}
.app h1 {
  font-size: 100px;
  font-weight: 100;

  color: rgb(255, 100, 100);
}
.list {
  /* border: 1px solid grey; */
  /*   box-shadow: 5px 5px grey; */
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  width: 600px;
}

.todo--input {
  display: flex;
  height: 40px;
  width: 100%;
  padding: 5px 0;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(190, 190, 190);
}

.todo--title--input {
  width: 100%;
  border-style: solid;
  border-width: 1px;
  font-size: large;
  font-style: italic;
}
.todo--item {
  display: flex;
  height: 40px;
  padding: 5px 0;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(190, 190, 190);
  height: auto;
}

.todo--item--menu {
  display: flex;
  /* display: block; */
  gap: 20px;
}
.todo--item--menu--content {
  display: flex;
  color: grey;
  padding: 10px;
}
.todo--item--expand {
  margin-left: 250px;
  font-size: x-small;
  align-self: center;
}
.todo--item--expand:hover {
  margin-left: 250px;
  font-size: x-small;
  align-self: center;

  transform: rotate(180deg);
}
.todo--item--delete {
  border-radius: 50%;
  border: none;
  color: white;
  background-color: rgb(255, 100, 100);
  margin: auto;
}

.todo--item--title {
  width: 100%;
  border-style: none;
  font-size: large;
}
.done {
  opacity: 0.2;
  text-decoration: line-through;
}
.footer {
  font-size: small;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

.footer--button {
  color: gray;
  border-color: gray;
  border-radius: 10%;
  border-width: 1px;
}
</style>
