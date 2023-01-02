<script setup>
import { ref, watch } from "vue";
let i = 0;
let todo = ref("");
let todos = ref([]);
/* watch(todo,(t)=>{
  localStorage.setItem("data",JSON.stringify(t))
}) */

function onInput(e) {
  console.log("TITLE " + e.target.value);
  let title = e.target.value;
  e.target.value = "";
  todos.value.push({
    id: Date.now(),
    title: title,
    done: false,
  });
  console.log("TODOS");
  console.log(todos.value);
  localStorage.setItem("data", JSON.stringify(todos.value));
}
function toggle(e) {
  console.log(e.target.parentNode.parentNode.id);
  console.log(e.target.checked);
}
</script>
<template>
  <!--<form @submit.prevent="onInput" >{{ todo }}</form> read on v-bind vs v-model -->
  <div class="app">
  <h1>todos</h1>
  <input @keydown.enter="onInput" />{{ todo }}
  <div v-for="item in todos" :key="item.id">
    <div class="todo--item" :id="item.id">
      <span>
        <input
          type="checkbox"
          @change="toggle" 
        />
        <input v-model="item.title" />
      </span>
    </div>
  </div>
</div>
</template>
<style>
</style>
