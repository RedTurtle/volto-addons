import { defineMessages, type IntlShape } from 'react-intl';
import type { BlockConfigBase, JSONSchema } from '@plone/types';
import { addAlignmentStyle } from '@redturtle/volto-blocks/components/blocks/extenders/styles';
import {
  addCtaFieldset,
  type CtaBlockExtender,
} from '@redturtle/volto-blocks/components/blocks/extenders/cta';

export interface Text6Data extends CtaBlockExtender {
  '@type': 'text6';
  title?: string;
  text?: object;
}

export const Text6Schema = ({
  data,
  intl,
}: {
  data: Text6Data;
  intl: IntlShape;
}): JSONSchema => {
  const schema = {
    title: intl.formatMessage(messages.title),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['title'],
      },
    ],
    properties: {
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
    alignments: ['left', 'center'],
    defaultAlign: 'center',
  });

  return schema;
};

const messages = defineMessages({
  title: {
    id: 'redturtle__volto-blocks__text6_title',
    defaultMessage: 'Text 6',
  },
  // text: {
  //   id: 'Text',
  //   defaultMessage: 'Text',
  // },
  title_title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
});

export interface Text6Config extends Omit<BlockConfigBase, 'blockSchema'> {
  blockSchema: typeof Text6Schema;
}
