import { UniversalLink } from '@plone/volto/components';
import cx from 'classnames';
import { TextBlockView } from '@plone/volto-slate/blocks/Text';
import type { BlockViewProps } from '@plone/types';

import styles from '@redturtle/volto-blocks/components/blocks/Text1/styles.module.css';
import type { Text1Data } from '@redturtle/volto-blocks/components/blocks/Text1/schema';

import config from '@plone/registry';

type Props = Omit<BlockViewProps, 'data'> & {
  data: Text1Data;
};

export default function View({ data, className, style }: Props) {
  const Container = config.getComponent('Container').component || 'div';

  return (
    <section
      className={cx('block-text1', styles.block, className)}
      style={style}
      aria-label={data.title}
    >
      <Container className={cx('block-text1-container', styles.container)}>
        <div className={cx('block-text1-narrow-col', styles.narrow)}>
          {data.title && (
            <h2 className={cx('block-text1-title', styles.title)}>
              {data.title}
            </h2>
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
        <div className={cx('block-text1-wide-col', styles.wide)}>
          {data.text && (
            <div className={cx('block-text1-text', styles.text)}>
              <TextBlockView data={{ value: data.text ?? {} }} />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
