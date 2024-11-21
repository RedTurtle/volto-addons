import { useIntl, defineMessages } from 'react-intl';
import cx from 'classnames';
import { SidebarPortal, Icon } from '@plone/volto/components';
import { BlockDataForm } from '@plone/volto/components/manage/Form';

import type { BlockEditProps } from '@plone/types';

import {
  TextEditorWidget,
  useHandleDetachedBlockFocus,
} from '@redturtle/volto-slate-extras';

import styles from '@redturtle/volto-blocks/components/blocks/PageIntro/styles.module.css';
import blockIcon from '@redturtle/volto-blocks/icons/pageintro.svg';
import type { PageIntroData } from '@redturtle/volto-blocks/components/blocks/PageIntro/schema';

import config from '@plone/registry';
import CTA from '@redturtle/volto-blocks/components/blocks/commons/CTA';

type PageIntroEditProps = BlockEditProps & {
  data: PageIntroData;
};

export default function Edit(props: PageIntroEditProps) {
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
        className={cx('block-pageintro', styles.block)}
        aria-label={data.title}
      >
        <Container
          className={cx('block-pageintro-container', styles.container)}
        >
          <div className={cx('block-pageintro-narrow-col', styles.narrow)}>
            <TextEditorWidget
              {...props}
              className={cx('block-pageintro-title', styles.title)}
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
            {data.linkHref?.[0] && (
              <CTA
                href={data.linkHref ? data.linkHref[0]['@id'] : undefined}
                onClick={(e: React.SyntheticEvent<HTMLLinkElement>) => {
                  e.preventDefault();
                }}
                openLinkInNewTab={false}
                {...data}
              >
                {data.linkTitle}
              </CTA>
            )}
          </div>
          <div className={cx('block-pageintro-wide-col', styles.wide)}>
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
