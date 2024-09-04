import React from 'react';
import cx from 'classnames';
import { UniversalLink } from '@plone/volto/components';
import { isInternalURL, flattenToAppURL } from '@plone/volto/helpers';
import config from '@plone/volto/registry';

const ViewLink = ({
  url,
  target,
  download,
  children,
  className,
  dataElement,
}) => {
  const { openExternalLinkInNewTab } = config.settings;
  let dataElementAttr = {};
  if (dataElement) {
    dataElementAttr['data-element'] = dataElement;
  }
  return (
    <UniversalLink
      href={url}
      openLinkInNewTab={
        (openExternalLinkInNewTab && !isInternalURL(url)) || target === '_blank'
      }
      download={download}
      className={className}
      {...dataElementAttr}
    >
      {children}
    </UniversalLink>
  );
};

export const LinkElement = (props) => {
  const { link_enhancer } = config.settings['@redturtle/volto-slate-extras'];
  const { attributes, children, element, mode = 'edit' } = props;

  let dataElementAttr = {};
  if (element.data.dataElement) {
    dataElementAttr['data-element'] = element.data.dataElement;
  }

  let enhanced_link = link_enhancer ? link_enhancer(element) : null;

  const extended_children = enhanced_link?.children ?? <></>;

  return mode === 'view' ? (
    <ViewLink {...(element.data || {})} {...attributes}>
      {children}
      {extended_children}
    </ViewLink>
  ) : (
    <a
      {...attributes}
      {...dataElementAttr}
      className={cx('slate-editor-link ', {
        [attributes?.className ?? '']: attributes?.className,
        external: !isInternalURL(element.data?.url),
      })}
      href={
        isInternalURL(element.data?.url)
          ? flattenToAppURL(element.data?.url)
          : element.data?.url
      }
      onClick={(e) => e.preventDefault()}
    >
      {Array.isArray(children)
        ? children.map((child, i) => {
            if (child?.props?.decorations) {
              const isSelection =
                child.props.decorations.findIndex((deco) => deco.isSelection) >
                -1;
              if (isSelection)
                return (
                  <span className="highlight-selection" key={`${i}-sel`}>
                    {child}
                  </span>
                );
            }
            return child;
          })
        : children}
      {extended_children}
    </a>
  );
};
