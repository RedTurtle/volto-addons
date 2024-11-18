import cx from 'classnames';
import { TextBlockView } from '@plone/volto-slate/blocks/Text';
import type { BlockViewProps } from '@plone/types';

import styles from '@redturtle/volto-blocks/components/blocks/CallToAction/styles.module.css';
import type { CallToActionData } from '@redturtle/volto-blocks/components/blocks/CallToAction/schema';

import config from '@plone/registry';
import CTA from '@redturtle/volto-blocks/components/blocks/commons/CTA';

type Props = BlockViewProps & {
  data: CallToActionData;
};

export default function View({ data, className, style }: Props) {
  const Container = config.getComponent('Container').component || 'div';

  return (
    <section
      className={cx('block-calltoaction', styles.block, className)}
      style={style}
      aria-label={data.title}
    >
      <Container
        className={cx('block-calltoaction-container', styles.container)}
      >
        {data.title && (
          <h2 className={cx('block-calltoaction-title', styles.title)}>
            {data.title}
          </h2>
        )}
        {data.text && (
          <div className={cx('block-calltoaction-text', styles.text)}>
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
