import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { questions } from '../data/questions'
import { calculateResult } from '../utils/scoring'
import { encodeResultToUrl } from '../utils/url'
import { ProgressBar } from '../components/ProgressBar'
import { QuestionCard } from '../components/QuestionCard'

export function Quiz() {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B'>>({})
  const answeredRef = useRef<number | null>(null)

  function handleAnswer(questionId: number, answer: 'A' | 'B') {
    if (answeredRef.current === questionId) return
    answeredRef.current = questionId

    const newAnswers = { ...answers, [questionId]: answer }
    setAnswers(newAnswers)

    if (currentIndex + 1 >= questions.length) {
      const result = calculateResult(newAnswers, questions)
      navigate('/result' + encodeResultToUrl(result.typeCode, result.scores))
    } else {
      setCurrentIndex(currentIndex + 1)
    }
  }

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg space-y-6">
        <ProgressBar current={currentIndex + 1} total={questions.length} />
        <QuestionCard question={questions[currentIndex]} onAnswer={handleAnswer} />
      </div>
    </div>
  )
}
