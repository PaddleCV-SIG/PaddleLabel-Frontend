/* tslint:disable */
/* eslint-disable */
/**
 * PaddleLabel API Specs
 * Back end APIs for PP-Label
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: me@linhan.email
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 *
 * @export
 * @interface CreateCache200Response
 */
export interface CreateCache200Response {
  /**
   *
   * @type {string}
   * @memberof CreateCache200Response
   */
  cacheId?: string;
}

/**
 * Check if a given object implements the CreateCache200Response interface.
 */
export function instanceOfCreateCache200Response(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function CreateCache200ResponseFromJSON(json: any): CreateCache200Response {
  return CreateCache200ResponseFromJSONTyped(json, false);
}

export function CreateCache200ResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): CreateCache200Response {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    cacheId: !exists(json, 'cache_id') ? undefined : json['cache_id'],
  };
}

export function CreateCache200ResponseToJSON(value?: CreateCache200Response | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    cache_id: value.cacheId,
  };
}
