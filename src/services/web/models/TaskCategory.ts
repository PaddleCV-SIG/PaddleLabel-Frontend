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
 * @interface TaskCategory
 */
export interface TaskCategory {
  /**
   *
   * @type {string}
   * @memberof TaskCategory
   */
  name?: string;
  /**
   *
   * @type {number}
   * @memberof TaskCategory
   */
  taskCategoryId?: number;
  /**
   *
   * @type {string}
   * @memberof TaskCategory
   * @deprecated
   */
  handler?: string;
  /**
   *
   * @type {string}
   * @memberof TaskCategory
   */
  created?: string;
  /**
   *
   * @type {string}
   * @memberof TaskCategory
   */
  modified?: string;
}

/**
 * Check if a given object implements the TaskCategory interface.
 */
export function instanceOfTaskCategory(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function TaskCategoryFromJSON(json: any): TaskCategory {
  return TaskCategoryFromJSONTyped(json, false);
}

export function TaskCategoryFromJSONTyped(json: any, ignoreDiscriminator: boolean): TaskCategory {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    name: !exists(json, 'name') ? undefined : json['name'],
    taskCategoryId: !exists(json, 'task_category_id') ? undefined : json['task_category_id'],
    handler: !exists(json, 'handler') ? undefined : json['handler'],
    created: !exists(json, 'created') ? undefined : json['created'],
    modified: !exists(json, 'modified') ? undefined : json['modified'],
  };
}

export function TaskCategoryToJSON(value?: TaskCategory | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    name: value.name,
    task_category_id: value.taskCategoryId,
    handler: value.handler,
    created: value.created,
    modified: value.modified,
  };
}
