import * as dotenv from 'dotenv';
dotenv.config();
import { PineconeClient } from '@pinecone-database/pinecone';

const pinecone = new PineconeClient();



const PINECONE_API_KEY = process.env.PINECONE_API_KEY

console.log("PINECONE_API_KEY",PINECONE_API_KEY);

const environment = process.env.PINECONE_ENVIRONMENT


console.log("environment",environment)

async function main() {
  const client = new PineconeClient();
  await client.init({
    apiKey:PINECONE_API_KEY,
    environment: environment,
  });

 // You can do something with the index stats here
}

main().catch((error) => {
  console.error(error);
});


// await pinecone.init({
//     environment: process.env.PINECONE_ENVIRONMENT,
//     apiKey: process.env.PINECONE_API_KEY
// });

const index = {
    name: "article",
    dimension: 1024,
    metric: "cosine"
  };
  
  // Export the 'index' object
  export { index };
  


 