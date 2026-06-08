import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { QuestionCard } from './QuestionCard'
import type { QuizQuestion } from '../types'

const mockQuestion: QuizQuestion = {
  id: 3,
  axis: 'gp',
  text: '어디서 먹을까요?',
  optionA: '맛집으로 간다',
  optionB: '편한 데로 간다',
}

describe('QuestionCard', () => {
  it('renders question text and both options', () => {
    render(<QuestionCard question={mockQuestion} onAnswer={vi.fn()} />)
    expect(screen.getByText('어디서 먹을까요?')).toBeInTheDocument()
    expect(screen.getByText('맛집으로 간다')).toBeInTheDocument()
    expect(screen.getByText('편한 데로 간다')).toBeInTheDocument()
  })

  it('calls onAnswer with questionId and A when option A clicked', async () => {
    const onAnswer = vi.fn()
    render(<QuestionCard question={mockQuestion} onAnswer={onAnswer} />)
    await userEvent.click(screen.getByText('맛집으로 간다'))
    expect(onAnswer).toHaveBeenCalledWith(3, 'A')
  })

  it('calls onAnswer with questionId and B when option B clicked', async () => {
    const onAnswer = vi.fn()
    render(<QuestionCard question={mockQuestion} onAnswer={onAnswer} />)
    await userEvent.click(screen.getByText('편한 데로 간다'))
    expect(onAnswer).toHaveBeenCalledWith(3, 'B')
  })
})
