import type { QuizQuestion } from '../types'

interface Props {
  question: QuizQuestion
  onAnswer: (questionId: number, answer: 'A' | 'B') => void
}

export function QuestionCard({ question, onAnswer }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full">
      <p className="text-lg font-semibold text-gray-800 mb-6 leading-relaxed">
        {question.text}
      </p>
      <div className="flex flex-col gap-3">
        <button
          onClick={() => onAnswer(question.id, 'A')}
          className="w-full py-4 px-4 border-2 border-orange-200 rounded-xl text-left text-gray-700 hover:bg-orange-50 hover:border-orange-400 transition-colors"
        >
          {question.optionA}
        </button>
        <button
          onClick={() => onAnswer(question.id, 'B')}
          className="w-full py-4 px-4 border-2 border-orange-200 rounded-xl text-left text-gray-700 hover:bg-orange-50 hover:border-orange-400 transition-colors"
        >
          {question.optionB}
        </button>
      </div>
    </div>
  )
}
