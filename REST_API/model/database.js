import { MongoClient, ObjectId } from 'mongodb';
import { isEmptyObject, renameidTo_id, rename_IdToid } from '../utility.js';
const url = 'mongodb://127.0.0.1:27017/';
const client = new MongoClient(url);
const dbName = 'todos';
const db = client.db(dbName);
const collection = db.collection('todos');

export async function getAllTodos() {
  const todos = await collection.find({}).toArray();
  return rename_IdToid(todos);
}
export async function insertOneTodo(todo) {
  let result = {};
  if (isEmptyObject(todo)) return result;
  result = await collection.insertOne(todo);
  result.message = 'Insertion Successful!!';
  return result;
}
export async function addTodoFields(id, todofields) {
  const filter = {
    _id: ObjectId(id)
  };
  const updateDoc = {
    $set: todofields
  };
  const result = await collection.updateOne(filter, updateDoc);
  return result.modifiedCount;
}
export async function updateTodo(todos) {
  let result = {};
  try{
    
    console.log(todos)
    for await(const onetodo of todos){
      let filter = { _id: ObjectId(onetodo.id) };
      delete onetodo.id
      let updateDoc = {
        $set: onetodo
      };
      let options = { upsert: true };
      console.log(onetodo);
      result = await collection.updateOne(filter, updateDoc, options);
      console.log("RESULT "+JSON.stringify(result));
      //return result
    }
  }catch(err){
    console.log(err)
  }
  

  /* todo.forEach(async (onetodo) => {
    let i = 0;
    const filter = { _id: ObjectId(onetodo.id) };
    const updateDoc = {
      $set: onetodo
    };
    console.log('COUNT ' + i++);
    console.log(onetodo);
    result = await collection.updateOne(filter, updateDoc);
    console.log(result);
  });
 */

  // const updateDoc = {
  //   $set: onetodo
  // }
  // const result = await collection.updateMany(filter, updateDoc);
  //return result.modifiedCount;
  result.message = 'SUCCESS!!';

  return result;
}
export async function deleteTodo(id) {
  const filter = { _id: ObjectId(id) };
  const updateDoc = {
    $set: { deleted: true }
  };
  const result = await collection.updateOne(filter, updateDoc);
  console.log(result);
  return result.modifiedCount;
}
export async function markAllTodosDone() {
  const filter = {};
  const updateDoc = { $set: { done: true } };
  const result = await collection.updateMany(filter, updateDoc);
  return result;
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
