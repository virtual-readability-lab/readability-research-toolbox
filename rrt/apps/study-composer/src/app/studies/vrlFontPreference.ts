import { Study, StudyStep } from '../composer/StudyBaseClass';
import { urls } from '../composer/urls/urls'
import { design } from '../composer/design/designConditions'
import { passages } from '../composer/passages/passages'

const studyName = 'vrlFontPreference';

export const studySteps = [
    new StudyStep(
        [urls.instructions]
    ),
    new StudyStep( // 1 app uses all conditions
        [urls.preference_pairwise], 
        [[
            design.times, design.roboto, 
            design.noto_sans, design.eb_garamond, 
            design.lexend_deca, design.montserrat
        ]],
        passages.preference
    ),
    new StudyStep(
        [urls.vrl_study_complete]
    )
]

// name must match filename
export const vrlFontPreference = new Study( studyName, studySteps )