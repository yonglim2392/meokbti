import type { QuizQuestion, AxisScores, QuizResult, Axis } from '../types'

export function calculateScores(
  answers: Record<number, 'A' | 'B'>,
  questions: QuizQuestion[]
): AxisScores {
  const counts: Record<Axis, number> = { gp: 0, js: 0, er: 0, hm: 0 }
  const totals: Record<Axis, number> = { gp: 0, js: 0, er: 0, hm: 0 }

  for (const q of questions) {
    totals[q.axis]++
    if (answers[q.id] === 'A') counts[q.axis]++
  }

  return {
    gp: Math.round((counts.gp / totals.gp) * 100),
    js: Math.round((counts.js / totals.js) * 100),
    er: Math.round((counts.er / totals.er) * 100),
    hm: Math.round((counts.hm / totals.hm) * 100),
  }
}

export function scoresToTypeCode(scores: AxisScores): string {
  return [
    scores.gp >= 50 ? 'G' : 'P',
    scores.js >= 50 ? 'J' : 'S',
    scores.er >= 50 ? 'E' : 'R',
    scores.hm >= 50 ? 'H' : 'M',
  ].join('')
}

export function calculateResult(
  answers: Record<number, 'A' | 'B'>,
  questions: QuizQuestion[]
): QuizResult {
  const scores = calculateScores(answers, questions)
  return { typeCode: scoresToTypeCode(scores), scores }
}
