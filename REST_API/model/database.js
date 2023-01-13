import { MongoClient, ObjectId } from 'mongodb';
import { isEmptyObject, rename_IdToid } from '../utility.js';

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

export async function updateAllTodos(todos) {
  let result = {};
  try {
    for await (const onetodo of todos) {
      let filter = { _id: ObjectId(onetodo.id) };
      delete onetodo.id;
      let updateDoc = {
        $set: onetodo
      };
      let options = { upsert: true };
      result = await collection.updateOne(filter, updateDoc, options);
    }
  } catch (err) {
    console.log(err);
  }
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
