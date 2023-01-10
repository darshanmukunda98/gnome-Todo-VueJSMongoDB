const { MongoClient, ObjectId } = require('mongodb');


const url = 'mongodb://127.0.0.1:27017/';
const client = new MongoClient(url);

const dbName = 'todos';

async function main() {
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('todos');
  const doc = {
    title: 'todo 2',
    done: false,
    notes: '',
    date: '',
    priority: 'none',
    deleted: false
  }
// const result = await collection.insertOne(doc);
// console.log(
//    `A document was inserted with the _id: ${result.insertedId}`,
// );
const find_result = await collection.findOne({ "_id": ObjectId("63bd1037b551062665b049ba") })
console.log(find_result)
  return '.done'
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
