import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { AihumanActionPresetDict } from '#/api/aihuman/AihumanActionPreset/types';
import { getDictOptions } from '#/utils/dict';
import { renderDict } from '#/utils/render';

export const querySchema: FormSchemaGetter = () => [

  // {
  //   component: 'Input',
  //   fieldName: 'actionCode',
  //   label: '动作编码',
  // },

  {
    component: 'Input',
    fieldName: 'name',
    label: '动作名称',
  },

  // {
  //   component: 'Input',
  //   fieldName: 'description',
  //   label: '动作说明',
  // },

  // {
  //   component: 'Input',
  //   fieldName: 'paramsSchema',
  //   label: '参数结构(JSON Schema)',
  // },

  {
    component: 'RadioGroup',
    fieldName: 'status',
    label: '状态',
    componentProps: {
      options:  getDictOptions(AihumanActionPresetDict.sys_normal_disable),
    },
  },

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

  {
    title: '动作编码',
    field: 'actionCode',
  },

  {
    title: '动作名称',
    field: 'name',
  },

  {
    title: '动作说明',
    field: 'description',
  },

  {
    title: '参数结构(JSON Schema)',
    field: 'paramsSchema',
  },

  {
    title: '状态',
    field: 'status',
    width: 120,
    slots: {
      default: ({ row }) => {
        return renderDict(row.status,  AihumanActionPresetDict.sys_normal_disable);
      },
    },
  },

  // {
  //   title: '备注',
  //   field: 'remark',
  // },

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
      fieldName: 'actionCode',
      component: 'Input',
      label: '动作编码',
      rules: 'required',
    },







    {
      fieldName: 'name',
      component: 'Input',
      label: '动作名称',
      rules: 'required',
    },







    {
      fieldName: 'description',
      component: 'Input',
      label: '动作说明',
    },







    {
      fieldName: 'paramsSchema',
      component: 'Textarea',
      label: 'ASR接口参数',
      help: '(JSON Schema)',
      componentProps: {
        style: { height: '300px' },
      },
    },







    {
      fieldName: 'status',
      component: 'RadioGroup',
      label: '状态',
      rules: 'required',
      componentProps: {
        buttonStyle: 'solid',
        options:  getDictOptions(AihumanActionPresetDict.sys_normal_disable),
        optionType: 'button',
      },
      defaultValue: '0',

    },







    {
      fieldName: 'remark',
      component: 'Input',
      label: '备注',
    },



















    {
      fieldName: 'createTime',
      component: 'DatePicker',
      label: '创建时间',
      componentProps: {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
      },
    },













    {
      fieldName: 'updateTime',
      component: 'DatePicker',
      label: '更新时间',
      componentProps: {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
      },
    },









];
