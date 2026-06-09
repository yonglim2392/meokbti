import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ShareButton } from './ShareButton'

const mockScores = { gp: 80, js: 60, er: 90, hm: 70 }

describe('ShareButton', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('renders share and copy link buttons', () => {
    render(<ShareButton typeCode="GJEH" typeName="예약 맛집 탐험가" scores={mockScores} />)
    expect(screen.getByText('공유하기')).toBeInTheDocument()
    expect(screen.getByText('링크 복사')).toBeInTheDocument()
  })

  describe('when navigator.share is available', () => {
    it('calls navigator.share with correct args when 공유하기 clicked', async () => {
      const mockShare = vi.fn().mockResolvedValue(undefined)
      vi.stubGlobal('navigator', { ...navigator, share: mockShare })

      render(<ShareButton typeCode="GJEH" typeName="예약 맛집 탐험가" scores={mockScores} />)
      await userEvent.click(screen.getByText('공유하기'))

      expect(mockShare).toHaveBeenCalledWith(expect.objectContaining({
        title: expect.stringContaining('GJEH'),
        url: expect.stringContaining('/result'),
      }))
    })

    it('does not call clipboard when navigator.share succeeds', async () => {
      const mockShare = vi.fn().mockResolvedValue(undefined)
      const mockWriteText = vi.fn()
      vi.stubGlobal('navigator', { share: mockShare, clipboard: { writeText: mockWriteText } })

      render(<ShareButton typeCode="GJEH" typeName="예약 맛집 탐험가" scores={mockScores} />)
      await userEvent.click(screen.getByText('공유하기'))

      expect(mockWriteText).not.toHaveBeenCalled()
    })
  })

  describe('when navigator.share is NOT available', () => {
    it('calls clipboard.writeText when 공유하기 clicked', async () => {
      const mockWriteText = vi.fn().mockResolvedValue(undefined)
      vi.stubGlobal('navigator', { clipboard: { writeText: mockWriteText } })

      render(<ShareButton typeCode="GJEH" typeName="예약 맛집 탐험가" scores={mockScores} />)
      await userEvent.click(screen.getByText('공유하기'))

      expect(mockWriteText).toHaveBeenCalledWith(expect.stringContaining('/result'))
    })
  })

  describe('링크 복사 button', () => {
    it('calls clipboard.writeText when clicked', async () => {
      const mockWriteText = vi.fn().mockResolvedValue(undefined)
      vi.stubGlobal('navigator', { clipboard: { writeText: mockWriteText } })

      render(<ShareButton typeCode="GJEH" typeName="예약 맛집 탐험가" scores={mockScores} />)
      await userEvent.click(screen.getByText('링크 복사'))

      expect(mockWriteText).toHaveBeenCalledWith(expect.stringContaining('/result'))
    })

    it('shows failure alert when clipboard write fails', async () => {
      const mockWriteText = vi.fn().mockRejectedValue(new Error('denied'))
      const mockAlert = vi.fn()
      vi.stubGlobal('navigator', { clipboard: { writeText: mockWriteText } })
      vi.stubGlobal('alert', mockAlert)

      render(<ShareButton typeCode="GJEH" typeName="예약 맛집 탐험가" scores={mockScores} />)
      await userEvent.click(screen.getByText('링크 복사'))

      expect(mockAlert).toHaveBeenCalledWith('링크 복사에 실패했습니다. 다시 시도해주세요.')
    })
  })
})
