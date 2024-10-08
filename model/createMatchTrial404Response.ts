/**
 * OptHub REST API
 * OptHub Public REST API.
 *
 * The version of the OpenAPI document: 0.3.0
 * Contact: dev@opthub.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { RequestFile } from './models';

export class CreateMatchTrial404Response {
    'code'?: CreateMatchTrial404Response.CodeEnum;
    'message'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "code",
            "baseName": "code",
            "type": "CreateMatchTrial404Response.CodeEnum"
        },
        {
            "name": "message",
            "baseName": "message",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return CreateMatchTrial404Response.attributeTypeMap;
    }
}

export namespace CreateMatchTrial404Response {
    export enum CodeEnum {
        MatchNotFound = <any> 'MatchNotFound',
        CompetitionNotFound = <any> 'CompetitionNotFound'
    }
}
