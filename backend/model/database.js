import { MongoClient, ObjectId } from 'mongodb';
import { isEmptyObject, rename_IdToid } from '../utility.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.DB_URL);
const db = client.db(process.env.DB_NAME);
const collection = db.collection(process.env.DB_COLLECTION);

export async function getAllTodos() {
  try {
    const todos = await collection.find({}).toArray();
    return todos;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function insertOneTodo(todo) {
  let insertedTodo = {};
  try {
    insertedTodo = await collection.insertOne(todo);
    insertedTodo = collection.find({ _id: ObjectId(insertedTodo.insertedId + '') });
    return await insertedTodo.toArray();
  } catch (err) {
    console.log(err);
    return err;
  }
  result.message = 'Insertion Successful!!'; // add this in controller
  return result; //return inserted todo with _id
}

export async function addTodoFields(id, todofields) {
  try {
    const filter = {
      _id: ObjectId(id)
    };
    const updateDoc = {
      $set: todofields
    };
    await collection.updateOne(filter, updateDoc);
    let updatedTodo = collection.find({ _id: ObjectId(id) });
    return await updatedTodo.toArray();
  } catch (err) {
    console.log(err);
    return err;
  }
}

/* export async function updateAllTodos(todos) {
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
} */

export async function deleteTodo(id) {
  try {
    const filter = {
      _id: ObjectId(id)
    };
    const updateDoc = {
      $set: { deleted: true }
    };
    const result = await collection.updateOne(filter, updateDoc);
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function markAllTodosDone() {
  try {
    const filter = {};
    const updateDoc = { $set: { done: true } };
    const result = await collection.updateMany(filter, updateDoc);
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
}
