import { defineMessages, type IntlShape } from 'react-intl';
import { addStyling } from '@plone/volto/helpers/Extensions/withBlockSchemaEnhancer';
import type { BlockConfigBase, JSONSchema } from '@plone/types';

export type TestimonialsData = {
  '@type': 'testimonials';
  testimonials?: Array<{ '@id': string; testimonial: string }>;
  title?: string;
  text?: object;
  right?: boolean;
  // TODO fix any
  linkHref?: any;
  linkTitle?: string;
};

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
      {
        id: 'cta',
        title: intl.formatMessage(messages.cta_fieldset_title),
        fields: ['linkHref', 'linkTitle'],
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
      linkTitle: {
        title: intl.formatMessage(messages.LinkTitle),
        default: intl.formatMessage(messages.cta_title_default),
      },
      linkHref: {
        title: intl.formatMessage(messages.LinkTo),
        widget: 'object_browser',
        mode: 'link',
        selectedItemAttrs: ['Title', 'Description'],
        allowExternals: true,
      },
    },
    required: ['title'],
  };

  addStyling({ schema, intl, formData: data });

  // @ts-ignore
  schema.properties.styles.schema.properties.align = {
    widget: 'align',
    title: intl.formatMessage(messages.align),
    // actions: ['left', 'right', 'center'],
    actions: ['left', 'right'],
    default: 'left',
  };

  // @ts-ignore
  schema.properties.styles.schema.fieldsets[0].fields = ['align'];

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
  cta_fieldset_title: {
    id: 'redturtle__volto-blocks__cta_fieldset_title',
    defaultMessage: 'Call to action',
  },
  // copied from core listing block
  LinkTitle: {
    id: 'Link title',
    defaultMessage: 'Link Title',
  },
  // copied from core listing block
  LinkTo: {
    id: 'Link to',
    defaultMessage: 'Link to',
  },
  cta_title_default: {
    id: 'redturtle__volto-blocks__cta_title_default',
    defaultMessage: 'Read more',
  },
  // copied from core teaser block
  align: {
    id: 'Alignment',
    defaultMessage: 'Alignment',
  },
});

export type TestimonialsConfig = Omit<BlockConfigBase, 'blockSchema'> & {
  blockSchema: typeof TestimonialsSchema;
};
