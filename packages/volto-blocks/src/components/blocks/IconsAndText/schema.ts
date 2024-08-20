import type { BlockConfigBase, JSONSchema } from '@plone/types';
import {
  addCtaFieldset,
  type CtaBlockExtender,
} from '@redturtle/volto-blocks/components/blocks/extenders/cta';

import { defineMessages, type IntlShape } from 'react-intl';
// import { v4 as uuid } from 'uuid';

const messages = defineMessages({
  columnsNumber: { id: 'columnsNumber', defaultMessage: 'Number of columns' },
  noAdaptColumns: {
    id: 'noAdaptColumns',
    defaultMessage: 'Do not fit the columns to the available space',
  },
  column: {
    id: 'column',
    defaultMessage: 'Column',
  },
  addColumn: {
    id: 'addColumn',
    defaultMessage: 'Add column',
  },
  icon: {
    id: 'icon',
    defaultMessage: 'Icon',
  },
  icon_and_text_column_number_title: {
    id: 'icon_and_text_column_number_title',
    defaultMessage: 'Column Number',
  },
  icon_and_text_column_number_description: {
    id: 'icon_and_text_column_number_description',
    defaultMessage: 'Define the number of columns for this block',
  },
  title_title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  text_title: {
    id: 'Text',
    defaultMessage: 'Text',
  },
  icons_and_text_title: {
    id: 'icons_and_text_title',
    defaultMessage: 'Icon & Text block',
  },
});

export interface IconsAndTextData extends CtaBlockExtender {
  '@type': 'iconsandtext';
  columns?: Array<{
    '@id': string;
    index?: number;
    iconImage?: string;
    iconSize?: string;
    headerText?: string;
    headerTextPosition?: string;
    dividerPosition?: string;
    href?: string;
    href_title?: string;
    title?: string;
    text?: string;
  }>;
  column_number?: string;
  title?: string;
  text?: object;
}

export const IconsAndTextSchema = ({
  data,
  intl,
}: {
  data: IconsAndTextData;
  intl: IntlShape;
}): JSONSchema => {
  const schema = {
    title: intl.formatMessage(messages.icons_and_text_title),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['title', 'columns', 'column_number'],
      },
    ],
    properties: {
      title: { title: intl.formatMessage(messages.title_title) },
      columns: {
        title: intl.formatMessage(messages.column),
        addMessage: intl.formatMessage(messages.addColumn),
        widget: 'object_list',
        // default: [
        //   { '@id': uuid(), dividerPosition: 'before_title', iconSize: 's' },
        //   { '@id': uuid(), dividerPosition: 'before_title', iconSize: 's' },
        //   { '@id': uuid(), dividerPosition: 'before_title', iconSize: 's' },
        // ],
        schema: {
          title: intl.formatMessage(messages.column),
          fieldsets: [
            {
              id: 'default',
              title: 'Default',
              fields: [
                // 'title',
                'iconImage',
                'iconSize',
                'headerTextPosition',
                'dividerPosition',
                'href',
                'href_title',
              ],
            },
          ],
          properties: {
            title: { title: intl.formatMessage(messages.column) },
            iconImage: {
              title: intl.formatMessage(messages.icon),
              description:
                'The image must be a PNG or SVG. The maximum recommended size for PNG is 200x200px.',
              widget: 'image',
            },
            iconSize: {
              title: 'Image size',
              type: 'choices',
              choices: [
                ['s', 'Small'],
                ['m', 'Medium'],
                ['l', 'Large'],
              ],
              noValueOption: false,
            },
            headerTextPosition: {
              title: 'Header text position',
              type: 'choices',
              choices: [
                ['right', 'On right'],
                ['bottom', 'On bottom'],
              ],
            },
            dividerPosition: {
              title: 'Divider position',
              type: 'choices',
              default: 'no_divider',
              choices: [
                ['before_title', 'Before title'],
                ['after_title', 'After title'],
                ['before_header_text', 'Before header text'],
                ['no_divider', 'Hide divider'],
              ],

              noValueOption: false,
            },
            href: {
              title: 'Link',
              widget: 'object_browser',
              allowExternals: true,
              mode: 'link',
            },
            href_title: {
              title: 'Link title',
              description:
                'If no title is entered, and a link is selected, the link will be added to the block title.',
            },
          },
          required: [],
        },
      },
      column_number: {
        title: intl.formatMessage(messages.icon_and_text_column_number_title),
        description: intl.formatMessage(
          messages.icon_and_text_column_number_description,
        ),
        default: '3',
        choices: [
          ['2', '2'],
          ['3', '3'],
          ['4', '4'],
        ],
      },
    },
    required: ['title'],
  };
  addCtaFieldset({ schema, intl });
  return schema;
};

export interface IconsAndTextConfig
  extends Omit<BlockConfigBase, 'blockSchema'> {
  blockSchema: typeof IconsAndTextSchema;
}
