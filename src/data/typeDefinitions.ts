import type { TypeDefinition } from '../types'

export const typeDefinitions: TypeDefinition[] = [
  {
    code: 'GJEH',
    name: '예약 맛집 탐험가',
    description: '당신은 먹기 위해 사는 사람입니다. 새 식당 오픈 소식에 가장 먼저 반응하고, 여행 계획의 절반은 맛집 리스트가 차지합니다. 자극적이고 강렬한 맛을 사랑하며 새 메뉴가 나오면 반드시 시도해야 직성이 풀리죠. 미리 예약하고 동선까지 짜두는 철저함이 있어서, 함께 가는 사람이 "그냥 아무 데나 가자"고 하면 속이 답답합니다.',
    compatibleTypes: ['GJEM', 'GSEH'],
    conflictType: 'PSRM',
  },
  {
    code: 'GJEM',
    name: '예약 맛집 순례자',
    description: '맛을 진지하게 생각하는 당신은 식사 약속이 잡히면 어디서 먹을지 미리 꼼꼼히 알아봅니다. 새로운 식당을 탐험하는 걸 즐기지만, 자극적인 맛보다는 재료의 맛을 살린 정갈한 음식에서 행복을 느낍니다. 오마카세, 한정식, 골목 숨겨진 맛집이 당신의 영역입니다.',
    compatibleTypes: ['GJEH', 'GSEM'],
    conflictType: 'PSRH',
  },
  {
    code: 'GJRH',
    name: '단골 맛집 고집러',
    description: '검증된 맛집만 고집하는 당신은 믿을 수 있는 맛을 사랑합니다. 미리 알아보고 예약하는 성향이지만, 굳이 새 곳을 개척할 필요를 느끼지 못합니다. 자극적이고 강렬한 맛을 즐기며, 단골 매운 음식 식당이 여러 개 있을 것입니다.',
    compatibleTypes: ['GJRM', 'GSRH'],
    conflictType: 'PSEM',
  },
  {
    code: 'GJRM',
    name: '단골 맛집 미식가',
    description: '당신에게 식사는 편안한 행복입니다. 좋아하는 맛집을 미리 알아보고 예약하지만, 새로운 곳보다는 늘 가던 데서 담백하고 정갈한 음식을 먹는 게 최고입니다. 언제 가도 변하지 않는 그 집 그 메뉴가 주는 안정감을 사랑합니다.',
    compatibleTypes: ['GJRH', 'GSRM'],
    conflictType: 'PSEH',
  },
  {
    code: 'GSEH',
    name: '즉흥 맛집 헌터',
    description: '맛있는 게 최우선이지만, 계획 없이 발견하는 스릴을 즐기는 당신. 걸어가다 줄 선 식당을 발견하면 바로 서고, 강렬한 맛의 새 메뉴를 보면 참지 못합니다. 함께 가는 사람이 "미리 예약해놨어"라고 하면 살짝 답답할 수도 있어요.',
    compatibleTypes: ['GSEM', 'GJEH'],
    conflictType: 'PJRM',
  },
  {
    code: 'GSEM',
    name: '즉흥 미식 탐험가',
    description: '맛있는 음식에 진심이지만 계획은 세우지 않는 당신. 그날의 기분과 발길이 이끄는 대로 식당을 선택합니다. 자극적인 맛보다는 깔끔하고 좋은 재료의 맛을 선호하며, 우연히 발견한 숨겨진 보석 같은 식당에서 가장 큰 행복을 느낍니다.',
    compatibleTypes: ['GSEH', 'GJEM'],
    conflictType: 'PJRH',
  },
  {
    code: 'GSRH',
    name: '불금 단골집 왕',
    description: '맛있는 게 최고고, 고민 없이 늘 가던 곳으로 직행하는 당신. 오늘도 그 매운 떡볶이 집, 그 불닭집입니다. 즉흥적이지만 선택지는 이미 검증되어 있어서 헤매지 않습니다.',
    compatibleTypes: ['GSRM', 'GJRH'],
    conflictType: 'PJEM',
  },
  {
    code: 'GSRM',
    name: '편안한 미식 추구형',
    description: '맛있는 걸 좋아하지만 과하지 않게, 즉흥적으로 찾아가는 당신. 늘 가던 담백한 음식 집에서 편안하게 먹는 게 최고입니다. 식사에 큰 에너지를 쏟지 않으면서도 막상 먹을 때는 맛있는 걸 제대로 고릅니다.',
    compatibleTypes: ['GSRH', 'GJRM'],
    conflictType: 'PJEH',
  },
  {
    code: 'PJEH',
    name: '효율 탐험 계획러',
    description: '빠르고 효율적으로 먹되, 새로운 음식에 도전하는 것도 좋아합니다. 미리 검색하고 새로 생긴 식당을 리스트에 추가하지만, 맛보다는 접근성과 합리적인 가격이 우선입니다. 자극적인 맛을 즐기며 빠르게 먹고 다음 일정으로 넘어갑니다.',
    compatibleTypes: ['PJEM', 'PSEH'],
    conflictType: 'GSRM',
  },
  {
    code: 'PJEM',
    name: '건강 맛집 계획형',
    description: '효율적으로 먹되 건강하고 담백하게. 미리 검색해서 영양이 좋거나 가성비 높은 새로운 식당을 찾습니다. 자극적인 맛보다는 몸에 좋고 깔끔한 음식을 선호합니다.',
    compatibleTypes: ['PJEH', 'PSEM'],
    conflictType: 'GSRH',
  },
  {
    code: 'PJRH',
    name: '점심 루틴 고수',
    description: '당신의 점심은 이미 정해져 있습니다. 빠르고, 매콤하고, 믿을 수 있는 단골 집. 굳이 새 곳을 찾아다닐 필요가 없습니다. 이미 검증된 루틴으로 효율과 맛을 동시에 잡았습니다.',
    compatibleTypes: ['PJRM', 'PSRH'],
    conflictType: 'GSEM',
  },
  {
    code: 'PJRM',
    name: '조용한 점심 계획형',
    description: '복잡하지 않게, 미리 알아두고, 담백하게. 당신의 식사 철학입니다. 늘 가는 깔끔한 식당에서 조용하게 밥 한 끼 해결하는 게 최고입니다. 식사는 편안한 휴식입니다.',
    compatibleTypes: ['PJRH', 'PSRM'],
    conflictType: 'GSEH',
  },
  {
    code: 'PSEH',
    name: '즉흥 도전 실용형',
    description: '일단 빠르게 먹어야 하는데, 새로운 곳이 보이면 한 번 들어가 봅니다. 계획은 없지만 자극적인 맛을 찾아 즉흥적으로 움직이는 편입니다. 식사에 너무 많은 에너지를 쏟지 않으면서도 나름의 탐험을 즐깁니다.',
    compatibleTypes: ['PSEM', 'PJEH'],
    conflictType: 'GJRM',
  },
  {
    code: 'PSEM',
    name: '가볍게 먹는 탐험형',
    description: '배고프면 그냥 들어가는 타입이지만, 새로운 음식 먹어보는 것도 좋아합니다. 자극적이지 않고 깔끔한 새 음식을 가볍게 탐험하는 당신. 식사 친구로서 유연하고 함께하기 편한 유형입니다.',
    compatibleTypes: ['PSEH', 'PJEM'],
    conflictType: 'GJRH',
  },
  {
    code: 'PSRH',
    name: '퇴근길 단골 마니아',
    description: '오늘도 그 집입니다. 계획 없이 퇴근길에 발걸음이 자동으로 향하는 단골 매운 음식 집. 복잡하게 생각하지 않습니다. 빠르고, 맛있고, 매운 거면 충분합니다.',
    compatibleTypes: ['PSRM', 'PJRH'],
    conflictType: 'GJEM',
  },
  {
    code: 'PSRM',
    name: '아무거나 잘 먹는 형',
    description: '당신은 식사에 있어 가장 자유로운 영혼입니다. 즉흥적으로 결정하고, 늘 먹던 걸 선택하고, 자극적이지 않아도 됩니다. 함께 먹는 사람이 어디서든 먹자고 하면 언제나 OK. 식사 메이트로서 최고의 유형입니다.',
    compatibleTypes: ['PSRH', 'PJRM'],
    conflictType: 'GJEH',
  },
]

export function getTypeByCode(code: string): TypeDefinition | undefined {
  return typeDefinitions.find(t => t.code === code)
}
