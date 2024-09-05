import React from 'react';
import { useSlate } from 'slate-react';

import { ToolbarButton } from '@plone/volto-slate/editor/ui';

import circleMenuSVG from '@plone/volto/icons/circle-menu.svg';

import {
  toggleStyle,
  isLinkStyleActive,
} from '@redturtle/volto-slate-extras/config/Slate/Dropdown/dropdownUtils';
import { insertToolbarButtons } from '@redturtle/volto-slate-extras/config/Slate/utils';
import { LinkElement } from '@redturtle/volto-slate-extras/config/Slate/Link/renderer';
import config from '@plone/volto/registry';

const LinkButtonButton = ({ icon, active, ...props }) => {
  const { link_button_class } =
    config.settings['@redturtle/volto-slate-extras'];
  const CLASSNAME = link_button_class + ' inline-link';
  const editor = useSlate();
  const isActive = isLinkStyleActive(editor, CLASSNAME);

  return (
    <ToolbarButton
      {...props}
      icon={icon}
      active={isActive}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleStyle(editor, { cssClass: CLASSNAME, isBlock: false });
      }}
    />
  );
};

export default function install(config) {
  const { slate } = config.settings;

  slate.buttons.linkButton = (props) => (
    <LinkButtonButton title="Stile bottone" icon={circleMenuSVG} {...props} />
  );
  slate.elements.link = LinkElement;

  //aggiungo il bottone di headings alla toolbar, dopo strikethrough
  insertToolbarButtons(['linkButton'], 'link', slate);

  //htmlTagToSlate deserializer is defined in ./Link/deserializer.js
  return config;
}
