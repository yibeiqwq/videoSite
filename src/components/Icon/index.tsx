import { createFromIconfontCN } from '@ant-design/icons';
import React from 'react';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3729279_psgcqkee79i.js',
});

interface Props {
  type: string;
  style?: React.CSSProperties;
  color?: string;
}

const Icon: React.FC<Props> = ({ type, style, color }) => (
  <IconFont type={type} style={style} color={color} />
);

export { Icon };
