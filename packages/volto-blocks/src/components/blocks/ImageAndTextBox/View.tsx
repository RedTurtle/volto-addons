import type { BlockViewProps } from '@plone/types';
import cx from 'classnames';

import type { ImageAndTextBoxData } from '@redturtle/volto-blocks/components/blocks/ImageAndTextBox/schema';
import styles from '@redturtle/volto-blocks/components/blocks/ImageAndTextBox/styles.module.css';
import ViewItem from '@redturtle/volto-blocks/components/blocks/ImageAndTextBox/ViewItem';

import config from '@plone/registry';

type Props = Omit<BlockViewProps, 'data'> & {
  data: ImageAndTextBoxData;
};

export default function View({ data, className, style }: Props) {
  const Container = config.getComponent('Container').component || 'div';

  return (
    <section
      className={cx('block-imageandtextbox', styles.block, className)}
      style={style}
      aria-label={data.title}
    >
      <Container
        className={cx('block-imageandtextbox-container', styles.container)}
      >
        {data.title && (
          <h2 className={cx('block-imageandtextbox-title', styles.title)}>
            {data.title}
          </h2>
        )}
        <div className={cx('block-qubica-wrapper', styles.wrapper)}>
          {data.boxes?.length > 0 &&
            data.boxes.map((item) => (
              <ViewItem key={item['@id']} data={item} />
            ))}
        </div>
      </Container>
    </section>
  );
}
