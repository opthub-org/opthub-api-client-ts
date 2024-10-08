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
import { ScalarOrVector } from './scalarOrVector';

/**
* Solution space variable
*/
export class CreateMatchTrialRequest {
    'variable'?: ScalarOrVector;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "variable",
            "baseName": "variable",
            "type": "ScalarOrVector"
        }    ];

    static getAttributeTypeMap() {
        return CreateMatchTrialRequest.attributeTypeMap;
    }
}

