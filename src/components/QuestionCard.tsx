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
        {([['A', question.optionA], ['B', question.optionB]] as const).map(([answer, label]) => (
          <button
            key={answer}
            onClick={() => onAnswer(question.id, answer)}
            aria-label={`${question.text} - ${label}`}
            className="w-full py-4 px-4 border-2 border-orange-200 rounded-xl text-left text-gray-700 hover:bg-orange-50 hover:border-orange-400 focus-visible:outline-2 focus-visible:outline-orange-500 transition-colors"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
