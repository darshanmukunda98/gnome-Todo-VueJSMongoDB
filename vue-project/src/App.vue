<script setup>
import { ref } from "vue";

const todos = ref([]);
function addTodo(e) {
  const value = e.target.value;
  if (value) {
    todos.value.push({
      id: Date.now(),
      title: value,
      completed: false,
    });
    e.target.value = "";
  }
  console.log(todos.value)
}
</script>
<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        autofocus
        placeholder="What needs to be done?"
        @keyup.enter="addTodo"
      />
    </header>
  </section>
</template>
