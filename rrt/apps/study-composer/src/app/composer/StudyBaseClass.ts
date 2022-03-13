import { shuffle } from '@rrt/shared/utility/helpers';
import { urls } from './urls/urls';
import { design } from './design/designConditions';
import { passages } from './passages/passages'; 

export class StudyStep {
    urls: Array<urls>;
    conditions: Array<design>;
    passages: passages;
    randomize?: boolean = true;

    constructor(
        urls: Array<urls>, 
        conditions: Array<design> = [], 
        passages?: passages, 
        randomize?: boolean
    ) {
        this.urls = urls;
        this.conditions = conditions;
        this.passages = passages;
        this.randomize = randomize;
    }
}

export class Study {
    name: string;
    debug?: boolean = true;
    studyParts: Array<StudyStep>;
    studySteps: Array<Record<string, unknown>>;

    constructor(
        name: string, 
        studyParts: Array<StudyStep>
    ) {
        this.name = name;
        this.studyParts = studyParts;
        this.studySteps = this.createStudySteps(studyParts);
    }

    createStudySteps(studyParts: Array<StudyStep>): Array<Record<string, unknown>> {
        // eslint-disable-next-line prefer-const
        let studySteps = [];
        for (const part of studyParts) {
            const conditions = (part.randomize ? shuffle(part.conditions) : part.conditions)
            for (const condition of conditions) {
                for (const url of part.urls) {
                    studySteps.push({ url: url, condition: condition });
                }
            }
        }
        return studySteps;
    }
}