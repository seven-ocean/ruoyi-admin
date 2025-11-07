/**
 * 关键词管理子表相关类型定义
 */
 /**
 * 字典枚举定义
 */
export enum AihumanKeywordDict {


  sys_normal_disable = 'sys_normal_disable',


  /** 关键词类型:1唤醒,2停止,3动作触发,4对话 */
  aihuman_keyword_type = 'aihuman_keyword_type',



  /** 匹配模式:0精确,1包含,2正则,3前缀,4后缀 */
  aihuman_keyword_match_mode = 'aihuman_keyword_match_mode',





  /** 状态 */
  sys_common_status = 'sys_common_status',



  /** 发布状态 */
  aihuman_is_publish = 'aihuman_is_publish',
































}
/**
 * 关键词管理子表查询参数
 */
export interface AihumanKeywordQueryParams {

  /** 主键ID */
  id?: string;

  /** 关键词文本 */
  keyword?: string;

  /** 关键词类型:1唤醒,2停止,3动作触发,4对话 */
  type?: string;

  /** 匹配模式:0精确,1包含,2正则,3前缀,4后缀 */
  matchMode?: string;

  /** 优先级(越大越优先) */
  priority?: number;

  /** 状态 */
  status?: string;

  /** 发布状态 */
  publish?: string;

  /** 动作参数(JSON) */
  actionParams?: string;

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
 * 关键词管理子表信息
 */
export interface AihumanKeywordInfo {

  /** 主键ID */
  id?: string;

  /** 关键词文本 */
  keyword?: string;

  /** 关键词类型:1唤醒,2停止,3动作触发,4对话 */
  type?: string;

  /** 匹配模式:0精确,1包含,2正则,3前缀,4后缀 */
  matchMode?: string;

  /** 优先级(越大越优先) */
  priority?: number;

  /** 状态 */
  status?: string;

  /** 发布状态 */
  publish?: string;

  /** 关联配置ID(aihuman_config.id) */
  configId?: string;

  /** 关联实时配置ID(aihuman_real_config.id) */
  realConfigId?: string;

  /** 关联动作预设ID(aihuman_action_preset.id) */
  actionId?: string;

  /** 动作编码(回退/外部系统对齐) */
  actionCode?: string;

  /** 动作参数(JSON) */
  actionParams?: string;

  /** 知识库来源标识 */
  kbSource?: string;

  /** 知识库ID */
  kbId?: string;

  /** 知识库查询模板 */
  kbQueryTemplate?: string;

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
 * 关键词管理子表表单数据
 */
export interface AihumanKeywordFormData {

  /** 关键词文本 */
  keyword?: string;

  /** 关键词类型:1唤醒,2停止,3动作触发,4对话 */
  type?: string;

  /** 匹配模式:0精确,1包含,2正则,3前缀,4后缀 */
  matchMode?: string;

  /** 优先级(越大越优先) */
  priority?: number;

  /** 状态 */
  status?: string;

  /** 发布状态 */
  publish?: string;

  /** 动作参数(JSON) */
  actionParams?: string;

  /** 备注 */
  remark?: string;

  /** 创建时间 */
  createTime?: string;

  /** 更新时间 */
  updateTime?: string;

}

/**
 * 关键词管理子表列表响应
 */
export interface AihumanKeywordListResponse {
  /** 数据列表 */
  rows: AihumanKeywordInfo[];
  /** 总数 */
  total: number;
}

/**
 * 导出参数
 */
export interface AihumanKeywordExportParams extends AihumanKeywordQueryParams {
  /** 文件名 */
  fileName?: string;
  /** 导出格式 */
  format?: 'xlsx' | 'csv';
  /** 导出字段 */
  fields?: string[];
}
