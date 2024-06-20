import fetch from 'node-fetch';
import clientPromise from './mongodb';

async function fetchExternalData(apiUrl: string) {
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error(`Failed to fetch data from ${apiUrl}: ${response.statusText}`)
    }

    const data = await response.json();
    return data;
}

async function inserDataToMongoDB(data: any) {
    const client = await clientPromise;
    const db = client.db('sample_mflix');
    const collection = db.collection('nomad');

    const result = await collection.insertMany(data);
    return result;
}

async function fetchDataAndInsertToMongoDB(apiUrl: string) {
    try {
        const data = await fetchExternalData(apiUrl);
        console.log('Data fetched from API: ', data);

        const result = await inserDataToMongoDB(data);
        console.log("Data inserted to MongoDB:", result);
    } catch (error) {
        console.error("Error fetching data and inserting to MongoDB: ", error)
    }
}

export default fetchDataAndInsertToMongoDB;