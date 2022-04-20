/* tslint:disable */
/* eslint-disable */
/**
 * PP-Label API Spec
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
import { Label, LabelFromJSON, LabelFromJSONTyped, LabelToJSON } from './Label';
import {
  ProjectOtherSettings,
  ProjectOtherSettingsFromJSON,
  ProjectOtherSettingsFromJSONTyped,
  ProjectOtherSettingsToJSON,
} from './ProjectOtherSettings';

/**
 * Contains project details and settings
 * @export
 * @interface Project
 */
export interface Project {
  /**
   *
   * @type {number}
   * @memberof Project
   */
  readonly projectId?: number;
  /**
   * Project name
   * @type {string}
   * @memberof Project
   */
  name?: string;
  /**
   * Optional project description
   * @type {string}
   * @memberof Project
   */
  description?: string;
  /**
   * Top level annotation task category, see TODO for int <-> category map
   * @type {number}
   * @memberof Project
   */
  taskCategoryId?: number;
  /**
   *
   * @type {string}
   * @memberof Project
   */
  readonly taskCategory?: string;
  /**
   * Absolute directory path where all the data file is stored
   * @type {string}
   * @memberof Project
   */
  dataDir?: string;
  /**
   * Absolute directory path where all the label files are stored
   * @type {string}
   * @memberof Project
   */
  labelDir?: string;
  /**
   *
   * @type {Array<Label>}
   * @memberof Project
   */
  labels?: Array<Label>;
  /**
   * eg: single_class/multi_class for classification
   * @type {string}
   * @memberof Project
   */
  subCategory?: string;
  /**
   * Project creation timestamp in UTC
   * @type {string}
   * @memberof Project
   */
  readonly created?: string | null;
  /**
   * Last time the project detail or ANY TASK of the project is modified
   * @type {string}
   * @memberof Project
   */
  readonly modified?: string | null;
  /**
   *
   * @type {ProjectOtherSettings}
   * @memberof Project
   */
  otherSettings?: ProjectOtherSettings;
}

export function ProjectFromJSON(json: any): Project {
  return ProjectFromJSONTyped(json, false);
}

export function ProjectFromJSONTyped(json: any, ignoreDiscriminator: boolean): Project {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    projectId: !exists(json, 'project_id') ? undefined : json['project_id'],
    name: !exists(json, 'name') ? undefined : json['name'],
    description: !exists(json, 'description') ? undefined : json['description'],
    taskCategoryId: !exists(json, 'task_category_id') ? undefined : json['task_category_id'],
    taskCategory: !exists(json, 'task_category') ? undefined : json['task_category'],
    dataDir: !exists(json, 'data_dir') ? undefined : json['data_dir'],
    labelDir: !exists(json, 'label_dir') ? undefined : json['label_dir'],
    labels: !exists(json, 'labels') ? undefined : (json['labels'] as Array<any>).map(LabelFromJSON),
    subCategory: !exists(json, 'sub_category') ? undefined : json['sub_category'],
    created: !exists(json, 'created') ? undefined : json['created'],
    modified: !exists(json, 'modified') ? undefined : json['modified'],
    otherSettings: !exists(json, 'other_settings')
      ? undefined
      : ProjectOtherSettingsFromJSON(json['other_settings']),
  };
}

export function ProjectToJSON(value?: Project | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    name: value.name,
    description: value.description,
    task_category_id: value.taskCategoryId,
    data_dir: value.dataDir,
    label_dir: value.labelDir,
    labels: value.labels === undefined ? undefined : (value.labels as Array<any>).map(LabelToJSON),
    sub_category: value.subCategory,
    other_settings: ProjectOtherSettingsToJSON(value.otherSettings),
  };
}
