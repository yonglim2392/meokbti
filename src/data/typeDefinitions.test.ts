import { describe, it, expect } from 'vitest'
import { typeDefinitions, getTypeByCode } from './typeDefinitions'

describe('getTypeByCode', () => {
  it('returns the correct type definition for a valid code', () => {
    const result = getTypeByCode('GJEH')
    expect(result).toBeDefined()
    expect(result?.name).toBe('예약 맛집 탐험가')
  })

  it('returns undefined for a non-existent code', () => {
    expect(getTypeByCode('AAAA')).toBeUndefined()
  })

  it('returns undefined for an empty string', () => {
    expect(getTypeByCode('')).toBeUndefined()
  })

  it('returns undefined for lowercase code', () => {
    expect(getTypeByCode('gjeh')).toBeUndefined()
  })

  it('covers all 16 type codes', () => {
    const codes = typeDefinitions.map(t => t.code)
    expect(codes).toHaveLength(16)
    for (const code of codes) {
      expect(getTypeByCode(code)).toBeDefined()
    }
  })

  it('each type has valid compatibleTypes pointing to existing codes', () => {
    const allCodes = new Set(typeDefinitions.map(t => t.code))
    for (const typeDef of typeDefinitions) {
      for (const compatible of typeDef.compatibleTypes) {
        expect(allCodes.has(compatible)).toBe(true)
      }
      expect(allCodes.has(typeDef.conflictType)).toBe(true)
    }
  })
})
