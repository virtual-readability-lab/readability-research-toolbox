export const passages = {
    none: '',
    eigth_grade_speed: '',
    twelfth_grade_speed_comp: '',
    twelfth_grade_speed_comp_trust: '',
    preference: ''
} as const

/* TS magic to allow flexible lookup */
export type passages = typeof passages [
    keyof typeof passages
]