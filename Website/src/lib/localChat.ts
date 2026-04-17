import { QA_DATABASE } from './ambot365Knowledge';

/**
 * Match a user question against the Ambot365 Q&A database using keyword scoring.
 * Returns the best-matching answer, or a friendly fallback.
 */
export function localAnswer(question: string): string {
  const q = question.toLowerCase();

  let bestScore = 0;
  let bestAnswer = '';

  for (const entry of QA_DATABASE) {
    const score = entry.keywords.filter((k) => q.includes(k)).length;
    if (score > bestScore) {
      bestScore = score;
      bestAnswer = entry.answer;
    }
  }

  if (bestScore > 0) return bestAnswer;

  // Fallback
  return "Thanks for your question! For detailed information, please click **\"Get in Touch\"** on the website and our team will be happy to help. You can also choose a solution from the sidebar to explore suggested questions.";
}
