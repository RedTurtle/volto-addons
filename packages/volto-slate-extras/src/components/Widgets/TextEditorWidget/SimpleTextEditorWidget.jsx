/**
 * Edit simple text block.
 * @module components/Widgets/SimpleTextEditorWidget/SimpleTextEditorWidget
 *
 * E' un editor di testo da mettere nei blocchi, senza formattazione.
 */

import React, { useRef, useEffect } from 'react';

import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import { useInView } from 'react-intersection-observer';

import './simpleTextEditorWidget.css';
import config from '@plone/volto/registry';

const messages = defineMessages({
  text: {
    id: 'Type text…',
    defaultMessage: 'Type text…',
  },
});

const SimpleTextEditorWidget = (props) => {
  const intl = useIntl();
  const {
    data,
    setSelected,
    onSelectBlock,
    onChangeBlock,
    fieldName,
    block,
    value,
    selected,
    placeholder,
    as = 'div',
  } = props;
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '0px 0px 200px 0px',
  });

  const fieldRef = useRef();
  const caretPos = useRef();

  const handleKey = (event) => {
    const { slate } = config.settings;

    const handlers = slate.textblockDetachedKeyboardHandlers[event.key];

    if (handlers) {
      // a handler can return `true` to signify it has handled the event in this
      // case, the execution flow is stopped
      const handlerProps = {
        getBlockProps: () => {
          return { ...props };
        },
        getSavedSelection: () => null,
      };
      return handlers.find((handler) =>
        handler({ editor: handlerProps, event }),
      );
    }
  };

  function getCaret(el) {
    let caretAt = 0;
    const sel = window.getSelection();

    if (sel.rangeCount === 0) {
      return caretAt;
    }

    const range = sel.getRangeAt(0);
    const preRange = range.cloneRange();
    preRange.selectNodeContents(el);
    preRange.setEnd(range.endContainer, range.endOffset);
    caretAt = preRange.toString().length;

    return caretAt;
  }

  function setCaret(el, offset) {
    const sel = window.getSelection();
    const range = document.createRange();

    if (el.childNodes?.length > 0) {
      const node = el.childNodes[0];
      const maxOffset = node.textContent?.length ?? 0;
      const clampedOffset = Math.min(offset, maxOffset);
      range.setStart(node, clampedOffset);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }

  const setDefaultCaretPosition = () => {
    setCaret(fieldRef.current, caretPos.current);
  };

  useEffect(() => {
    if (selected) {
      fieldRef.current.focus();
      setDefaultCaretPosition();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  useEffect(() => {
    //inizializzazione del valore nel campo
    const _value = value ?? data[fieldName];
    if (fieldRef.current && _value?.length > 0) {
      fieldRef.current.innerText = _value;
      if (selected) setDefaultCaretPosition();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, data]);

  const selectThis = () => {
    if (setSelected) {
      setSelected(fieldName ?? true);
    } else if (onSelectBlock) {
      onSelectBlock(block);
    }
  };

  const pasteAsTextPlain = (e) => {
    e.preventDefault();
    var text = '';
    if (e.clipboardData || e.originalEvent.clipboardData) {
      text = (e.originalEvent || e).clipboardData.getData('text/plain');
    } else if (window.clipboardData) {
      text = window.clipboardData.getData('Text');
    }

    text = text.replaceAll('\n', ' ');

    if (document.queryCommandSupported('insertText')) {
      document.execCommand('insertText', false, text);
    } else {
      document.execCommand('paste', false, text);
    }
  };

  const WrapperComponent = as;
  return (
    <WrapperComponent className="simple-text-editor-widget" ref={ref}>
      <span
        className="simple-text-input"
        contentEditable={inView} //se è in view è editabile, altrimenti è readOnly
        dir="ltr"
        suppressContentEditableWarning={true}
        role="textbox"
        tabIndex={0}
        placeholder={placeholder || intl.formatMessage(messages.text)}
        onInput={(e) => {
          let retVal = {
            value: e.target.textContent,
          };
          if (fieldName) {
            retVal = { [fieldName]: e.target.textContent };
          }

          caretPos.current = getCaret(fieldRef.current);
          onChangeBlock(block, { ...data, ...retVal });
        }}
        onFocus={(e) => {
          if (!selected) {
            selectThis();
          }
        }}
        onBlur={(e) => {
          setSelected(fieldName ? null : false);
        }}
        onPaste={(e) => {
          pasteAsTextPlain(e);
        }}
        onKeyDown={handleKey}
        ref={fieldRef}
      />
    </WrapperComponent>
  );
};

SimpleTextEditorWidget.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  setSelected: PropTypes.func.isRequired,
  onSelectBlock: PropTypes.func.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  block: PropTypes.string.isRequired,
  value: PropTypes.string,
  selected: PropTypes.bool.isRequired,
  placeholder: PropTypes.string.isRequired,
  focusPrevField: PropTypes.func,
  focusNextField: PropTypes.func,
  //from block props:
  properties: PropTypes.objectOf(PropTypes.any).isRequired,
  onFocusPreviousBlock: PropTypes.func.isRequired,
  onFocusNextBlock: PropTypes.func.isRequired,
};

export default SimpleTextEditorWidget;
