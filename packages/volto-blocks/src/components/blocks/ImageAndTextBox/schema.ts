import type { BlockConfigBase, JSONSchema } from '@plone/types';
import {
  addCtaFieldset,
  type CtaBlockExtender,
} from '@redturtle/volto-blocks/components/blocks/extenders/cta';
import { defineMessages, type IntlShape } from 'react-intl';
export interface ImageAndTextBoxData extends CtaBlockExtender {
  '@type': 'imageandtextbox';
  image: string;
  title: string;
  text?: object;
  boxes?: Array<{ title: string; text: object }>;
}

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
  title_title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  text_title: {
    id: 'Text',
    defaultMessage: 'Text',
  },
  boxes_title: {
    id: 'Boxes',
    defaultMessage: 'Boxes',
  },
  box_title: {
    id: 'Box',
    defaultMessage: 'Box',
  },
  addColumn: {
    id: 'addColumn',
    defaultMessage: 'Add column',
  },
});

export const ImageAndTextBoxSchema = ({
  data,
  intl,
}: {
  data: ImageAndTextBoxData;
  intl: IntlShape;
}): JSONSchema => {
  const schema = {
    title: intl.formatMessage(messages.title),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['title', 'image', 'boxes'],
      },
    ],
    properties: {
      title: {
        title: intl.formatMessage(messages.title_title),
      },
      image: {
        title: intl.formatMessage(messages.image_title),
        widget: 'image',
      },
      boxes: {
        title: intl.formatMessage(messages.boxes_title),
        addMessage: intl.formatMessage(messages.addColumn),
        widget: 'object_list',
        schema: {
          title: intl.formatMessage(messages.box_title),
          fieldsets: [
            {
              id: 'default',
              title: 'Default',
              fields: ['title'],
            },
          ],
          properties: {
            title: {
              title: intl.formatMessage(messages.box_title),
            },
          },
          required: ['title'],
        },
      },
    },
    required: ['title'],
  };
  addCtaFieldset({ schema, intl });
  return schema;
};

export interface ImageAndTextBoxConfig
  extends Omit<BlockConfigBase, 'blockSchema'> {
  blockSchema: typeof ImageAndTextBoxSchema;
}
