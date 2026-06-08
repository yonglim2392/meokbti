import { useEffect } from 'react'
import type { TypeCode, AxisScores } from '../types'
import { encodeResultToUrl } from '../utils/url'

declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void
      isInitialized: () => boolean
      Share: {
        sendDefault: (options: object) => void
      }
    }
  }
}

interface Props {
  typeCode: TypeCode
  typeName: string
  scores: AxisScores
}

export function ShareButton({ typeCode, typeName, scores }: Props) {
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_APP_KEY)
    }
  }, [])

  const resultUrl = window.location.origin + '/result' + encodeResultToUrl(typeCode, scores)

  function handleKakaoShare() {
    if (!window.Kakao?.Share) return
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `나의 먹BTI는 ${typeCode} — ${typeName}`,
        description: '당신의 식습관 유형을 알아보세요!',
        link: { mobileWebUrl: resultUrl, webUrl: resultUrl },
      },
      buttons: [
        {
          title: '나도 해보기',
          link: {
            mobileWebUrl: window.location.origin,
            webUrl: window.location.origin,
          },
        },
      ],
    })
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(resultUrl)
      .then(() => {
        alert('링크가 복사되었습니다!')
      })
      .catch(() => {
        alert('링크 복사에 실패했습니다. 다시 시도해주세요.')
      })
  }

  return (
    <div className="flex gap-3">
      <button
        onClick={handleKakaoShare}
        className="flex-1 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-xl hover:bg-yellow-300 transition-colors"
      >
        카카오톡 공유
      </button>
      <button
        onClick={handleCopyLink}
        className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
      >
        링크 복사
      </button>
    </div>
  )
}
