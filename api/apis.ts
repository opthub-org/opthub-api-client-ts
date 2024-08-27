export * from './aliasApi';
import { AliasApi } from './aliasApi';
export * from './competitionApi';
import { CompetitionApi } from './competitionApi';
export * from './matchApi';
import { MatchApi } from './matchApi';
export * from './participantApi';
import { ParticipantApi } from './participantApi';
export * from './solutionApi';
import { SolutionApi } from './solutionApi';
import * as http from 'http';

export class HttpError extends Error {
    constructor (public response: http.IncomingMessage, public body: any, public statusCode?: number) {
        super('HTTP request failed');
        this.name = 'HttpError';
    }
}

export { RequestFile } from '../model/models';

export const APIS = [AliasApi, CompetitionApi, MatchApi, ParticipantApi, SolutionApi];
