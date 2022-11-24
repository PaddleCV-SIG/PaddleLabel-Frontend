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

import * as runtime from '../runtime';
import type { Label } from '../models';
import { LabelFromJSON, LabelToJSON } from '../models';

export interface CreateRequest {
  label: Array<Label>;
  requestId?: number;
  removeDuplicateByName?: boolean;
}

export interface GetRequest {
  labelId: number;
}

export interface RemoveRequest {
  labelId: number;
}

export interface UpdateRequest {
  labelId: number;
  label: Label;
}

/**
 *
 */
export class LabelApi extends runtime.BaseAPI {
  /**
   * Create new labels
   */
  async createRaw(
    requestParameters: CreateRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Array<Label>>> {
    if (requestParameters.label === null || requestParameters.label === undefined) {
      throw new runtime.RequiredError(
        'label',
        'Required parameter requestParameters.label was null or undefined when calling create.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    if (requestParameters.requestId !== undefined && requestParameters.requestId !== null) {
      headerParameters['request_id'] = String(requestParameters.requestId);
    }

    if (
      requestParameters.removeDuplicateByName !== undefined &&
      requestParameters.removeDuplicateByName !== null
    ) {
      headerParameters['remove_duplicate_by_name'] = String(
        requestParameters.removeDuplicateByName,
      );
    }

    const response = await this.request(
      {
        path: `/labels`,
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: requestParameters.label.map(LabelToJSON),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(LabelFromJSON));
  }

  /**
   * Create new labels
   */
  async create(
    label: Array<Label>,
    requestId?: number,
    removeDuplicateByName?: boolean,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<Array<Label>> {
    const response = await this.createRaw(
      { label: label, requestId: requestId, removeDuplicateByName: removeDuplicateByName },
      initOverrides,
    );
    return await response.value();
  }

  /**
   * Get info about a specific label
   */
  async getRaw(
    requestParameters: GetRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Label>> {
    if (requestParameters.labelId === null || requestParameters.labelId === undefined) {
      throw new runtime.RequiredError(
        'labelId',
        'Required parameter requestParameters.labelId was null or undefined when calling get.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/labels/{label_id}`.replace(
          `{${'label_id'}}`,
          encodeURIComponent(String(requestParameters.labelId)),
        ),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => LabelFromJSON(jsonValue));
  }

  /**
   * Get info about a specific label
   */
  async get(
    labelId: number,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<Label> {
    const response = await this.getRaw({ labelId: labelId }, initOverrides);
    return await response.value();
  }

  /**
   * Get all labels, sort by last modify
   */
  async getAllRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Array<Label>>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/labels`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(LabelFromJSON));
  }

  /**
   * Get all labels, sort by last modify
   */
  async getAll(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Label>> {
    const response = await this.getAllRaw(initOverrides);
    return await response.value();
  }

  /**
   * Delete a label. Labels in use (have annotation pointing at them) are not allowed to be deleted.
   * Delete a label
   */
  async removeRaw(
    requestParameters: RemoveRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters.labelId === null || requestParameters.labelId === undefined) {
      throw new runtime.RequiredError(
        'labelId',
        'Required parameter requestParameters.labelId was null or undefined when calling remove.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/labels/{label_id}`.replace(
          `{${'label_id'}}`,
          encodeURIComponent(String(requestParameters.labelId)),
        ),
        method: 'DELETE',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Delete a label. Labels in use (have annotation pointing at them) are not allowed to be deleted.
   * Delete a label
   */
  async remove(
    labelId: number,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<void> {
    await this.removeRaw({ labelId: labelId }, initOverrides);
  }

  /**
   * Edit label info. Provide key value pair to change one value only. Provide all changed values to change multiple. Empty string will be set. Leave values don\'t intend to change out of request body.
   * Edit label info
   */
  async updateRaw(
    requestParameters: UpdateRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Label>> {
    if (requestParameters.labelId === null || requestParameters.labelId === undefined) {
      throw new runtime.RequiredError(
        'labelId',
        'Required parameter requestParameters.labelId was null or undefined when calling update.',
      );
    }

    if (requestParameters.label === null || requestParameters.label === undefined) {
      throw new runtime.RequiredError(
        'label',
        'Required parameter requestParameters.label was null or undefined when calling update.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/labels/{label_id}`.replace(
          `{${'label_id'}}`,
          encodeURIComponent(String(requestParameters.labelId)),
        ),
        method: 'PUT',
        headers: headerParameters,
        query: queryParameters,
        body: LabelToJSON(requestParameters.label),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => LabelFromJSON(jsonValue));
  }

  /**
   * Edit label info. Provide key value pair to change one value only. Provide all changed values to change multiple. Empty string will be set. Leave values don\'t intend to change out of request body.
   * Edit label info
   */
  async update(
    labelId: number,
    label: Label,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<Label> {
    const response = await this.updateRaw({ labelId: labelId, label: label }, initOverrides);
    return await response.value();
  }
}
