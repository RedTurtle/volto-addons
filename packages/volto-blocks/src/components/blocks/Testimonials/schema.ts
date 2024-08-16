import { defineMessages, type IntlShape } from 'react-intl';
import type { BlockConfigBase, JSONSchema } from '@plone/types';
import { addAlignmentStyle } from '@redturtle/volto-blocks/components/blocks/extenders/styles';
import {
  addCtaFieldset,
  type CtaBlockExtender,
} from '@redturtle/volto-blocks/components/blocks/extenders/cta';

export interface TestimonialsData extends CtaBlockExtender {
  '@type': 'testimonials';
  testimonials?: Array<{ '@id': string; testimonial: string }>;
  title?: string;
  text?: object;
}

export const TestimonialsSchema = ({
  data,
  intl,
}: {
  data: TestimonialsData;
  intl: IntlShape;
}): JSONSchema => {
  const schema = {
    title: intl.formatMessage(messages.title),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['title', 'testimonials'],
      },
    ],
    properties: {
      testimonials: {
        title: intl.formatMessage(messages.testimonials_title),
        widget: 'object_list',
        schema: {
          title: intl.formatMessage(messages.testimonial_title),
          fieldsets: [
            {
              id: 'default',
              title: 'Default',
              fields: ['testimonial'],
            },
          ],
          properties: {
            testimonial: {
              title: intl.formatMessage(messages.testimonial_title),
            },
          },
          required: [],
        },
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
  addAlignmentStyle({ schema, intl, formData: data });

  return schema;
};

const messages = defineMessages({
  title: {
    id: 'redturtle__volto-blocks__testimonials_title',
    defaultMessage: 'Testimonials',
  },
  testimonials_title: {
    id: 'redturtle__volto-blocks__testimonials_testimonials_title',
    defaultMessage: 'Testimonials',
  },
  testimonial_title: {
    id: 'redturtle__volto-blocks__testimonials_testimonial_title',
    defaultMessage: 'Testimonial',
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

export interface TestimonialsConfig
  extends Omit<BlockConfigBase, 'blockSchema'> {
  blockSchema: typeof TestimonialsSchema;
}
