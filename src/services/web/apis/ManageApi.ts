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

import * as runtime from '../runtime';
import type { LoadSample200Response, LoadSampleRequest } from '../models';
import {
  LoadSample200ResponseFromJSON,
  LoadSample200ResponseToJSON,
  LoadSampleRequestFromJSON,
  LoadSampleRequestToJSON,
} from '../models';

export interface LoadSampleOperationRequest {
  loadSampleRequest?: LoadSampleRequest;
}

/**
 *
 */
export class ManageApi extends runtime.BaseAPI {
  /**
   * Get backend version
   */
  async getVersionRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<string>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/version`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.TextApiResponse(response) as any;
  }

  /**
   * Get backend version
   */
  async getVersion(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
    const response = await this.getVersionRaw(initOverrides);
    return await response.value();
  }

  /**
   * Download and import sample project
   */
  async loadSampleRaw(
    requestParameters: LoadSampleOperationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<LoadSample200Response>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/samples`,
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: LoadSampleRequestToJSON(requestParameters.loadSampleRequest),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      LoadSample200ResponseFromJSON(jsonValue),
    );
  }

  /**
   * Download and import sample project
   */
  async loadSample(
    loadSampleRequest?: LoadSampleRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<LoadSample200Response> {
    const response = await this.loadSampleRaw(
      { loadSampleRequest: loadSampleRequest },
      initOverrides,
    );
    return await response.value();
  }
}