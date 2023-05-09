import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { PineconeStore } from 'langchain/vectorstores';
import path from 'path';
import { PINECONE_NAMESPACE } from 'constants/pinecone';
import { getPineconeClient } from 'services/server/pinecone';
import { processFilesToDocs } from 'utils/server/serverless/processFilesToDocs';

export const run = async () => {
  try {
    /*load raw docs from the markdown files in the directory */
    const dir = path.resolve(__dirname, '../data');
    const rawDocs = await processFilesToDocs(dir);

    /* Split text into chunks */
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await textSplitter.splitDocuments(rawDocs);
    console.log('split docs', docs);

    console.log('creating vector store...');
    /*create and store the embeddings in the vectorStore*/
    const embeddings = new OpenAIEmbeddings();
    const pinecone = await getPineconeClient();
    const index = pinecone.Index(process.env.PINECONE_INDEX!); //change to your own index name
    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
      namespace: PINECONE_NAMESPACE,
      textKey: 'text',
    });
  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to ingest your data');
  }
};

(async () => {
  await run();
  console.log('ingestion complete');
})();
