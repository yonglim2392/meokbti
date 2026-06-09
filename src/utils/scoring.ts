import type { QuizQuestion, AxisScores, QuizResult, Axis } from '../types'

export const AXES: Axis[] = ['gp', 'js', 'er', 'hm']

export function calculateScores(
  answers: Record<number, 'A' | 'B'>,
  questions: QuizQuestion[]
): AxisScores {
  const counts = Object.fromEntries(AXES.map(a => [a, 0])) as Record<Axis, number>
  const totals = Object.fromEntries(AXES.map(a => [a, 0])) as Record<Axis, number>

  for (const q of questions) {
    totals[q.axis]++
    if (answers[q.id] === 'A') counts[q.axis]++
  }

  const score = (axis: Axis) =>
    totals[axis] > 0 ? Math.round((counts[axis] / totals[axis]) * 100) : 0

  return { gp: score('gp'), js: score('js'), er: score('er'), hm: score('hm') }
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
