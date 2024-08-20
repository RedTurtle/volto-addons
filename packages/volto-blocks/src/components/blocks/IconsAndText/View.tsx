import type { BlockViewProps } from '@plone/types';

import type { IconsAndTextData } from '@redturtle/volto-blocks/components/blocks/IconsAndText/schema';

import config from '@plone/registry';

type Props = Omit<BlockViewProps, 'data'> & {
  data: IconsAndTextData;
};

export default function View({ data, className, style }: Props) {
  const column_number = data.column_number ? parseInt(data.column_number) : 3;

  const Container = config.getComponent('Container').component || 'div';
  const Image = config.getComponent('Image').component;

  return <div>TEST</div>;
}
