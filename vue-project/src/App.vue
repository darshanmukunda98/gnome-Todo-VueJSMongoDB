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
    done: false
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
          <summary style="display: block">
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
            <span>▼</span>
            <input type="button" value="X" />
          </summary>
          <label>Notes</label>
          <input class="todo--item--notes" type="textarea" />
          <label>Date</label>
          <input type="date" />
          <label>Priority</label>
          <select>
            <option disabled selected>None</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </details>
      </div>
    </div>
  </div>
</template>
<style scoped>
.app {
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  width: 700px;
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
  flex-direction: row;
}
.todo--item--checkbox {
  content: '';
}
.todo--item--checkbox:checked {
  content: '✓';
}
.todo--item--title {
  width: 90%;
  border-style: none;
  font-size: large;
}
</style>
