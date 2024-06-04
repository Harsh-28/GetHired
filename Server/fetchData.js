const { MongoClient } = require('mongodb');
const fs = require('fs');

async function fetchData() {
    // Connection URL
    const url = 'mongodb+srv://harshsree677:get-hired1460@cluster0.omdc2dq.mongodb.net/get-hired';
    const client = new MongoClient(url);

    // Database and collection
    const dbName = 'get-hired';
    const collectionName = 'course_details';

    try {
        // Connect to the MongoDB client
        await client.connect();
        console.log('Connected to MongoDB');

        // Select the database and collection
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Fetch all documents from the collection
        const data = await collection.find({}).toArray();

        // Convert data to JSON string
        const jsonData = JSON.stringify(data, null, 4);

        // Write JSON data to a file
        fs.writeFileSync('../src/data/data.json', jsonData, 'utf8');
        console.log('Data has been written to data.json');
    } catch (err) {
        console.error(err);
    } finally {
        // Close the connection
        await client.close();
    }
}

module.exports = fetchData;