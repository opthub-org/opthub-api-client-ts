/**
 * OptHub REST API
 * OptHub Public REST API.
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: dev@opthub.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { RequestFile } from './models';

/**
* 解
*/
export class Solution {
    /**
    * Match ID
    */
    'matchId': string;
    /**
    * Trial number
    */
    'trialNo': number;
    /**
    * Solution space variable
    */
    'variable': Array<number>;
    /**
    * Creation date and time
    */
    'createdAt': Date;
    /**
    * ID of the user who created it
    */
    'userId'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "matchId",
            "baseName": "matchId",
            "type": "string"
        },
        {
            "name": "trialNo",
            "baseName": "trialNo",
            "type": "number"
        },
        {
            "name": "variable",
            "baseName": "variable",
            "type": "Array<number>"
        },
        {
            "name": "createdAt",
            "baseName": "createdAt",
            "type": "Date"
        },
        {
            "name": "userId",
            "baseName": "userId",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return Solution.attributeTypeMap;
    }
}

