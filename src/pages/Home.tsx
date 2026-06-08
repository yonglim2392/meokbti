import { useNavigate } from 'react-router-dom'

export function Home() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <h1 className="text-6xl font-bold text-orange-500 mb-2">먹BTI</h1>
        <p className="text-gray-500 text-lg mb-2">나의 식습관 유형은?</p>
        <p className="text-gray-400 text-sm mb-10">
          20개의 질문으로 알아보는 나만의 먹BTI 유형
        </p>
        <button
          onClick={() => navigate('/quiz')}
          className="w-full py-4 bg-orange-400 text-white text-lg font-bold rounded-2xl hover:bg-orange-500 transition-colors shadow-lg"
        >
          테스트 시작하기
        </button>
      </div>
    </div>
  )
}
