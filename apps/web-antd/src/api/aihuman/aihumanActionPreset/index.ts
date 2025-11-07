import type { AihumanActionPresetInfo as AihumanActionPreset, AihumanActionPresetQueryParams as AihumanActionPresetQueryParam } from './types';

import type { ID, IDS, PageQuery, PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { requestClient } from '#/api/request';

enum Api {
  root = '/aihuman/aihumanActionPreset',
  list = '/aihuman/aihumanActionPreset/list',
  export = '/aihuman/aihumanActionPreset/export',
}

/**
 * 获取undefined列表
 * @param params 查询参数
 * @returns AihumanActionPreset列表
 */
export function aihumanActionPresetList(params?: PageQuery & AihumanActionPresetQueryParam) {
  return requestClient.get<PageResult<AihumanActionPreset>>(Api.list, { params });
}

/**
 * 获取undefined详情
 * @param id undefinedID
 * @returns AihumanActionPreset详情
 */
export function aihumanActionPresetInfo(id: ID) {
  return requestClient.get<AihumanActionPreset>(`${Api.root}/${id}`);
}

/**
 * 新增undefined
 * @param data undefined数据
 * @returns void
 */
export function aihumanActionPresetAdd(data: Partial<AihumanActionPreset>) {
  return requestClient.postWithMsg<void>(Api.root, data);
}

/**
 * 更新undefined
 * @param data undefined数据
 * @returns void
 */
export function aihumanActionPresetUpdate(data: Partial<AihumanActionPreset>) {
  return requestClient.putWithMsg<void>(Api.root, data);
}

/**
 * 删除undefined
 * @param ids undefinedID数组
 * @returns void
 */
export function aihumanActionPresetRemove(ids: IDS) {
  return requestClient.deleteWithMsg<void>(`${Api.root}/${ids}`);
}

/**
 * 导出undefined
 * @param data 查询参数
 * @returns blob
 */
export function aihumanActionPresetExport(data: Partial<AihumanActionPresetQueryParam>) {
  return commonExport(Api.export, data);
}

/**
 * 保存或更新undefined
 * @param data undefined数据
 * @param isUpdate 是否更新
 * @returns void
 */
export function aihumanActionPresetSaveOrUpdate(data: Partial<AihumanActionPreset>, isUpdate: boolean) {
  if (isUpdate) {
    return aihumanActionPresetUpdate(data);
  } else {
    return aihumanActionPresetAdd(data);
  }
}
