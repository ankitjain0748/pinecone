import { PineconeStore } from 'langchain/vectorstores';
import { index } from './pinecone.js';
import { OpenAIEmbeddings } from 'langchain/embeddings';
const embedder = new OpenAIEmbeddings();
console.log("index object:", index);



const PINECONE_API_KEY = process.env.PINECONE_API_KEY

console.log("PINECONE_API_KEY",PINECONE_API_KEY);

const environment = process.env.PINECONE_ENVIRONMENT



console.log("environment",environment);

// import { PineconeIndex } from '@pinecone-database/pinecone';



// // Replace these values with your actual Pinecone settings
// const pineconeConfig = {
//   apiKey: PINECONE_API_KEY,
//   environment: environment,
// };


// const pineconeIndex = new PineconeIndex (pineconeConfig, 'product');


const pineconeStore = new PineconeStore(embedder, { PineconeIndex : index, namespace: 'langchain' });
import express from 'express';
const app = express();

const port = 9000;

app.get('/', async (req, res) => {
    const { q } = req.query;
    
    try {
        const data = await pineconeStore.similaritySearch(q, 5);
        res.status(200).send([...data])
    }catch(err) {
        console.log(err);
        res.status(404).send({ message: `${q} doesn't match any search` });
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})