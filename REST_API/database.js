const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017/';
const client = new MongoClient(url);

const dbName = 'todos';

async function main() {
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('todos');
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
  /* const find_result = await collection.find({})
await find_result.forEach(element => {
  console.log(element)
}) */
  /* const filter = { title: "todo 3" }
const updateDoc = {
  $set: {
    notes: "notes 3"
  },
};
const result = await collection.findOneAndUpdate(filter, updateDoc);
    console.log(
      result
    ); */
  const filter = {};
  const updateDoc = { $set: { done: true } };
  const result = await collection.updateMany(filter, updateDoc);
  console.log(result);
  /* const find_result = await collection.findOne({ _id: ObjectId("63bd1604166c68e8f13d3d67") })
console.log(find_result) */
  return '.done';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
