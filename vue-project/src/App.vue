<script setup>
import { ref, reactive } from "vue";

const message = ref("Hello World");
message.value = "Changed";
const count = ref(0);
const counter = reactive({
  count: 0,
});

const text = ref("");
const awesome = ref(true);

count.value++;
counter.count++;

let id = 0;

const newTodo = ref("");
const todos = ref([
  { id: id++, text: "Learn HTML" },
  { id: id++, text: "Learn JavaScript" },
  { id: id++, text: "Learn Vue" },
]);

function increment() {
  ++count.value;
}
function toggle() {
  awesome.value = !awesome.value;
}
function onInput(e) {
  text.value = e.target.value;
}
function addTodo() {
  todos.value.push({ id: id++, text: newTodo.value });
  newTodo.value = "";
}
function removeTodo(todo) {
  todos.value = todos.value.filter((t)=>t!==todo)
}
//while(true){counter.count++; console.log(counter.count);break;}
//component logic
//declare some reactive state here
</script>
<template>
  <h1>{{ message }}</h1>
  <p>Count is: {{ counter.count }}</p>
  <h1 :class="counter">{{ counter.count }}</h1>
  <h1 @click="increment">{{ count }}</h1>

  <div><input :value="text" @input="onInput" placeholder="Type Here" /></div>

  <div><input v-model="text" /></div>
  <p>{{ text }}</p>
  <button @click="toggle">toggle</button>
  <h1 v-if="awesome">Vue is awesome</h1>
  <h1 v-else>Oh no 😢</h1>
  <h1>Make me dynamic</h1>

  <form @submit.prevent="addTodo">
    <input v-model="newTodo" />
    <button>Add Todo</button>
  </form>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      {{ todo.text }}
      <button @click="removeTodo(todo)">X</button>
    </li>
  </ul>
</template>
