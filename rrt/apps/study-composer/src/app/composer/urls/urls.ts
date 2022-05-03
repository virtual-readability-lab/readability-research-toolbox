/*
*
* Register the URLs for the apps that power specific studies
*
*/
export const urls = {
    reading_ruler_designer: '/apps/aleena/readingruler',
    instructions: '/apps/instructions',
    preference_pairwise: '/apps/preference/pairwise',
    preference_binary: '/apps/preference/binary',
    reading_test_one: '/apps/reading-test-one/',
    vrl_study_complete: '/apps/readability-testbed/vrl-study-complete',
} as const

/* TS magic to allow flexible lookup */
export type urls = typeof urls [
    keyof typeof urls
]