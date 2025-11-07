import type { AihumanKeywordInfo as AihumanKeyword, AihumanKeywordQueryParams as AihumanKeywordQueryParam } from './types';

import type { ID, IDS, PageQuery, PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { requestClient } from '#/api/request';

enum Api {
  root = '/aihuman/aihumanKeyword',
  list = '/aihuman/aihumanKeyword/list',
  export = '/aihuman/aihumanKeyword/export',
  listByAction = '/aihuman/aihumanKeyword/listByAction',
  listByActionCode = '/aihuman/aihumanKeyword/listByActionCode',
}

/**
 * 获取undefined列表
 * @param params 查询参数
 * @returns AihumanKeyword列表
 */
export function aihumanKeywordList(params?: PageQuery & AihumanKeywordQueryParam) {
  return requestClient.get<PageResult<AihumanKeyword>>(Api.list, { params });
}

export function aihumanKeywordListByActionId(id: ID) {
  return requestClient.get<AihumanKeyword[]>(`${Api.listByAction}/${id}`);
}

export function aihumanKeywordListByActionCode(code: string) {
  return requestClient.get<AihumanKeyword[]>(`${Api.listByActionCode}/${code}`);
}

/**
 * 获取undefined详情
 * @param id undefinedID
 * @returns AihumanKeyword详情
 */
export function aihumanKeywordInfo(id: ID) {
  return requestClient.get<AihumanKeyword>(`${Api.root}/${id}`);
}

/**
 * 新增undefined
 * @param data undefined数据
 * @returns void
 */
export function aihumanKeywordAdd(data: Partial<AihumanKeyword>) {
  return requestClient.postWithMsg<void>(Api.root, data);
}

/**
 * 更新undefined
 * @param data undefined数据
 * @returns void
 */
export function aihumanKeywordUpdate(data: Partial<AihumanKeyword>) {
  return requestClient.putWithMsg<void>(Api.root, data);
}

/**
 * 删除undefined
 * @param ids undefinedID数组
 * @returns void
 */
export function aihumanKeywordRemove(ids: IDS) {
  return requestClient.deleteWithMsg<void>(`${Api.root}/${ids}`);
}

/**
 * 导出undefined
 * @param data 查询参数
 * @returns blob
 */
export function aihumanKeywordExport(data: Partial<AihumanKeywordQueryParam>) {
  return commonExport(Api.export, data);
}

/**
 * 保存或更新undefined
 * @param data undefined数据
 * @param isUpdate 是否更新
 * @returns void
 */
export function aihumanKeywordSaveOrUpdate(data: Partial<AihumanKeyword>, isUpdate: boolean) {
  if (isUpdate) {
    return aihumanKeywordUpdate(data);
  } else {
    return aihumanKeywordAdd(data);
  }
}
