import { defineMessages, type IntlShape } from 'react-intl';
import type { BlockConfigBase, JSONSchema } from '@plone/types';
import { addStyling } from '@plone/volto/helpers/Extensions/withBlockSchemaEnhancer';

export interface AccordionData {
  '@type': 'accordion';
  title?: string;
  items?: Array<{ '@id': string; title?: string; text?: object }>;
}

export function AccordionSchema({
  data,
  intl,
}: {
  data: AccordionData;
  intl: IntlShape;
}): JSONSchema {
  const schema = {
    title: intl.formatMessage(messages.title),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['title', 'items'],
      },
    ],
    properties: {
      title: {
        title: intl.formatMessage(messages.title_title),
      },
      items: {
        title: intl.formatMessage(messages.items),
        widget: 'object_list',
        schema: {
          title: intl.formatMessage(messages.item),
          fieldsets: [
            {
              id: 'default',
              title: 'Default',
              fields: ['title'],
            },
          ],
          properties: {
            title: {
              title: intl.formatMessage(messages.item_title),
            },
          },
          required: ['title'],
        },
      },
    },
    required: ['title'],
  };

  addStyling({ schema, intl, formData: data });

  // @ts-ignore
  schema.properties.styles.schema.properties['--column-count'] = {
    title: intl.formatMessage(messages.columns_title),
    type: 'number',
    default: 1,
  };

  // @ts-ignore
  schema.properties.styles.schema.fieldsets[0].fields.push('--column-count');

  return schema;
}

const messages = defineMessages({
  title: {
    id: 'redturtle__volto-blocks__accordion_title',
    defaultMessage: 'Accordion',
  },
  title_title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  items: {
    id: 'redturtle__volto-blocks__accordion_items',
    defaultMessage: 'Items',
  },
  item: {
    id: 'redturtle__volto-blocks__accordion_item',
    defaultMessage: 'Item',
  },
  item_title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  columns_title: {
    id: 'redturtle__volto-blocks__accordion_columns_title',
    defaultMessage: 'Columns',
  },
});

export interface AccordionConfig extends Omit<BlockConfigBase, 'blockSchema'> {
  blockSchema: typeof AccordionSchema;
}
