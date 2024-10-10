import cx from 'classnames';
import type { BlockViewProps } from '@plone/types';

import styles from '@redturtle/volto-blocks/components/blocks/Accordion/styles.module.css';
import ViewItem from '@redturtle/volto-blocks/components/blocks/Accordion/ViewItem';
import type { AccordionData } from '@redturtle/volto-blocks/components/blocks/Accordion/schema';

import config from '@plone/registry';

type Props = BlockViewProps & {
  data: AccordionData;
};

export default function View({ data, className, style }: Props) {
  const Container = config.getComponent('Container').component || 'div';

  return (
    <section
      className={cx('block-accordion', styles.block, className)}
      style={style}
      aria-label={data.title}
    >
      <Container className={cx('block-accordion-container', styles.container)}>
        {data.title && (
          <h2 className={cx('block-accordion-title', styles.title)}>
            {data.title}
          </h2>
        )}
        <div className={cx('block-accordion-wrapper', styles.wrapper)}>
          {data.items?.length > 0 &&
            data.items.map((item) => (
              <ViewItem key={item['@id']} data={item} />
            ))}
        </div>
      </Container>
    </section>
  );
}
