import config from '@plone/registry';
import type { ArrayElement } from '@plone/types';
import { TextBlockView } from '@plone/volto-slate/blocks/Text';
import { UniversalLink } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import type { IconsAndTextData } from '@redturtle/volto-blocks/components/blocks/IconsAndText/schema';
import styles from '@redturtle/volto-blocks/components/blocks/IconsAndText/styles.module.scss';
import cx from 'classnames';

type Props = {
  data: ArrayElement<IconsAndTextData['columns']>;
};

export default function ViewItem({ data }: Props) {
  const icon = data.iconImage;
  const Image = config.getComponent('Image').component;
  return (
    <div
      className={cx(
        'block-iconsandtext-column',
        styles['column-block'],
        styles['divider_' + data.dividerPosition],
      )}
    >
      <div
        className={cx(
          'block-iconsandtext-column-head',
          styles['column-head'],
          styles['header-text-' + data.headerTextPosition],
        )}
      >
        {icon && (
          <div
            className={cx(
              `column_icon size_${data.iconSize}`,
              styles['column_icon'],
              styles[`size_${data.iconSize}`],
            )}
          >
            <Image
              className={cx('block-iconandtext-image', styles.image)}
              src={flattenToAppURL(icon) + '/@@images/image/teaser'}
              loading="lazy"
              alt=""
              role="presentation"
              aria-hidden="true"
            />
          </div>
        )}
        {data.headerTextPosition && (
          <div className={cx(styles['header-text'])}>
            {data.title && (
              <h3
                className={cx('block-iconsandtext-title', styles.title)}
              >
                {data.headerText}
              </h3>
            )}
          </div>
        )}
      </div>
      {data.title && (
        <div className={cx(styles['column-title'])}>
          {data.title && (
            <h4 className={cx('block-iconsandtext-column-title', styles.title)}>
              {data.title}
            </h4>
          )}
        </div>
      )}
      {data.text && (
        <div className={cx('block-iconsandtext-text', styles.text)}>
          <TextBlockView data={{ value: data.text ?? {} }} />
        </div>
      )}
      {data.href_title && data.href?.length > 0 && (
        <div className="column-footer">
          <div className={cx('block-column-cta', styles.cta)}>
            <UniversalLink
              href={data.href ? data.href[0]['@id'] : undefined}
              openLinkInNewTab={false}
            >
              {data.href_title}
            </UniversalLink>
          </div>
        </div>
      )}
    </div>
  );
}
