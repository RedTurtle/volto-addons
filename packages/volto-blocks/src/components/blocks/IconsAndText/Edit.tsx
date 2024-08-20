import { Icon, SidebarPortal } from '@plone/volto/components';
import { BlockDataForm } from '@plone/volto/components/manage/Form';
import { useIntl } from 'react-intl';

import type { BlockEditProps } from '@plone/types';

import type { IconsAndTextData } from '@redturtle/volto-blocks/components/blocks/IconsAndText/schema';
import blockIcon from '@redturtle/volto-blocks/icons/icons_and_text.svg';
import {
  TextEditorWidget,
  useHandleDetachedBlockFocus,
} from '@redturtle/volto-rt-slate';

import config from '@plone/registry';

type IconsAndTextEditProps = Omit<BlockEditProps, 'data'> & {
  data: IconsAndTextData;
};

export default function Edit(props: IconsAndTextEditProps) {
  const { data, selected, block, onChangeBlock, blocksConfig, blocksErrors } =
    props;
  const intl = useIntl();

  const column_number = data.column_number ? parseInt(data.column_number) : 3;

  const { selectedField, setSelectedField } = useHandleDetachedBlockFocus(
    props,
    'title',
  );

  const schema = blocksConfig[data['@type']].blockSchema({
    data,
    intl,
  });

  if (__SERVER__) {
    return <div />;
  }

  const Container = config.getComponent('Container').component || 'div';
  const Image = config.getComponent('Image').component;

  return (
    <>
      <section
        className={cx('block-iconsandtext', styles.block)}
        aria-label={data.title}
      >
        <Container
          className={cx('block-iconsandtext-container', styles.container)}
        >
          <div
            className={cx(
              'block-iconsandtext-image-wrapper',
              `column-width-${column_number}`,
              styles['image-wrapper'],
              styles[`column-width-${column_number}`],
            )}
          >
            <TextEditorWidget
              {...props}
              className={cx('block-text7-title', styles.title)}
              as="h2"
              data={data}
              fieldName="title"
              selected={selected && selectedField === 'title'}
              setSelected={setSelectedField}
              focusNextField={() => {
                setSelectedField('text');
              }}
              showToolbar={false}
              placeholder={intl.formatMessage(messages.title)}
            />
            <TextEditorWidget
              {...props}
              fieldName="text"
              selected={selected && selectedField === 'text'}
              setSelected={setSelectedField}
              focusPrevField={() => {
                setSelectedField('title');
              }}
              placeholder={intl.formatMessage(messages.text)}
            />
          </div>
        </Container>
      </section>
      {/* @ts-expect-error TODO */}
      <SidebarPortal selected={selected}>
        {schema && (
          <BlockDataForm
            icon={<Icon size="24px" name={blockIcon} />}
            schema={schema}
            title={schema.title}
            onChangeField={(id: string, value: unknown) => {
              onChangeBlock(block, {
                ...data,
                [id]: value,
              });
            }}
            onChangeBlock={onChangeBlock}
            formData={data}
            block={block}
            errors={blocksErrors}
          />
        )}
      </SidebarPortal>
    </>
  );
}
