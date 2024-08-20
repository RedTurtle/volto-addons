import cx from 'classnames';
import { useIntl } from 'react-intl';

import type { ArrayElement } from '@plone/types';
import { TextBlockView } from '@plone/volto-slate/blocks/Text';
import { UniversalLink } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import type { IconsAndTextData } from '@redturtle/volto-blocks/components/blocks/IconsAndText/schema';
import styles from '@redturtle/volto-blocks/components/blocks/IconsAndText/styles.module.scss';

type Props = {
  data: ArrayElement<IconsAndTextData['columns']>;
  focusOn: string;
  setFocusOn: Function;
  onChange: (id: string, field: string, value: unknown) => void;
  selected: boolean;
};

export default function ViewItem({
  data,
  focusOn,
  setFocusOn,
  onChange,
  selected,
}: Props) {
  const intl = useIntl();
  const icon = data.iconImage;

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
          'column-head',
          styles['column-head'],
          styles['header-text-' + data.headerTextPosition],
        )}
      >
        {icon && (
          <div
            className={cx(
              'column_icon size_',
              styles['column_icon'],
              styles[`size_${data.iconSize}`],
            )}
          >
            <img
              src={flattenToAppURL(icon) + '/@@images/image/teaser'}
              alt=""
              role="presentation"
              aria-hidden="true"
            />
          </div>
        )}

        {data.headerTextPosition && (
          <div className="header-text">
            {data.title && (
              <h3
                className={cx('block-iconsandtext-title title', styles.title)}
              >
                {data.headerText}
              </h3>
            )}
          </div>
        )}
      </div>
      {data.title && (
        <div className="column-title">
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
              onClick={(e: React.SyntheticEvent<HTMLLinkElement>) => {
                e.preventDefault();
              }}
            >
              {data.href_title}
            </UniversalLink>
          </div>
        </div>
      )}
    </div>
  );
}
