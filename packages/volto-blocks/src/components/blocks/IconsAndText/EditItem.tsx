import config from '@plone/registry';
import type { ArrayElement } from '@plone/types';
import { UniversalLink } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import type { IconsAndTextData } from '@redturtle/volto-blocks/components/blocks/IconsAndText/schema';
import styles from '@redturtle/volto-blocks/components/blocks/IconsAndText/styles.module.scss';
import { TextEditorWidget } from '@redturtle/volto-rt-slate';
import cx from 'classnames';
import { defineMessages, useIntl } from 'react-intl';
type Props = {
  data: ArrayElement<IconsAndTextData['columns']>;
  focusOn: string;
  setFocusOn: Function;
  onChange: (id: string, field: string, value: unknown) => void;
  selected: boolean;
};

export default function EditItem({
  data,
  focusOn,
  setFocusOn,
  onChange,
  selected,
}: Props) {
  const intl = useIntl();
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
          'column-head',
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
            <TextEditorWidget
              className={cx(styles['column-title'])}
              as="h3"
              block={data['@id']}
              data={data}
              fieldName="headerText"
              selected={selected && focusOn === 'headerText' + data['@id']}
              setSelected={() => setFocusOn('headerText' + data['@id'])}
              onChangeBlock={(id: string, value: { headerText: string }) => {
                onChange(id, 'headerText', value.headerText);
              }}
              showToolbar={false}
              placeholder={intl.formatMessage(messages.textPlaceholder)}
            />
          </div>
        )}
      </div>
      <TextEditorWidget
        className={cx('block-iconsandtext-column-title', styles.itemTitle)}
        as="h4"
        block={data['@id']}
        data={data}
        fieldName="title"
        selected={selected && focusOn === 'title' + data['@id']}
        setSelected={() => setFocusOn('title' + data['@id'])}
        onChangeBlock={(id: string, value: { title: string }) => {
          onChange(id, 'title', value.title);
        }}
        showToolbar={false}
        placeholder={intl.formatMessage(messages.title)}
      />
      <TextEditorWidget
        className={cx('block-iconsandtext-column-text', styles.itemText)}
        as="div"
        block={data['@id']}
        data={data}
        fieldName="text"
        selected={selected && focusOn === 'text' + data['@id']}
        setSelected={() => setFocusOn('text' + data['@id'])}
        onChangeBlock={(id: string, value: { text: string }) => {
          onChange(id, 'text', value.text);
        }}
        placeholder={intl.formatMessage(messages.text)}
      />
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

const messages = defineMessages({
  title: {
    id: 'Title',
    defaultMessage: 'Title...',
  },
  text: {
    id: 'Text',
    defaultMessage: 'Type Text...',
  },
  textPlaceholder: {
    id: 'Text placeholder',
    defaultMessage: 'Type header text...',
  },
});
