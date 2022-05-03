export const passages = {
    none: 'none',
    eigth_grade_speed: 'eigth_grade_speed',
    twelfth_grade_speed_comp: 'twelfth_grade_speed_comp',
    twelfth_grade_speed_comp_trust: 'twelfth_grade_speed_comp_trust',
    preference: 'preference'
} as const

/* TS magic to allow flexible lookup */
export type passages = typeof passages [
    keyof typeof passages
]