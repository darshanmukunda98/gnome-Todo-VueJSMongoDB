<script setup>
import { ref } from 'vue';

let todos = ref(JSON.parse(localStorage.getItem('data') || '[]'));
let checkAllDone = todos.value.every((todo) => todo.done === true);
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
        <input @keydown.enter="onInput" class="todo--title--input" autofocus placeholder="Whats needs to be done?"/>
      </span>
      <div v-for="(item, index) in todos" :key="item.id">
        <div class="todo--item" :id="item.id" @change="onChange">
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
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.todo--input {
  display: flex;
  height: 40px;
  width: 100%;
  padding: 5px 0;
  border-style: solid;
  border-width:1px;
  border-color: grey;
}

.todo--title--input {
  width: 100%;
  border-style:solid;
  border-width:1px;
  font-size: x-large;
}
.todo--item {
  display: flex;
  height: 40px;
  padding: 5px 0;
  border-style: solid;
  border-width: 1px;
  border-color: grey;
}
.todo--item--title {
  width: 100%;
  border-style: none;
  font-size: x-large;
}
</style>
