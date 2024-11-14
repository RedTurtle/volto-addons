import { defineMessages, type IntlShape } from 'react-intl';
import type { BlockConfigBase, JSONSchema } from '@plone/types';
import { addAlignmentStyle } from '@redturtle/volto-blocks/components/blocks/extenders/styles';
import {
  addCtaFieldset,
  type CtaBlockExtender,
} from '@redturtle/volto-blocks/components/blocks/extenders/cta';

export interface CallToActionData extends CtaBlockExtender {
  '@type': 'calltoaction';
  title?: string;
  text?: object;
}

export const CallToActionSchema = ({
  data,
  intl,
}: {
  data: CallToActionData;
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
    id: 'redturtle__volto-blocks__calltoaction_title',
    defaultMessage: 'Call To Action',
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

export interface CallToActionConfig extends Omit<BlockConfigBase, 'blockSchema'> {
  blockSchema: typeof CallToActionSchema;
}
