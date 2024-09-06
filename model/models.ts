import localVarRequest from 'request';

export * from './authErrorCode';
export * from './authErrorResponse';
export * from './createMatchTrial400Response';
export * from './createMatchTrial403Response';
export * from './createMatchTrial404Response';
export * from './createMatchTrialRequest';
export * from './getMatchEvaluation404Response';
export * from './getMatchScore404Response';
export * from './getMatchTrial403Response';
export * from './getMatchTrial404Response';
export * from './getSolution404Response';
export * from './matchTrialEvaluation';
export * from './matchTrialResponse';
export * from './matchTrialScore';
export * from './matchTrialStatus';
export * from './runnerStatus';
export * from './scalarOrVector';
export * from './serverErrorCode';
export * from './serverErrorResponse';
export * from './solution';

import * as fs from 'fs';

export interface RequestDetailedFile {
    value: Buffer;
    options?: {
        filename?: string;
        contentType?: string;
    }
}

export type RequestFile = string | Buffer | fs.ReadStream | RequestDetailedFile;


import { AuthErrorCode } from './authErrorCode';
import { AuthErrorResponse } from './authErrorResponse';
import { CreateMatchTrial400Response } from './createMatchTrial400Response';
import { CreateMatchTrial403Response } from './createMatchTrial403Response';
import { CreateMatchTrial404Response } from './createMatchTrial404Response';
import { CreateMatchTrialRequest } from './createMatchTrialRequest';
import { GetMatchEvaluation404Response } from './getMatchEvaluation404Response';
import { GetMatchScore404Response } from './getMatchScore404Response';
import { GetMatchTrial403Response } from './getMatchTrial403Response';
import { GetMatchTrial404Response } from './getMatchTrial404Response';
import { GetSolution404Response } from './getSolution404Response';
import { MatchTrialEvaluation } from './matchTrialEvaluation';
import { MatchTrialResponse } from './matchTrialResponse';
import { MatchTrialScore } from './matchTrialScore';
import { MatchTrialStatus } from './matchTrialStatus';
import { RunnerStatus } from './runnerStatus';
import { ScalarOrVector } from './scalarOrVector';
import { ServerErrorCode } from './serverErrorCode';
import { ServerErrorResponse } from './serverErrorResponse';
import { Solution } from './solution';

/* tslint:disable:no-unused-variable */
let primitives = [
                    "string",
                    "boolean",
                    "double",
                    "integer",
                    "long",
                    "float",
                    "number",
                    "any"
                 ];

let enumsMap: {[index: string]: any} = {
        "AuthErrorCode": AuthErrorCode,
        "CreateMatchTrial400Response.CodeEnum": CreateMatchTrial400Response.CodeEnum,
        "CreateMatchTrial403Response.CodeEnum": CreateMatchTrial403Response.CodeEnum,
        "CreateMatchTrial404Response.CodeEnum": CreateMatchTrial404Response.CodeEnum,
        "GetMatchEvaluation404Response.CodeEnum": GetMatchEvaluation404Response.CodeEnum,
        "GetMatchScore404Response.CodeEnum": GetMatchScore404Response.CodeEnum,
        "GetMatchTrial403Response.CodeEnum": GetMatchTrial403Response.CodeEnum,
        "GetMatchTrial404Response.CodeEnum": GetMatchTrial404Response.CodeEnum,
        "GetSolution404Response.CodeEnum": GetSolution404Response.CodeEnum,
        "MatchTrialStatus": MatchTrialStatus,
        "RunnerStatus": RunnerStatus,
        "ServerErrorCode": ServerErrorCode,
}

let typeMap: {[index: string]: any} = {
    "AuthErrorResponse": AuthErrorResponse,
    "CreateMatchTrial400Response": CreateMatchTrial400Response,
    "CreateMatchTrial403Response": CreateMatchTrial403Response,
    "CreateMatchTrial404Response": CreateMatchTrial404Response,
    "CreateMatchTrialRequest": CreateMatchTrialRequest,
    "GetMatchEvaluation404Response": GetMatchEvaluation404Response,
    "GetMatchScore404Response": GetMatchScore404Response,
    "GetMatchTrial403Response": GetMatchTrial403Response,
    "GetMatchTrial404Response": GetMatchTrial404Response,
    "GetSolution404Response": GetSolution404Response,
    "MatchTrialEvaluation": MatchTrialEvaluation,
    "MatchTrialResponse": MatchTrialResponse,
    "MatchTrialScore": MatchTrialScore,
    "ScalarOrVector": ScalarOrVector,
    "ServerErrorResponse": ServerErrorResponse,
    "Solution": Solution,
}

export class ObjectSerializer {
    public static findCorrectType(data: any, expectedType: string) {
        if (data == undefined) {
            return expectedType;
        } else if (primitives.indexOf(expectedType.toLowerCase()) !== -1) {
            return expectedType;
        } else if (expectedType === "Date") {
            return expectedType;
        } else {
            if (enumsMap[expectedType]) {
                return expectedType;
            }

            if (!typeMap[expectedType]) {
                return expectedType; // w/e we don't know the type
            }

            // Check the discriminator
            let discriminatorProperty = typeMap[expectedType].discriminator;
            if (discriminatorProperty == null) {
                return expectedType; // the type does not have a discriminator. use it.
            } else {
                if (data[discriminatorProperty]) {
                    var discriminatorType = data[discriminatorProperty];
                    if(typeMap[discriminatorType]){
                        return discriminatorType; // use the type given in the discriminator
                    } else {
                        return expectedType; // discriminator did not map to a type
                    }
                } else {
                    return expectedType; // discriminator was not present (or an empty string)
                }
            }
        }
    }

    public static serialize(data: any, type: string) {
        if (data == undefined) {
            return data;
        } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        } else if (type.lastIndexOf("Array<", 0) === 0) { // string.startsWith pre es6
            let subType: string = type.replace("Array<", ""); // Array<Type> => Type>
            subType = subType.substring(0, subType.length - 1); // Type> => Type
            let transformedData: any[] = [];
            for (let index = 0; index < data.length; index++) {
                let datum = data[index];
                transformedData.push(ObjectSerializer.serialize(datum, subType));
            }
            return transformedData;
        } else if (type === "Date") {
            return data.toISOString();
        } else {
            if (enumsMap[type]) {
                return data;
            }
            if (!typeMap[type]) { // in case we dont know the type
                return data;
            }

            // Get the actual type of this object
            type = this.findCorrectType(data, type);

            // get the map for the correct type.
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            let instance: {[index: string]: any} = {};
            for (let index = 0; index < attributeTypes.length; index++) {
                let attributeType = attributeTypes[index];
                instance[attributeType.baseName] = ObjectSerializer.serialize(data[attributeType.name], attributeType.type);
            }
            return instance;
        }
    }

    public static deserialize(data: any, type: string) {
        // polymorphism may change the actual type.
        type = ObjectSerializer.findCorrectType(data, type);
        if (data == undefined) {
            return data;
        } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        } else if (type.lastIndexOf("Array<", 0) === 0) { // string.startsWith pre es6
            let subType: string = type.replace("Array<", ""); // Array<Type> => Type>
            subType = subType.substring(0, subType.length - 1); // Type> => Type
            let transformedData: any[] = [];
            for (let index = 0; index < data.length; index++) {
                let datum = data[index];
                transformedData.push(ObjectSerializer.deserialize(datum, subType));
            }
            return transformedData;
        } else if (type === "Date") {
            return new Date(data);
        } else {
            if (enumsMap[type]) {// is Enum
                return data;
            }

            if (!typeMap[type]) { // dont know the type
                return data;
            }
            let instance = new typeMap[type]();
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            for (let index = 0; index < attributeTypes.length; index++) {
                let attributeType = attributeTypes[index];
                instance[attributeType.name] = ObjectSerializer.deserialize(data[attributeType.baseName], attributeType.type);
            }
            return instance;
        }
    }
}

export interface Authentication {
    /**
    * Apply authentication settings to header and query params.
    */
    applyToRequest(requestOptions: localVarRequest.Options): Promise<void> | void;
}

export class HttpBasicAuth implements Authentication {
    public username: string = '';
    public password: string = '';

    applyToRequest(requestOptions: localVarRequest.Options): void {
        requestOptions.auth = {
            username: this.username, password: this.password
        }
    }
}

export class HttpBearerAuth implements Authentication {
    public accessToken: string | (() => string) = '';

    applyToRequest(requestOptions: localVarRequest.Options): void {
        if (requestOptions && requestOptions.headers) {
            const accessToken = typeof this.accessToken === 'function'
                            ? this.accessToken()
                            : this.accessToken;
            requestOptions.headers["Authorization"] = "Bearer " + accessToken;
        }
    }
}

export class ApiKeyAuth implements Authentication {
    public apiKey: string = '';

    constructor(private location: string, private paramName: string) {
    }

    applyToRequest(requestOptions: localVarRequest.Options): void {
        if (this.location == "query") {
            (<any>requestOptions.qs)[this.paramName] = this.apiKey;
        } else if (this.location == "header" && requestOptions && requestOptions.headers) {
            requestOptions.headers[this.paramName] = this.apiKey;
        } else if (this.location == 'cookie' && requestOptions && requestOptions.headers) {
            if (requestOptions.headers['Cookie']) {
                requestOptions.headers['Cookie'] += '; ' + this.paramName + '=' + encodeURIComponent(this.apiKey);
            }
            else {
                requestOptions.headers['Cookie'] = this.paramName + '=' + encodeURIComponent(this.apiKey);
            }
        }
    }
}

export class OAuth implements Authentication {
    public accessToken: string = '';

    applyToRequest(requestOptions: localVarRequest.Options): void {
        if (requestOptions && requestOptions.headers) {
            requestOptions.headers["Authorization"] = "Bearer " + this.accessToken;
        }
    }
}

export class VoidAuth implements Authentication {
    public username: string = '';
    public password: string = '';

    applyToRequest(_: localVarRequest.Options): void {
        // Do nothing
    }
}

export type Interceptor = (requestOptions: localVarRequest.Options) => (Promise<void> | void);
