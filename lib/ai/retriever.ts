import { aiKnowledge, type KnowledgeItem } from '@/data/ai-knowledge';

export function retrieveKnowledge(
  query: string,
  limit = 5,
): KnowledgeItem[] {
  const normalizedQuery = query.toLowerCase();

  const words = normalizedQuery
    .split(/\s+/)
    .map((word) => word.trim())
    .filter(Boolean);

  const scored = aiKnowledge.map((item) => {
    let score = 0;

    const searchableText = [
      item.title,
      item.content,
      ...item.keywords,
    ]
      .join(' ')
      .toLowerCase();

    for (const word of words) {
      if (searchableText.includes(word)) {
        score += 1;
      }
    }

    for (const keyword of item.keywords) {
      if (normalizedQuery.includes(keyword.toLowerCase())) {
        score += 3;
      }
    }

    if (normalizedQuery.includes(item.title.toLowerCase())) {
      score += 5;
    }

    return {
      item,
      score,
    };
  });

  return scored
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((result) => result.item);
}