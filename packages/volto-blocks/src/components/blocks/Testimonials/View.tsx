import { UniversalLink } from '@plone/volto/components';
import cx from 'classnames';
import { TextBlockView } from '@plone/volto-slate/blocks/Text';
import type { BlockViewProps } from '@plone/types';

import styles from '@redturtle/volto-blocks/components/blocks/Testimonials/styles.module.css';
import type { TestimonialsData } from '@redturtle/volto-blocks/components/blocks/Testimonials/schema';

import config from '@plone/registry';

type Props = Omit<BlockViewProps, 'data'> & {
  data: TestimonialsData;
};

export default function View({ data, className, style }: Props) {
  const Container = config.getComponent('Container').component || 'div';
  // const Image = config.getComponent('Image').component;

  return (
    <section
      className={cx('block-testimonials', styles.block, className)}
      style={style}
      aria-label={data.title}
    >
      <Container
        className={cx('block-testimonials-container', styles.container)}
      >
        <div
          className={cx(
            'block-testimonials-testimonials-wrapper',
            styles['testimonials-wrapper'],
          )}
        >
          {data.testimonials?.length > 0 &&
            data.testimonials.map((testimonial) => (
              <p key={testimonial['@id']}>{testimonial.testimonial}</p>
            ))}
        </div>
        <div className={cx('block-testimonials-body', styles.body)}>
          {data.title && (
            <h2 className={cx('block-testimonials-title', styles.title)}>
              {data.title}
            </h2>
          )}
          {data.text && (
            <div className={cx('block-testimonials-text', styles.text)}>
              <TextBlockView data={{ value: data.text ?? {} }} />
            </div>
          )}
          {data.linkHref?.[0] && (
            <div className={cx('block-testimonials-cta', styles.cta)}>
              <UniversalLink
                href={data.linkHref ? data.linkHref[0]['@id'] : undefined}
                openLinkInNewTab={false}
              >
                {data.linkTitle}
              </UniversalLink>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
