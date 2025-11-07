import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { AihumanKeywordDict } from '#/api/aihuman/AihumanKeyword/types';
import { getDictOptions } from '#/utils/dict';
import { renderDict } from '#/utils/render';

export const querySchema: FormSchemaGetter = () => [

  // {
  //   component: 'Input',
  //   fieldName: 'id',
  //   label: '主键ID',
  // },

  {
    component: 'Input',
    fieldName: 'keyword',
    label: '关键词文本',
  },

  // {
  //   component: 'RadioGroup',
  //   fieldName: 'type',
  //   label: '关键词类型:1唤醒,2停止,3动作触发,4对话',
  //   componentProps: {
  //     options:  getDictOptions(AihumanKeywordDict.aihuman_keyword_type),

  //   },
  // },

  // {
  //   component: 'RadioGroup',
  //   fieldName: 'matchMode',
  //   label: '匹配模式:0精确,1包含,2正则,3前缀,4后缀',
  //   componentProps: {
  //     options:  getDictOptions(AihumanKeywordDict.aihuman_keyword_match_mode),

  //   },
  // },

  // {
  //   component: 'Input',
  //   fieldName: 'priority',
  //   label: '优先级(越大越优先)',
  // },

  {
    component: 'RadioGroup',
    fieldName: 'status',
    label: '状态',
    componentProps: {
      options: getDictOptions(AihumanKeywordDict.sys_normal_disable),

    },
  },

  // {
  //   component: 'RadioGroup',
  //   fieldName: 'publish',
  //   label: '发布状态',
  //   componentProps: {
  //     options:  getDictOptions(AihumanKeywordDict.aihuman_is_publish),

  //   },
  // },

  // {
  //   component: 'Input',
  //   fieldName: 'actionParams',
  //   label: '动作参数(JSON)',
  // },

  // {
  //   component: 'Input',
  //   fieldName: 'remark',
  //   label: '备注',
  // },

  // {
  //   component: 'DatePicker',
  //   fieldName: 'createTime',
  //   label: '创建时间',
  //   componentProps: {
  //     showTime: true,
  //     format: 'YYYY-MM-DD HH:mm:ss',
  //     valueFormat: 'YYYY-MM-DD HH:mm:ss',
  //   },
  // },

  // {
  //   component: 'DatePicker',
  //   fieldName: 'updateTime',
  //   label: '更新时间',
  //   componentProps: {
  //     showTime: true,
  //     format: 'YYYY-MM-DD HH:mm:ss',
  //     valueFormat: 'YYYY-MM-DD HH:mm:ss',
  //   },
  // },

];

export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },

  // {
  //   title: '主键ID',
  //   field: 'id',
  // },

  {
    title: '关键词文本',
    field: 'keyword',
  },

  {
    title: '关键词类型',
    field: 'type',
    width: 120,
    slots: {
      default: ({ row }) => {
        return renderDict(row.type, AihumanKeywordDict.aihuman_keyword_type);
      },
    },
  },

  {
    title: '匹配模式',
    field: 'matchMode',
    width: 120,
    slots: {
      default: ({ row }) => {
        return renderDict(row.matchMode, AihumanKeywordDict.aihuman_keyword_match_mode);
      },
    },
  },

  {
    title: '优先级(越大越优先)',
    field: 'priority',
  },

  {
    title: '状态',
    field: 'status',
    width: 120,
    slots: {
      default: ({ row }) => {
        return renderDict(row.status, AihumanKeywordDict.sys_normal_disable);
      },
    },
  },

  {
    title: '发布状态',
    field: 'publish',
    width: 120,
    slots: {
      default: ({ row }) => {
        return renderDict(row.publish, AihumanKeywordDict.aihuman_is_publish);
      },
    },
  },

  {
    title: '动作参数(JSON)',
    field: 'actionParams',
  },

  {
    title: '备注',
    field: 'remark',
  },

  // {
  //   title: '创建时间',
  //   field: 'createTime',
  // },

  // {
  //   title: '更新时间',
  //   field: 'updateTime',
  // },

  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 180,
  },
];

export const modalSchema: FormSchemaGetter = () => [



  {
    fieldName: 'id'
  },

  {
    fieldName: 'actionId',
    component: 'Input',
    label: '动作ID',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },

  {
    fieldName: 'actionCode',
    component: 'Input',
    label: '动作编码',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },

  {
    fieldName: 'actionSelect',
    component: 'Select',
    label: '动作名称',
    rules: 'selectRequired',
    componentProps: {
      options: [],
      showSearch: true,
      optionFilterProp: 'label',
      optionLabelProp: 'label',
    },
  },









  {
    fieldName: 'keyword',
    component: 'Input',
    label: '关键词文本',
    rules: 'required',
  },







  {
    fieldName: 'type',
    component: 'RadioGroup',
    label: '关键词类型',
    rules: 'required',
    componentProps: {
      buttonStyle: 'solid',
      options: getDictOptions(AihumanKeywordDict.aihuman_keyword_type),
      optionType: 'button',
    },
    defaultValue: '0',

  },







  {
    fieldName: 'matchMode',
    component: 'RadioGroup',
    label: '匹配模式',
    rules: 'required',
    componentProps: {
      buttonStyle: 'solid',
      options: getDictOptions(AihumanKeywordDict.aihuman_keyword_match_mode),
      optionType: 'button',
    },
    defaultValue: '0',

  },







  {
    fieldName: 'priority',
    component: 'Input',
    label: '优先级(越大越优先)',
    rules: 'required',
  },







  {
    fieldName: 'status',
    component: 'RadioGroup',
    label: '状态',
    rules: 'required',
    componentProps: {
      buttonStyle: 'solid',
      options: getDictOptions(AihumanKeywordDict.sys_normal_disable),
      optionType: 'button',
    },
    defaultValue: '0',

  },







  {
    fieldName: 'publish',
    component: 'RadioGroup',
    label: '发布状态',
    rules: 'required',
    componentProps: {
      buttonStyle: 'solid',
      options: getDictOptions(AihumanKeywordDict.aihuman_is_publish),
      optionType: 'button',
    },
    defaultValue: '1',

  },































  {
    fieldName: 'actionParams',
    component: 'Input',
    label: '动作参数(JSON)',
  },

























  {
    fieldName: 'remark',
    component: 'Input',
    label: '备注',
  },



















  // {
  //   fieldName: 'createTime',
  //   component: 'DatePicker',
  //   label: '创建时间',
  //   componentProps: {
  //     showTime: true,
  //     format: 'YYYY-MM-DD HH:mm:ss',
  //     valueFormat: 'YYYY-MM-DD HH:mm:ss',
  //   },
  // },













  // {
  //   fieldName: 'updateTime',
  //   component: 'DatePicker',
  //   label: '更新时间',
  //   componentProps: {
  //     showTime: true,
  //     format: 'YYYY-MM-DD HH:mm:ss',
  //     valueFormat: 'YYYY-MM-DD HH:mm:ss',
  //   },
  // },









];
