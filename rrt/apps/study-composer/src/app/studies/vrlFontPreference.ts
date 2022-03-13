import { Study, StudyStep } from '../composer/StudyBaseClass';
import { urls } from '../composer/urls/urls'
import { design } from '../composer/design/designConditions'
import { passages } from '../composer/passages/passages'

export const studySteps = [
    new StudyStep(
        [urls.instructions, urls.reading_test_one], 
        [design.noto_sans],
        passages.eigth_grade_speed
    ),
    new StudyStep(
        [urls.instructions, urls.preference_pairwise, urls.preference_binary], 
        [design.lato, design.times],
        passages.eigth_grade_speed
    ),
    new StudyStep(
        [urls.instructions]
    )
]

export const exampleStudy = new Study(
    'vrlFavorite', studySteps
);

export function getStudy() {
    console.log(exampleStudy);
}