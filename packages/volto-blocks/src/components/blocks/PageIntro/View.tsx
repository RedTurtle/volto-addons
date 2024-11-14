import { UniversalLink } from '@plone/volto/components';
import cx from 'classnames';
import { TextBlockView } from '@plone/volto-slate/blocks/Text';
import type { BlockViewProps } from '@plone/types';

import styles from '@redturtle/volto-blocks/components/blocks/PageIntro/styles.module.css';
import type { PageIntroData } from '@redturtle/volto-blocks/components/blocks/PageIntro/schema';

import config from '@plone/registry';

type Props = BlockViewProps & {
  data: PageIntroData;
};

export default function View({ data, className, style }: Props) {
  const Container = config.getComponent('Container').component || 'div';

  return (
    <section
      className={cx('block-pageintro', styles.block, className)}
      style={style}
      aria-label={data.title}
    >
      <Container className={cx('block-pageintro-container', styles.container)}>
        <div className={cx('block-pageintro-narrow-col', styles.narrow)}>
          {data.title && (
            <h2 className={cx('block-pageintro-title', styles.title)}>
              {data.title}
            </h2>
          )}
          {data.linkHref?.[0] && (
            <div className={cx('block-pageintro-cta', styles.cta)}>
              <UniversalLink
                href={data.linkHref ? data.linkHref[0]['@id'] : undefined}
                openLinkInNewTab={false}
              >
                {data.linkTitle}
              </UniversalLink>
            </div>
          )}
        </div>
        <div className={cx('block-pageintro-wide-col', styles.wide)}>
          {data.text && (
            <div className={cx('block-pageintro-text', styles.text)}>
              <TextBlockView data={{ value: data.text ?? {} }} />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
