import { JSONSchema } from '@ngx-pwa/local-storage';

export const sortParamsSchema: JSONSchema = {
  type: 'object',
  properties: {
    sortType: {
      type: 'string',
      enum: ['name', 'size', 'modified'],
    },
    ascending: {
      type: 'boolean',
    },
  },
  required: ['sortType', 'ascending'],
};
export const viewModeScema: JSONSchema = {
  type: 'string',
  enum: ['detail', 'large'],
};
