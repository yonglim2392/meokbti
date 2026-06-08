import { describe, it, expect } from 'vitest'
import { encodeResultToUrl, decodeResultFromUrl } from './url'

describe('encodeResultToUrl', () => {
  it('encodes type code and scores into query string', () => {
    const result = encodeResultToUrl('GJEH', { gp: 80, js: 60, er: 90, hm: 70 })
    expect(result).toBe('?type=GJEH&s=80-60-90-70')
  })
})

describe('decodeResultFromUrl', () => {
  it('decodes valid query string', () => {
    expect(decodeResultFromUrl('?type=GJEH&s=80-60-90-70')).toEqual({
      typeCode: 'GJEH',
      scores: { gp: 80, js: 60, er: 90, hm: 70 },
    })
  })

  it('returns null when type param is missing', () => {
    expect(decodeResultFromUrl('?s=80-60-90-70')).toBeNull()
  })

  it('returns null when s param is missing', () => {
    expect(decodeResultFromUrl('?type=GJEH')).toBeNull()
  })

  it('returns null when s has wrong number of parts', () => {
    expect(decodeResultFromUrl('?type=GJEH&s=80-60')).toBeNull()
  })

  it('returns null when s contains non-numeric values', () => {
    expect(decodeResultFromUrl('?type=GJEH&s=a-b-c-d')).toBeNull()
  })
})
