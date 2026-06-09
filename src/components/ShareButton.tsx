import type { TypeCode, AxisScores } from '../types'
import { encodeResultToUrl } from '../utils/url'

interface Props {
  typeCode: TypeCode
  typeName: string
  scores: AxisScores
}

export function ShareButton({ typeCode, typeName, scores }: Props) {
  const resultUrl = window.location.origin + '/result' + encodeResultToUrl(typeCode, scores)

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: `나의 먹BTI는 ${typeCode} — ${typeName}`,
        text: '당신의 식습관 유형을 알아보세요!',
        url: resultUrl,
      })
    } else {
      navigator.clipboard.writeText(resultUrl)
        .then(() => { alert('링크가 복사되었습니다!') })
        .catch(() => { alert('링크 복사에 실패했습니다. 다시 시도해주세요.') })
    }
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(resultUrl)
      .then(() => { alert('링크가 복사되었습니다!') })
      .catch(() => { alert('링크 복사에 실패했습니다. 다시 시도해주세요.') })
  }

  return (
    <div className="flex gap-3">
      <button
        type="button"
        onClick={handleShare}
        className="flex-1 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-xl hover:bg-yellow-300 transition-colors"
      >
        공유하기
      </button>
      <button
        type="button"
        onClick={handleCopyLink}
        className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
      >
        링크 복사
      </button>
    </div>
  )
}
