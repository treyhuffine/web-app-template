import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';

export const run = async () => {
  const vectorStore = await MemoryVectorStore.fromTexts(
    ['Hello world', 'Bye bye', 'hello nice world'],
    [{ id: 2 }, { id: 1 }, { id: 3 }],
    new OpenAIEmbeddings(),
  );

  const resultOne = await vectorStore.similaritySearch('hello nice world', 2);
  console.log(resultOne);
};

run();
