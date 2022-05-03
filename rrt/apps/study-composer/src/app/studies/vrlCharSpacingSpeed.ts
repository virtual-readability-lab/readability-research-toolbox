import { Study, StudyStep } from '../composer/StudyBaseClass';
import { urls } from '../composer/urls/urls'
import { design } from '../composer/design/designConditions'
import { passages } from '../composer/passages/passages'

const studyName = 'vrlCharSpacingSpeed';

const studySteps = [
    new StudyStep(
        [urls.instructions], 
        [],
        passages.eigth_grade_speed
    ),
    new StudyStep(
        [urls.instructions, urls.preference_pairwise, urls.preference_binary], 
        [design.char_spacing_neg_1_em, design.char_spacing_normal,  design.char_spacing_pos_1_em, design.char_spacing_pos_3_em],
        passages.eigth_grade_speed
    ),
    new StudyStep(
        [urls.instructions]
    )
]

// name must match filename
export const vrlCharSpacingSpeed: Study = new Study( studyName, studySteps )