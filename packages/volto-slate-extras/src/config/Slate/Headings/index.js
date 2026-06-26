import React from 'react';
import HeadingsMenu from '@redturtle/volto-slate-extras/config/Slate/Headings/HeadingsMenu';
import { insertToolbarButtons } from '@redturtle/volto-slate-extras/config/Slate/utils';

export default function install(config) {
  const { slate } = config.settings;

  slate.buttons.headings = (props) => (
    <HeadingsMenu {...props} title="Titolo" />
  );

  // Render headings as native tags so Slate attributes (ref, contentEditable, data-*) land on the
  // actual DOM node. renderLinkElement applied tabIndex={0}, which broke caret positioning inside
  // contentEditable headings. The block className (e.g. alignment) is preserved via {...attributes}.
  slate.elements['h2'] = ({ attributes, children }) => (
    <h2 {...attributes}>{children}</h2>
  );
  slate.elements['h3'] = ({ attributes, children }) => (
    <h3 {...attributes}>{children}</h3>
  );
  slate.elements['h4'] = ({ attributes, children }) => (
    <h4 {...attributes}>{children}</h4>
  );
  // h5, h6 are not provided by volto by default
  slate.elements['h5'] = ({ attributes, children }) => (
    <h5 {...attributes}>{children}</h5>
  );
  slate.elements['h6'] = ({ attributes, children }) => (
    <h6 {...attributes}>{children}</h6>
  );

  // rimuovo i bottoni di heading di volto
  slate.toolbarButtons = slate.toolbarButtons.filter(
    (b) => b !== 'heading-two' && b !== 'heading-three',
  );
  slate.expandedToolbarButtons = slate.expandedToolbarButtons.filter(
    (b) => b !== 'heading-two' && b !== 'heading-three',
  );

  //aggiungo il bottone di headings alla toolbar, dopo strikethrough
  insertToolbarButtons(
    ['separator', 'headings', 'separator'],
    'strikethrough',
    slate,
  );

  return config;
}
