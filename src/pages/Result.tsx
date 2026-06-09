import { useLocation, useNavigate } from 'react-router-dom'
import { decodeResultFromUrl } from '../utils/url'
import { getTypeByCode } from '../data/typeDefinitions'
import { ResultChart } from '../components/ResultChart'
import { ShareButton } from '../components/ShareButton'

function ErrorView({ onHome }: { onHome: () => void }) {
  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-gray-500 mb-4">결과를 불러올 수 없습니다.</p>
        <button
          type="button"
          onClick={onHome}
          className="py-2 px-6 bg-orange-400 text-white rounded-xl hover:bg-orange-500"
        >
          처음으로
        </button>
      </div>
    </div>
  )
}

export function Result() {
  const location = useLocation()
  const navigate = useNavigate()
  const decoded = decodeResultFromUrl(location.search)

  if (!decoded) return <ErrorView onHome={() => navigate('/')} />

  const { typeCode, scores } = decoded
  const typeDef = getTypeByCode(typeCode)

  if (!typeDef) return <ErrorView onHome={() => navigate('/')} />

  return (
    <div className="min-h-screen bg-orange-50 py-8 px-4">
      <div className="max-w-lg mx-auto space-y-5">
        <div className="text-center pt-4">
          <p className="text-sm text-gray-400 mb-1">나의 먹BTI는</p>
          <h1 className="text-5xl font-bold text-orange-500">{typeCode}</h1>
          <h2 className="text-xl font-semibold text-gray-700 mt-1">{typeDef.name}</h2>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5">
          <ResultChart scores={scores} />
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-gray-700 leading-relaxed">{typeDef.description}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h3 className="font-semibold text-gray-800 mb-3">식사 궁합</h3>
          <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">잘 맞는 유형</p>
          <div className="flex gap-2 mb-4">
            {typeDef.compatibleTypes.map(code => (
              <span
                key={code}
                className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold"
              >
                {code}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">주의가 필요한 유형</p>
          <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-sm font-semibold">
            {typeDef.conflictType}
          </span>
        </div>

        <ShareButton typeCode={typeCode} typeName={typeDef.name} scores={scores} />

        <button
          type="button"
          onClick={() => navigate('/')}
          className="w-full py-3 bg-white text-gray-500 rounded-xl border border-gray-200 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-gray-400 transition-colors"
        >
          다시 테스트하기
        </button>
      </div>
    </div>
  )
}
