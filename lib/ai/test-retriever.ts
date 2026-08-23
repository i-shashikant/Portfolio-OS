import { retrieveKnowledge } from './retriever';

const results = retrieveKnowledge(
  'Which projects did Shashikant build with Flask?',
);

console.log(
  results.map((result) => ({
    title: result.title,
    type: result.type,
  })),
);