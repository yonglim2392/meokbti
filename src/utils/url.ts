import type { AxisScores, TypeCode, Axis } from '../types'

const AXIS_ORDER: Axis[] = ['gp', 'js', 'er', 'hm']

export function encodeResultToUrl(typeCode: TypeCode, scores: AxisScores): string {
  return `?type=${typeCode}&s=${AXIS_ORDER.map(a => scores[a]).join('-')}`
}

export function decodeResultFromUrl(
  search: string
): { typeCode: TypeCode; scores: AxisScores } | null {
  const params = new URLSearchParams(search)
  const type = params.get('type')
  const s = params.get('s')

  if (!type || !s || !/^[A-Z]{4}$/.test(type)) return null

  const parts = s.split('-').map(Number)
  if (parts.length !== AXIS_ORDER.length || parts.some(isNaN)) return null
  if (parts.some(p => p < 0 || p > 100)) return null

  return {
    typeCode: type,
    scores: Object.fromEntries(AXIS_ORDER.map((a, i) => [a, parts[i]])) as unknown as AxisScores,
  }
}
