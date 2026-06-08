import { describe, it, expect } from 'vitest'
import { calculateScores, scoresToTypeCode, calculateResult } from './scoring'
import type { QuizQuestion } from '../types'

const mockQuestions: QuizQuestion[] = [
  { id: 1, axis: 'gp', text: '', optionA: '', optionB: '' },
  { id: 2, axis: 'gp', text: '', optionA: '', optionB: '' },
  { id: 3, axis: 'js', text: '', optionA: '', optionB: '' },
  { id: 4, axis: 'js', text: '', optionA: '', optionB: '' },
  { id: 5, axis: 'er', text: '', optionA: '', optionB: '' },
  { id: 6, axis: 'er', text: '', optionA: '', optionB: '' },
  { id: 7, axis: 'hm', text: '', optionA: '', optionB: '' },
  { id: 8, axis: 'hm', text: '', optionA: '', optionB: '' },
]

describe('calculateScores', () => {
  it('returns 100 for axis when all A answers', () => {
    const answers = { 1: 'A', 2: 'A', 3: 'A', 4: 'A', 5: 'A', 6: 'A', 7: 'A', 8: 'A' } as Record<number, 'A' | 'B'>
    const scores = calculateScores(answers, mockQuestions)
    expect(scores.gp).toBe(100)
    expect(scores.js).toBe(100)
    expect(scores.er).toBe(100)
    expect(scores.hm).toBe(100)
  })

  it('returns 0 for axis when all B answers', () => {
    const answers = { 1: 'B', 2: 'B', 3: 'B', 4: 'B', 5: 'B', 6: 'B', 7: 'B', 8: 'B' } as Record<number, 'A' | 'B'>
    const scores = calculateScores(answers, mockQuestions)
    expect(scores.gp).toBe(0)
    expect(scores.js).toBe(0)
    expect(scores.er).toBe(0)
    expect(scores.hm).toBe(0)
  })

  it('returns 50 for axis when half A half B', () => {
    const answers = { 1: 'A', 2: 'B', 3: 'A', 4: 'B', 5: 'A', 6: 'B', 7: 'A', 8: 'B' } as Record<number, 'A' | 'B'>
    const scores = calculateScores(answers, mockQuestions)
    expect(scores.gp).toBe(50)
    expect(scores.js).toBe(50)
  })
})

describe('scoresToTypeCode', () => {
  it('returns GJEH when all scores above 50', () => {
    expect(scoresToTypeCode({ gp: 80, js: 60, er: 90, hm: 70 })).toBe('GJEH')
  })

  it('returns PSRM when all scores below 50', () => {
    expect(scoresToTypeCode({ gp: 20, js: 30, er: 10, hm: 40 })).toBe('PSRM')
  })

  it('returns first-letter code when score is exactly 50', () => {
    expect(scoresToTypeCode({ gp: 50, js: 50, er: 50, hm: 50 })).toBe('GJEH')
  })
})

describe('calculateResult', () => {
  it('returns GSEM typeCode and correct scores', () => {
    // gp: ids 1,2 모두 A → 100% → G
    // js: ids 3,4 모두 B → 0%  → S
    // er: ids 5,6 모두 A → 100% → E
    // hm: ids 7,8 모두 B → 0%  → M
    const answers = { 1: 'A', 2: 'A', 3: 'B', 4: 'B', 5: 'A', 6: 'A', 7: 'B', 8: 'B' } as Record<number, 'A' | 'B'>
    const result = calculateResult(answers, mockQuestions)
    expect(result.typeCode).toBe('GSEM')
    expect(result.scores.gp).toBe(100)
    expect(result.scores.js).toBe(0)
    expect(result.scores.er).toBe(100)
    expect(result.scores.hm).toBe(0)
  })
})
