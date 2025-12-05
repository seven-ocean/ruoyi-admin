import type { AihumanConfigInfo as AihumanConfig, AihumanConfigQueryParams as AihumanConfigQueryParam } from './types';

import type { ID, IDS, PageQuery, PageResult } from '#/api/common';

import { commonExport, ContentTypeEnum } from '#/api/helper';
import { requestClient } from '#/api/request';

enum Api {
  root = '/aihuman/aihumanConfig',
  list = '/aihuman/aihumanConfig/list',
  export = '/aihuman/aihumanConfig/export',
  asr = '/aihuman/aihumanConfig/asr',
}

/**
 * 获取undefined列表
 * @param params 查询参数
 * @returns AihumanConfig列表
 */
export function aihumanConfigList(params?: PageQuery & AihumanConfigQueryParam) {
  return requestClient.get<PageResult<AihumanConfig>>(Api.list, { params });
}

/**
 * 获取undefined详情
 * @param id undefinedID
 * @returns AihumanConfig详情
 */
export function aihumanConfigInfo(id: ID) {
  return requestClient.get<AihumanConfig>(`${Api.root}/${id}`);
}

/**
 * 新增undefined
 * @param data undefined数据
 * @returns void
 */
export function aihumanConfigAdd(data: Partial<AihumanConfig>) {
  return requestClient.postWithMsg<void>(Api.root, data);
}

/**
 * 更新undefined
 * @param data undefined数据
 * @returns void
 */
export function aihumanConfigUpdate(data: Partial<AihumanConfig>) {
  return requestClient.putWithMsg<void>(Api.root, data);
}

/**
 * 删除undefined
 * @param ids undefinedID数组
 * @returns void
 */
export function aihumanConfigRemove(ids: IDS) {
  return requestClient.deleteWithMsg<void>(`${Api.root}/${ids}`);
}

/**
 * 导出undefined
 * @param data 查询参数
 * @returns blob
 */
export function aihumanConfigExport(data: Partial<AihumanConfigQueryParam>) {
  return commonExport(Api.export, data);
}

/**
 * 保存或更新undefined
 * @param data undefined数据
 * @param isUpdate 是否更新
 * @returns void
 */
export function aihumanConfigSaveOrUpdate(data: Partial<AihumanConfig>, isUpdate: boolean) {
  if (isUpdate) {
    return aihumanConfigUpdate(data);
  } else {
    return aihumanConfigAdd(data);
  }
}

export function aihumanConfigAsrFile(id: ID, file: Blob | File) {
  const form = new FormData();
  form.append('audio', file);
  return requestClient.postWithMsg<string>(`${Api.asr}/${id}`, form, {
    headers: { 'Content-Type': ContentTypeEnum.FORM_DATA },
    timeout: 30 * 1000,
  });
}

export function aihumanConfigAsrBase64(id: ID, audioBase64: string) {
  const body = new URLSearchParams();
  body.set('audioBase64', audioBase64);
  return requestClient.post<string>(`${Api.asr}/${id}`, body, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
}
