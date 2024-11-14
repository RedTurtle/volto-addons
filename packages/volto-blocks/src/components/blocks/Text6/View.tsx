import { UniversalLink } from '@plone/volto/components';
import cx from 'classnames';
import { TextBlockView } from '@plone/volto-slate/blocks/Text';
import type { BlockViewProps } from '@plone/types';

import styles from '@redturtle/volto-blocks/components/blocks/Text6/styles.module.css';
import type { Text6Data } from '@redturtle/volto-blocks/components/blocks/Text6/schema';

import config from '@plone/registry';
import CTA from '../commons/CTA';

type Props = BlockViewProps & {
  data: Text6Data;
};

export default function View({ data, className, style }: Props) {
  const Container = config.getComponent('Container').component || 'div';

  return (
    <section
      className={cx('block-text6', styles.block, className)}
      style={style}
      aria-label={data.title}
    >
      <Container className={cx('block-text6-container', styles.container)}>
        {data.title && (
          <h2 className={cx('block-text6-title', styles.title)}>
            {data.title}
          </h2>
        )}
        {data.text && (
          <div className={cx('block-text6-text', styles.text)}>
            <TextBlockView data={{ value: data.text ?? {} }} />
          </div>
        )}
        {data.linkHref?.[0] && (
          <CTA
            href={data.linkHref ? data.linkHref[0]['@id'] : undefined}
            linkTitle={data.linkTitle}
            openLinkInNewTab={false}
            {...data}
          />
        )}
      </Container>
    </section>
  );
}
