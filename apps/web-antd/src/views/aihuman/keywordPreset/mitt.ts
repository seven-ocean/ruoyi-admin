import { mitt } from '@vben/utils';
export const emitter = mitt<{ actionSelect: { id?: string | number; code?: string } }>()
