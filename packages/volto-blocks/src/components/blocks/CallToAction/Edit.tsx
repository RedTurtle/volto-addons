import { useIntl, defineMessages } from 'react-intl';
import cx from 'classnames';
import { SidebarPortal, Icon, UniversalLink } from '@plone/volto/components';
import { BlockDataForm } from '@plone/volto/components/manage/Form';

import type { BlockEditProps } from '@plone/types';

import {
  TextEditorWidget,
  useHandleDetachedBlockFocus,
} from '@redturtle/volto-slate-extras';

import styles from '@redturtle/volto-blocks/components/blocks/CallToAction/styles.module.css';
import blockIcon from '@redturtle/volto-blocks/icons/calltoaction.svg';
import type { CallToActionData } from '@redturtle/volto-blocks/components/blocks/CallToAction/schema';

import config from '@plone/registry';

type CallToActionEditProps = BlockEditProps & {
  data: CallToActionData;
};

export default function Edit(props: CallToActionEditProps) {
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
        className={cx('block-calltoaction', styles.block)}
        aria-label={data.title}
      >
        <Container
          className={cx('block-calltoaction-container', styles.container)}
        >
          <TextEditorWidget
            {...props}
            className={cx('block-calltoaction-title', styles.title)}
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
            <div className={cx('block-calltoaction-cta', styles.cta)}>
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
      {/* @ts-expect-error TODO fix */}
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