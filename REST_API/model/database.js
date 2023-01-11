import { MongoClient, ObjectId } from 'mongodb';

const url = 'mongodb://127.0.0.1:27017/';
const client = new MongoClient(url);
const dbName = 'todos';
const db = client.db(dbName);
const collection = db.collection('todos');

export async function connDB() {
  try {
    await client.connect();
    console.log('Connected successfully to server');
  } catch (error) {
    console.log(error);
  }
  return 'done.';
}
export async function getAllTodos() {
  const todos = [];
  const find_result = collection.find({});
  await find_result.forEach((element) => {
    todos.push(element);
  });
  return todos;
}
export async function insertOneTodo(todo) {
  const result = await collection.insertOne(todo);
  console.log(`A document was inserted with the _id: ${result.insertedId}`);
}
export async function addTodoFields(id, todofields) {
  const filter = { _id: id };
  const updateDoc = {
    $set: todofields
  };
  const result = await collection.findOneAndUpdate(filter, updateDoc);
  console.log(result);
  return result
}
export async function deleteTodo(id){
  const filter = { _id: id };
  const updateDoc = {
    $set: {deleted: true}
  };
  const result = await collection.findOneAndUpdate(filter, updateDoc);
  console.log(result);
}
export async function markAllTodosDone(){
  const filter = {};
  const updateDoc = { $set: { done: true } };
  const result = await collection.updateMany(filter, updateDoc);
  console.log(result);
}

/*   const doc = {
    title: 'todo 3',
    done: false,
    notes: '',
    date: '',
    priority: 'none',
    deleted: false
  }
const result = await collection.insertOne(doc);
console.log(
   `A document was inserted with the _id: ${result.insertedId}`,
); */


/* const find_result = await collection.findOne({ _id: ObjectId("63bd1604166c68e8f13d3d67") })
console.log(find_result) */

/* main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close()); */
