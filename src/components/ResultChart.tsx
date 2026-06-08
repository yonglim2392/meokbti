import type { AxisScores } from '../types'

const AXES = [
  { key: 'gp' as const, labelA: '미식', labelB: '실용' },
  { key: 'js' as const, labelA: '계획', labelB: '즉흥' },
  { key: 'er' as const, labelA: '탐험', labelB: '단골' },
  { key: 'hm' as const, labelA: '자극', labelB: '순한' },
]

interface Props {
  scores: AxisScores
}

export function ResultChart({ scores }: Props) {
  return (
    <div className="w-full space-y-4">
      {AXES.map(({ key, labelA, labelB }) => {
        const scoreA = scores[key]
        const scoreB = 100 - scoreA
        return (
          <div key={key}>
            <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
              <span>
                {labelA}{' '}
                <span className="text-orange-500 font-bold">{scoreA}%</span>
              </span>
              <span className="text-gray-400">
                {scoreB}% {labelB}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-orange-400 h-3 rounded-full transition-all duration-500"
                style={{ width: `${scoreA}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
