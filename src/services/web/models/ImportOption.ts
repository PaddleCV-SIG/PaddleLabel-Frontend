/* tslint:disable */
/* eslint-disable */
/**
 * PaddleLabel API Specs
 * Web backend APIs for PaddleLabel
 *
 * The version of the OpenAPI document: 1.0.2
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
 * @interface ImportOption
 */
export interface ImportOption {
  /**
   *
   * @type {string}
   * @memberof ImportOption
   */
  label: string;
  /**
   *
   * @type {boolean}
   * @memberof ImportOption
   */
  required: boolean;
  /**
   *
   * @type {string}
   * @memberof ImportOption
   */
  type?: string;
  /**
   *
   * @type {Array<Array<string>>}
   * @memberof ImportOption
   */
  choices?: Array<Array<string>>;
  /**
   *
   * @type {string}
   * @memberof ImportOption
   */
  tips?: string;
  /**
   *
   * @type {Array<Array<string>>}
   * @memberof ImportOption
   */
  showAfter?: Array<Array<string>>;
}

/**
 * Check if a given object implements the ImportOption interface.
 */
export function instanceOfImportOption(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'label' in value;
  isInstance = isInstance && 'required' in value;

  return isInstance;
}

export function ImportOptionFromJSON(json: any): ImportOption {
  return ImportOptionFromJSONTyped(json, false);
}

export function ImportOptionFromJSONTyped(json: any, ignoreDiscriminator: boolean): ImportOption {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    label: json['label'],
    required: json['required'],
    type: !exists(json, 'type') ? undefined : json['type'],
    choices: !exists(json, 'choices') ? undefined : json['choices'],
    tips: !exists(json, 'tips') ? undefined : json['tips'],
    showAfter: !exists(json, 'show_after') ? undefined : json['show_after'],
  };
}

export function ImportOptionToJSON(value?: ImportOption | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    label: value.label,
    required: value.required,
    type: value.type,
    choices: value.choices,
    tips: value.tips,
    show_after: value.showAfter,
  };
}