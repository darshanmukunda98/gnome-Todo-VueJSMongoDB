<script setup>
import { ref, computed, watchEffect } from 'vue';

let id = 0;

const hideCompleted = ref(false);

const todos = ref(JSON.parse(localStorage.getItem('todos') || '[]'));

watchEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos.value));
});

const filteredTodos = computed(() => {
  return hideCompleted.value ? todos.value.filter((t) => !t.done) : todos.value;
});

function addTodo(e) {
  const value = e.target.value;
  if (value)
    todos.value.push({
      id: id++,
      text: value,
      done: false
    });
  e.target.value = '';
}

function removeTodo(todo) {
  todos.value.splice(todos.value.indexOf(todo), 1);
}

function editTodo(todo) {
  todo.text = todo.text;
}
</script>

<template>
  <h1>todos</h1>

  <input
    class="new-todo"
    autofocus
    placeholder="What needs to be done?"
    @keyup.enter="addTodo"
  />

  <ul>
    <li v-for="todo in filteredTodos" :key="todo.id">
      <input type="checkbox" v-model="todo.done" />
      <input :class="{ done: todo.done }" @dblclick="editTodo(todo)" :value="todo.text"><!-- {{
        todo.text
      }}</input> -->
      <button @click="removeTodo(todo)">X</button>
    </li>
  </ul>
  <button @click="hideCompleted = !hideCompleted">
    {{ hideCompleted ? 'Show all' : 'Hide completed' }}
  </button>
</template>

<style>
.done {
  text-decoration: line-through;
}
</style>
