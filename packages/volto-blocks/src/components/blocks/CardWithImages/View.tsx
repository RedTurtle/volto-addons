import { flattenToAppURL } from '@plone/volto/helpers';
import cx from 'classnames';
import { TextBlockView } from '@plone/volto-slate/blocks/Text';
import type { BlockViewProps } from '@plone/types';

import styles from '@redturtle/volto-blocks/components/blocks/CardWithImages/styles.module.css';
import type { CardWithImagesData } from '@redturtle/volto-blocks/components/blocks/CardWithImages/schema';

import config from '@plone/registry';
import CTA from '@redturtle/volto-blocks/components/blocks/commons/CTA';

type Props = BlockViewProps & {
  data: CardWithImagesData;
};

export default function View({ data, className, style }: Props) {
  const img_column_width = data.img_column_width
    ? parseInt(data.img_column_width)
    : 6;

  const Container = config.getComponent('Container').component || 'div';
  const Image = config.getComponent('Image').component;

  return (
    <section
      className={cx('block-cardiwithimages', styles.block, className)}
      style={style}
      aria-label={data.title}
    >
      <Container
        className={cx('block-cardiwithimages-container', styles.container)}
      >
        <div
          className={cx(
            'block-cardiwithimages-image-wrapper',
            `column-width-${img_column_width}`,
            styles['image-wrapper'],
            styles[`column-width-${img_column_width}`],
          )}
        >
          {data.images?.length > 0 &&
            data.images.map((img) => (
              <Image
                key={img['@id']}
                className={cx('block-cardiwithimages-image', styles.image)}
                // TODO serialize image brain in the backend
                src={`${img.image}/@@images/image/large`}
                loading="lazy"
                alt=""
              />
            ))}
        </div>
        <div
          className={cx(
            'block-cardiwithimages-body',
            `column-width-${12 - img_column_width}`,
            styles.body,
            styles[`column-width-${12 - img_column_width}`],
          )}
        >
          {data.title && (
            <h2 className={cx('block-cardiwithimages-title', styles.title)}>
              {data.title}
            </h2>
          )}
          {data.text && (
            <div className={cx('block-cardiwithimages-text', styles.text)}>
              <TextBlockView data={{ value: data.text ?? {} }} />
            </div>
          )}
          {data.linkHref?.[0] && (
            <CTA
              href={data.linkHref ? data.linkHref[0]['@id'] : undefined}
              openLinkInNewTab={false}
              {...data}
            >
              {data.linkTitle}
            </CTA>
          )}
        </div>
      </Container>
    </section>
  );
}
