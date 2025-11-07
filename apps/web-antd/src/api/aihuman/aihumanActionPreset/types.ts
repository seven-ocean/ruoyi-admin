/**
 * 关键词管理相关类型定义
 */
 /**
 * 字典枚举定义
 */
export enum AihumanActionPresetDict {












  /** 状态 */
  sys_normal_disable = 'sys_normal_disable',
















}
/**
 * 关键词管理查询参数
 */
export interface AihumanActionPresetQueryParams {

  /** 动作编码 */
  actionCode?: string;

  /** 动作名称 */
  name?: string;

  /** 动作说明 */
  description?: string;

  /** 参数结构(JSON Schema) */
  paramsSchema?: string;

  /** 状态 */
  status?: string;

  /** 备注 */
  remark?: string;

  /** 创建时间 */
  createTime?: string;

  /** 更新时间 */
  updateTime?: string;

  /** 页码 */
  pageNum?: number;
  /** 每页数量 */
  pageSize?: number;
}

/**
 * 关键词管理信息
 */
export interface AihumanActionPresetInfo {

  /** 主键ID */
  id?: string;

  /** 动作编码 */
  actionCode?: string;

  /** 动作名称 */
  name?: string;

  /** 动作说明 */
  description?: string;

  /** 参数结构(JSON Schema) */
  paramsSchema?: string;

  /** 状态 */
  status?: string;

  /** 备注 */
  remark?: string;

  /** 创建部门ID */
  createDept?: string;

  /** 创建人ID */
  createBy?: string;

  /** 创建时间 */
  createTime?: string;

  /** 更新人ID */
  updateBy?: string;

  /** 更新时间 */
  updateTime?: string;

  /** 删除标志:0正常,1删除 */
  delFlag?: string;

}

/**
 * 关键词管理表单数据
 */
export interface AihumanActionPresetFormData {

  /** 动作编码 */
  actionCode?: string;

  /** 动作名称 */
  name?: string;

  /** 动作说明 */
  description?: string;

  /** 参数结构(JSON Schema) */
  paramsSchema?: string;

  /** 状态 */
  status?: string;

  /** 备注 */
  remark?: string;

  /** 创建时间 */
  createTime?: string;

  /** 更新时间 */
  updateTime?: string;

}

/**
 * 关键词管理列表响应
 */
export interface AihumanActionPresetListResponse {
  /** 数据列表 */
  rows: AihumanActionPresetInfo[];
  /** 总数 */
  total: number;
}

/**
 * 导出参数
 */
export interface AihumanActionPresetExportParams extends AihumanActionPresetQueryParams {
  /** 文件名 */
  fileName?: string;
  /** 导出格式 */
  format?: 'xlsx' | 'csv';
  /** 导出字段 */
  fields?: string[];
}
