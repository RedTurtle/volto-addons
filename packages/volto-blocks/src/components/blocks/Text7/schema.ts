import { defineMessages, type IntlShape } from 'react-intl';
import type { BlockConfigBase, JSONSchema } from '@plone/types';
import { addAlignmentStyle } from '@redturtle/volto-blocks/components/blocks/extenders/styles';
import {
  addCtaFieldset,
  type CtaBlockExtender,
} from '@redturtle/volto-blocks/components/blocks/extenders/cta';

export interface Text7Data extends CtaBlockExtender {
  '@type': 'text7';
  images?: Array<{ '@id': string; image: string }>;
  img_column_width?: string;
  title?: string;
  text?: object;
}

export const Text7Schema = ({
  data,
  intl,
}: {
  data: Text7Data;
  intl: IntlShape;
}): JSONSchema => {
  const schema = {
    title: intl.formatMessage(messages.title),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['title', 'img_column_width', 'images'],
      },
    ],
    properties: {
      images: {
        title: intl.formatMessage(messages.images_title),
        widget: 'object_list',
        schema: {
          title: intl.formatMessage(messages.image_title),
          fieldsets: [
            {
              id: 'default',
              title: 'Default',
              fields: ['image'],
            },
          ],
          properties: {
            image: {
              title: intl.formatMessage(messages.image_title),
              widget: 'image',
            },
          },
          required: [],
        },
      },
      img_column_width: {
        title: intl.formatMessage(messages.img_column_width_title),
        description: intl.formatMessage(messages.img_column_width_description),
        default: '6',
        choices: [
          ['1', '8%'],
          ['2', '16%'],
          ['3', '25%'],
          ['4', '33%'],
          ['5', '41%'],
          ['6', '50%'],
          ['7', '58%'],
          ['8', '66%'],
          ['9', '75%'],
          ['10', '83%'],
          ['11', '91%'],
        ],
      },
      title: {
        title: intl.formatMessage(messages.title_title),
      },
      // TODO necessary?
      // text: {
      //   title: intl.formatMessage(messages.text_title),
      //   widget: 'slate',
      // },
    },
    required: ['title'],
  };

  addCtaFieldset({ schema, intl });
  addAlignmentStyle({
    schema,
    intl,
    formData: data,
    alignments: ['left', 'right'],
  });

  return schema;
};

const messages = defineMessages({
  title: {
    id: 'redturtle__volto-blocks__text7_title',
    defaultMessage: 'Text 7',
  },
  images_title: {
    id: 'redturtle__volto-blocks__text7_images_title',
    defaultMessage: 'Images',
  },
  image_title: {
    id: 'redturtle__volto-blocks__text7_image_title',
    defaultMessage: 'Image',
  },
  img_column_width_title: {
    id: 'redturtle__volto-blocks__text7_img_column_width_title',
    defaultMessage: 'Image column width',
  },
  img_column_width_description: {
    id: 'redturtle__volto-blocks__text7_img_column_width_description',
    defaultMessage: 'Width of the image column',
  },
  title_title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  text_title: {
    id: 'Text',
    defaultMessage: 'Text',
  },
});

export interface Text7Config extends Omit<BlockConfigBase, 'blockSchema'> {
  blockSchema: typeof Text7Schema;
}
