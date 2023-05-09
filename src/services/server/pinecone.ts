import { PineconeClient } from '@pinecone-database/pinecone';

if (!process.env.PINECONE_API_KEY) {
  throw new Error('Missing Pinecone Credentials');
}

export const getPineconeClient = async () => {
  try {
    const pinecone = new PineconeClient();

    await pinecone.init({
      environment: process.env.PINECONE_ENVIRONMENT,
      apiKey: process.env.PINECONE_API_KEY,
    });

    return pinecone;
  } catch (error) {
    console.log(error);
  }
};
