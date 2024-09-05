import { useIntl, defineMessages } from 'react-intl';
import cx from 'classnames';
import { SidebarPortal, Icon, UniversalLink } from '@plone/volto/components';
import { BlockDataForm } from '@plone/volto/components/manage/Form';

import type { BlockEditProps } from '@plone/types';

import {
  TextEditorWidget,
  useHandleDetachedBlockFocus,
} from '@redturtle/volto-slate-extras';

import styles from '@redturtle/volto-blocks/components/blocks/Text6/styles.module.css';
import blockIcon from '@redturtle/volto-blocks/icons/text6.svg';
import type { Text6Data } from '@redturtle/volto-blocks/components/blocks/Text6/schema';

import config from '@plone/registry';

type Text6EditProps = Omit<BlockEditProps, 'data'> & {
  data: Text6Data;
};

export default function Edit(props: Text6EditProps) {
  const { data, selected, block, onChangeBlock, blocksConfig, blocksErrors } =
    props;
  const intl = useIntl();

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

  return (
    <>
      <section
        className={cx('block-text6', styles.block)}
        aria-label={data.title}
      >
        <Container className={cx('block-text6-container', styles.container)}>
          <TextEditorWidget
            {...props}
            className={cx('block-text6-title', styles.title)}
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
          {data.linkHref?.[0] && (
            <div className={cx('block-text6-cta', styles.cta)}>
              <UniversalLink
                href={data.linkHref ? data.linkHref[0]['@id'] : undefined}
                openLinkInNewTab={false}
                onClick={(e: React.SyntheticEvent<HTMLLinkElement>) => {
                  e.preventDefault();
                }}
              >
                {data.linkTitle}
              </UniversalLink>
            </div>
          )}
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

const messages = defineMessages({
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  text: {
    id: 'Text',
    defaultMessage: 'Text',
  },
});
