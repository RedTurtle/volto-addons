import { useState } from 'react';
import cx from 'classnames';
import { Icon } from '@plone/volto/components';
import { TextBlockView } from '@plone/volto-slate/blocks/Text';

import type { ArrayElement } from '@plone/types';

import styles from '@redturtle/volto-blocks/components/blocks/Accordion/styles.module.css';
import arrowUpSVG from '@redturtle/volto-blocks/icons/arrow-up.svg';
import type { AccordionData } from '@redturtle/volto-blocks/components/blocks/Accordion/schema';

type Props = {
  data: ArrayElement<AccordionData['items']>;
};

export default function EditItem({ data }: Props) {
  const [collapsed, setCollapsed] = useState(true);

  // reference: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion
  return (
    <div className={cx('block-accordion-item', styles.item)}>
      <h3 className={cx('block-accordion-item-title', styles.itemTitle)}>
        <button
          type="button"
          aria-expanded={!collapsed}
          aria-controls={'section' + data['@id']}
          id={'accordion' + data['@id']}
          onClick={() => setCollapsed(!collapsed)}
        >
          {data.title}
          <Icon className="arrow-button" name={arrowUpSVG} size="6px" />
        </button>
      </h3>
      <div
        id={'section' + data['@id']}
        role="region"
        aria-labelledby={'accordion' + data['@id']}
        hidden={collapsed}
      >
        <TextBlockView data={{ value: data.text ?? {} }} />
      </div>
    </div>
  );
}
