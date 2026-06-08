import type { AxisScores, TypeCode } from '../types'

export function encodeResultToUrl(typeCode: TypeCode, scores: AxisScores): string {
  return `?type=${typeCode}&s=${scores.gp}-${scores.js}-${scores.er}-${scores.hm}`
}

export function decodeResultFromUrl(
  search: string
): { typeCode: TypeCode; scores: AxisScores } | null {
  const params = new URLSearchParams(search)
  const type = params.get('type')
  const s = params.get('s')

  if (!type || !s || !/^[A-Z]{4}$/.test(type)) return null

  const parts = s.split('-').map(Number)
  if (parts.length !== 4 || parts.some(isNaN)) return null
  if (parts.some(p => p < 0 || p > 100)) return null

  return {
    typeCode: type,
    scores: { gp: parts[0], js: parts[1], er: parts[2], hm: parts[3] },
  }
}
