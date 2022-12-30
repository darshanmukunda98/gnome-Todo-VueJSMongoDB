<script setup>
import {ref} from 'vue'

function addTodo(e){
  console.log(e.target.value)
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
      >
    </header>
  </section>
</template>
