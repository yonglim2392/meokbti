export type Axis = 'gp' | 'js' | 'er' | 'hm'

export type TypeCode = string

export interface QuizQuestion {
  id: number
  axis: Axis
  text: string
  optionA: string
  optionB: string
}

export interface AxisScores {
  gp: number // 0–100, G(미식) 퍼센트
  js: number // 0–100, J(계획) 퍼센트
  er: number // 0–100, E(탐험) 퍼센트
  hm: number // 0–100, H(자극) 퍼센트
}

export interface QuizResult {
  typeCode: TypeCode
  scores: AxisScores
}

export interface TypeDefinition {
  code: TypeCode
  name: string
  description: string
  compatibleTypes: [TypeCode, TypeCode]
  conflictType: TypeCode
}
