<script setup>
import { ref } from 'vue';

let todos = ref(loadData() || []);

const isDone = (todo) => todo.done === true;
let checkAllDone = todos.value.length != 0 && todos.value.every(isDone);
console.log(checkAllDone);

function loadData() {
  return JSON.parse(localStorage.getItem('todos'));
}

function saveData(data) {
  localStorage.setItem('todos', JSON.stringify(data));
}

function getTodo(title) {
  return {
    id: Date.now(),
    title: title,
    done: false,
    notes: '',
    date: '',
    priority: 'none',
    deleted: false
  };
}

function onInput(event) {
  const target = event.target;
  if (target.value === '') return;
  let title = target.value;
  target.value = '';
  todos.value.push(getTodo(title));
  saveData(todos.value);
}

function onChange(e) {
  saveData(todos.value);
}
function onDelete(e) {
  let len = todos.value.length;
  for (let i = 0; i < len; i++) {
    if (todos.value[i].id == e.target.id) {
      todos.value[i].deleted = true;
    }
  }
  saveData(todos.value);
}

function allDone(e) {
  todos.value.map((todo) => {
    todo.done = checkAllDone;
  });
  saveData(todos.value);
}
</script>
<template>
  <div class="app">
    <h1>todos</h1>
    <div class="list">
      <span class="todo--input">
        <input type="checkbox" @change="allDone" v-model="checkAllDone" />
        <input
          @keydown.enter="onInput"
          class="todo--title--input"
          autofocus
          placeholder="Whats needs to be done?"
        />
      </span>
      <div v-for="(item, index) in todos" :key="item.id">
        <details
          v-if="!todos[index].deleted"
          class="todo--item"
          :id=item.id
          @change="onChange"
        >
          <summary class="todo--item--menu" style="">
            <input
              class="todo--item--checkbox"
              type="checkbox"
              name="checkbox"
              v-model="todos[index].done"
            />

            <input
              class="todo--item--title"
              :class="{ done: todos[index].done }"
              v-model="todos[index].title"
              name="title"
            />
            <span class="todo--item--expand">▼</span>

            <button class="todo--item--delete" :id="item.id" @click="onDelete">
              ❌
            </button>
          </summary>
          <div class="todo--item--menu--content">
            <div style="display: flex; flex-direction: column">
              <label class="todo--item--notes--label">Notes</label>
              <textarea
                class="todo--item--notes"
                style="height: 98px; width: 400px"
                v-model="todos[index].notes"
              ></textarea>
            </div>
            <div style="display: flex; flex-direction: column; margin: auto">
              <div style="display: flex; flex-direction: column; padding: 10px">
                <label class="todo--item--date--label">Date</label>
                <input
                  class="todo--item--date"
                  type="date"
                  v-model="todos[index].date"
                />
              </div>
              <div style="display: flex; flex-direction: column; padding: 10px">
                <label class="todo--item--priority--label">Priority</label>
                <select
                  class="todo--item--priority"
                  v-model="todos[index].priority"
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
        <input class="footer--button" type="button" value="All" />
        <input class="footer--button" type="button" value="Active" />
        <input class="footer--button" type="button" value="Completed" />
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
  height: auto;
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
.todo--item--checkbox {
}
.todo--item--checkbox:checked {
  content: '✓';
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
