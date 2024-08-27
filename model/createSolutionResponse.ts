/**
 * OptHub REST API
 * OptHub Public REST API.
 *
 * The version of the OpenAPI document: 0.1.1
 * Contact: dev@opthub.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { RequestFile } from './models';

/**
* Information of the created solution
*/
export class CreateSolutionResponse {
    /**
    * Participant ID
    */
    'participantId': string;
    /**
    * Trial number
    */
    'trialNo': number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "participantId",
            "baseName": "participantId",
            "type": "string"
        },
        {
            "name": "trialNo",
            "baseName": "trialNo",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return CreateSolutionResponse.attributeTypeMap;
    }
}

