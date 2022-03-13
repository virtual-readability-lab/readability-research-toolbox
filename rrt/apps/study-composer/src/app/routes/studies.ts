import { highPrecisionTime } from '@rrt/shared/utility/helpers';
import { design } from '../composer/design/designConditions';
import { Study, StudySteps } from '../composer/StudyBaseClass';
import { Request, Response, Router } from 'express';
import { URL } from 'url';
const router = Router();

// read from URL
const defaultStudyStep = 0;
class StudyUrl {
    public userType = 'none';
    public studyStep = defaultStudyStep;
}

// handled server-side
interface StudyStatus {
    idStudy: string | number;
    userType: string | number;
    currentStudyStep: number;
    startedAt: number;
    lastInteraction: number;
}

export interface StudyInfo {
    studyStatus: StudyStatus,
    studySteps: StudySteps
}

function updateActiveStudy(req: Request, studyName: string, studySteps: StudySteps) {
    // check if session.studies exists
    if(req.session.studies) {
        req.session.studies = {};
    }
    // get url params
    const urlQuery = req.query;
    const studyUrl = new StudyUrl()
    Object.keys(studyUrl).map(key => {
        if(key in urlQuery) {
            studyUrl[key] = urlQuery[key];
        }
    });
    // update current status of user's study
    const studyStatus: StudyStatus = {
            idStudy: 0, // sw: TODO
            userType: studyUrl.userType,
            currentStudyStep: studyUrl.studyStep,
            startedAt: highPrecisionTime(), 
            lastInteraction: highPrecisionTime(),
        };
    const studyInfo: StudyInfo = {
        studyStatus: studyStatus,
        studySteps: studySteps
    }
    if(!req.session.studies[studyName] || studyUrl.studyStep > defaultStudyStep) {
        console.log('study session does not exists');
        req.session.studies[studyName] = studyInfo;
    } else {
        // resume or restart study? (if a user restarts the browser or presses the back button)
        console.log('study session EXISTS');
        req.session.studies[studyName] = studyInfo;
    }
    //console.log(req.session.studies);
}

interface UserStudyStep {
    idUser: unknown,
    idStudy: string | number,
    currentStudyStep: string | number,
    nextUrl: string | unknown,
    conditions: design | Array<design> | unknown
}

async function getNextSteps(nextStudyStep: number, studySteps: StudySteps) {
    let nextUrl: unknown = '';
    let conditions: unknown = [];
    //console.log(studySteps[nextStudyStep]);
    if (nextStudyStep < studySteps.length) {
        const studyStep = studySteps[nextStudyStep];
        nextUrl = studyStep.url;
        conditions = studyStep.conditions;
    }
    return [nextUrl, conditions];
}

/*
* Retrieves non-PII user info for client side user
*/
router.get(`/studies/:studyName/user`, async (req: Request, res: Response) => {
    const studyName: string = req.params.studyName;
    try {
        const currentStudyStep = req.session.studies[studyName].studyStatus.currentStudyStep + 1;
        const [nextUrl, conditions ] = await getNextSteps(currentStudyStep, req.session.studies[studyName].studySteps);
        const userStudyStep: UserStudyStep = {
            idUser: req.session.user.idUser,
            idStudy: req.session.studies[studyName].studyStatus.idStudy,
            currentStudyStep: currentStudyStep,
            nextUrl: nextUrl,
            conditions: conditions,
        }
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(userStudyStep));
    } catch (error) {
        console.log(error);
        res.status(404);
        res.send(`Sorry we could not find the user's info for study ${studyName}. :/`);
    }
});

/*
* Increments the Study Step and then Redirects User to the next URL
*/
router.get(`/studies/:studyName/next`, async (req: Request, res: Response) => {
    const studyName: string = req.params.studyName;
    try {
        req.session.studies[studyName].studyStatus.currentStudyStep++;
        const currentStudyStep = req.session.studies[studyName].studyStatus.currentStudyStep;
        const [ nextUrl ] = await getNextSteps(currentStudyStep, req.session.studies[studyName].studySteps);
        console.log(nextUrl)
        // TODO: replace base URL with nextUrl
        const redirectUrl = `/studies/${studyName}/user?studyName=${studyName}`
        res.redirect(redirectUrl);
    } catch (error) {
        console.log(error);
        res.status(404);
        res.send(`Sorry we could not find the user's info for study ${studyName}. :/`);
    }
});

/*
* This endpoint programatically reads the folder studies
*/
router.get(`/studies/:studyName`, async (req: Request, res: Response) => {
    const studyName: string = req.params.studyName;
    try {
        const study: Record<string, Study> = await import(`../studies/${studyName}`);
        updateActiveStudy(req, studyName, study[studyName].studySteps);
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(study[studyName], null, 2));
        // will need to redirect to appropriate URL
    } catch (error) {
        console.log(error);
        res.status(404);
        res.send(`Sorry we could not find the study ${studyName}. :/`);
    }
});

export default router;
