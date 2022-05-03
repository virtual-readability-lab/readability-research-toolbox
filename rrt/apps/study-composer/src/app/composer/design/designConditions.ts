/*
*
* Register the CSS class names or Functions to get CSS class names to redesign text
*
*/
export const design = {
    open_sans: 'open_sans',
    noto_sans: 'noto_sans',
    times: 'times',
    montserrat: 'montserrat',
    roboto: 'roboto',
    roboto_flex: 'roboto_flex',
    lato: 'lato',
    eb_garamond: 'eb_garamond',
    lexend_deca: 'lexend_deca',
    char_spacing_neg_1_em: 'char_spacing_neg_1_em',
    char_spacing_normal: 'char_spacing_normal',
    char_spacing_pos_p5_em: 'char_spacing_pos_p5_em',
    char_spacing_pos_1_em: 'char_spacing_pos_1_em',
    char_spacing_pos_1p5_em: 'char_spacing_pos_1p5_em',
    char_spacing_pos_2_em: 'char_spacing_pos_2_em',
    char_spacing_pos_3_em: 'char_spacing_pos_3_em',
    FavoriteOverall: getFavoriteOverall(),
    FavoriteStudy: getFavoriteStudy(),
} as const

/* TS magic to allow flexible lookup */
export type design = typeof design [
    keyof typeof design
]

function getFavoriteOverall(): string | Array<string> {
    /* TOOD --- should pull from Database */
    return 'noto_sans';
}

function getFavoriteStudy(): string | Array<string> {
    /* TOOD --- should pull from Database */
    return 'noto_sans';
}
