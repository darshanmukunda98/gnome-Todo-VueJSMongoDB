<script setup>
import { ref } from 'vue';

let todos = ref(JSON.parse(localStorage.getItem('data') || '[]'));
let checkAllDone;

checkAllDone =
  todos.value.length === 0
    ? false
    : (checkAllDone = todos.value.every((todo) => todo.done === true));
console.log(checkAllDone);

function onInput(e) {
  console.log('TITLE ' + e.target.value);
  let title = e.target.value;
  e.target.value = '';
  todos.value.push({
    id: Date.now(),
    title: title,
    done: false,
    notes:"",
    date:"",
    priority:"",
    deleted:false
  });
  console.log('TODOS');
  console.log(todos.value);
  localStorage.setItem('data', JSON.stringify(todos.value));
}

function onChange(e) {
  console.log(e.target.value);
  localStorage.setItem('data', JSON.stringify(todos.value));
}

function allDone(e) {
  if (checkAllDone) {
    todos.value.map((todo) => {
      todo.done = true;
    });
    checkAllDone = true;
  } else {
    todos.value.map((todo) => {
      todo.done = false;
    });
    checkAllDone = false;
  }
  localStorage.setItem('data', JSON.stringify(todos.value));
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
        <details class="todo--item" :id="item.id" @change="onChange">
          <summary class="todo--item--menu" style="">
            <input
              class="todo--item--checkbox"
              type="checkbox"
              name="checkbox"
              v-model="todos[index].done"
            />
            <input
              class="todo--item--title"
              v-model="todos[index].title"
              name="title"
            />
            <span class="todo--item--expand">▼</span>
            <input class="todo--item--delete" type="button" value="✕" />
          </summary>
          <div class="todo--item--menu--content">
            <div style="display: flex; flex-direction: column">
              <label class="todo--item--notes--label">Notes</label>
              <textarea
                class="todo--item--notes"
                style="height: 98px; width: 400px"
              ></textarea>
            </div>
            <div style="display: flex; flex-direction: column; margin: auto">
              <div style="display: flex; flex-direction: column; padding: 10px">
                <label class="todo--item--date--label">Date</label>
                <input class="todo--item--date" type="date" />
              </div>
              <div style="display: flex; flex-direction: column; padding: 10px">
                <label class="todo--item--priority--label">Priority</label>
                <select class="todo--item--priority">
                  <option disabled selected>None</option>
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
        <span v-text="todos.length"></span> items left
        <input type="button" value="All" /><input
          type="button"
          value="Active"
        /><input type="button" value="Completed" />
      </footer>
    </div>
  </div>
</template>
<style scoped>
.app {
  display: flex;
  flex-direction: column;

  align-items: center;
  height: auto;
}
.app h1 {
  font-size: 100px;
  font-weight: 100;
  font-family: Arial, Helvetica, sans-serif;
  color: red;
}
.list {
  border: 1px solid grey;
  box-shadow: 5px 5px grey;
  width: auto;
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

  padding: 10px;
}
.todo--item--expand {
  padding-left: 390px;
}
.todo--item--delete {
  border-radius: 50%;
  border: none;
  color: white;
  background-color: red;
  margin: auto;
}
.todo--item--checkbox {
  content: '';
}
.todo--item--checkbox:checked {
  content: '✓';
}
.todo--item--title {
  width: 30%;
  border-style: none;
  font-size: large;
}
.footer {
  display: flex;
  gap: 10px;
  justify-content: center;
}
</style>
