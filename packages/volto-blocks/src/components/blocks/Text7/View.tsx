import { flattenToAppURL } from '@plone/volto/helpers';
import { UniversalLink } from '@plone/volto/components';
import cx from 'classnames';
import { TextBlockView } from '@plone/volto-slate/blocks/Text';
import type { BlockViewProps } from '@plone/types';

import styles from '@redturtle/volto-blocks/components/blocks/Text7/styles.module.css';
import type { Text7Data } from '@redturtle/volto-blocks/components/blocks/Text7/schema';

import config from '@plone/registry';

type Props = Omit<BlockViewProps, 'data'> & {
  data: Text7Data;
  className?: string;
  style?: Record<string, string | number>;
};

export default function View({ data, className, style }: Props) {
  // const intl = useIntl();

  const img_column_width = data.img_column_width
    ? parseInt(data.img_column_width)
    : 6;

  const Container = config.getComponent('Container').component || 'div';
  const Image = config.getComponent('Image').component;

  return (
    <section
      className={cx('block-text7', styles.block, className)}
      style={style}
      aria-label={data.title}
    >
      <Container className={cx('block-text7-container', styles.container)}>
        <div
          className={cx(
            'block-text7-image-wrapper',
            `column-width-${img_column_width}`,
            styles['image-wrapper'],
            styles[`column-width-${img_column_width}`],
          )}
        >
          {data.image && (
            <Image
              className={cx('block-text7-image', styles.image)}
              // TODO serialize image brain in the backend
              src={`${data.image}/@@images/image/large`}
              loading="lazy"
              alt=""
            />
          )}
        </div>
        <div
          className={cx(
            'block-text7-body',
            `column-width-${12 - img_column_width}`,
            styles.body,
            styles[`column-width-${12 - img_column_width}`],
          )}
        >
          {data.title && (
            <h2 className={cx('block-text7-title', styles.title)}>
              {data.title}
            </h2>
          )}
          {data.text && (
            <div className={cx('block-text7-text', styles.text)}>
              <TextBlockView data={{ value: data.text ?? {} }} />
            </div>
          )}
          {data.linkHref?.[0] && (
            <div className={cx('block-text7-cta', styles.cta)}>
              <UniversalLink
                href={
                  data.linkHref
                    ? flattenToAppURL(data.linkHref[0]['@id'])
                    : undefined
                }
                openLinkInNewTab={false}
                onClick={(e) => {
                  e.preventDefault();
                }}
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
