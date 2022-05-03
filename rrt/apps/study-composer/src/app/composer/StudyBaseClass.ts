import { shuffle } from '@rrt/shared/utility/helpers'; 
import { urls } from './urls/urls';
import { design } from './design/designConditions';
import { passages } from './passages/passages'; 

export type Step = Record<string, string | design | Array<design>>;
export type StudySteps = Array<Step>;
export class StudyStep {
    urls: Array<urls>;
    conditions: Array< design | Array<design> >;
    passages: passages;
    randomize: boolean;

    constructor(
        urls: Array<urls>, 
        conditions: Array< design | Array<design> > = [], 
        passages?: passages, 
        randomize = true
    ) {
        this.urls = urls;
        this.conditions = conditions;
        this.passages = passages;
        this.randomize = randomize;
    }
}
export class Study {
    name: string;
    studyParts: Array<StudyStep>;
    studySteps: StudySteps;
    debug: string;

    constructor(
        name: string, 
        studyParts: Array<StudyStep>,
        debug = 'no'
    ) {
        this.name = name;
        this.studyParts = studyParts;
        this.studySteps = this.createStudySteps(studyParts);
        this.debug = debug;
    }

    addStudyStep(newStudySteps: Array<Step>, urls: Array<string>, conditions: design | Array<design>): Array<Step> {
        for (const url of urls) {
            const step: Step = { url: url, condition: conditions };
            newStudySteps.push(step);
        }
        return newStudySteps;
    }

    createStudySteps(studyParts: Array<StudyStep>): Array<Step> {
        let newStudySteps: Array<Step> = [];
        for (const part of studyParts) {
            if (!part.conditions.length) { 
                newStudySteps = this.addStudyStep(newStudySteps, part.urls, [])
            } else {
                const conditions = (part.randomize ? shuffle(part.conditions) : part.conditions)
                for (const condition of conditions) {
                    newStudySteps = this.addStudyStep(newStudySteps, part.urls, condition)
                }
            }
        }
        return newStudySteps;
    }
}