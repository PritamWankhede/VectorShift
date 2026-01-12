// dataNode.js
// Data Node - displays static data/content

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { inputStyle, labelStyle } from './nodeStyles';

export const DataNode = ({ id, data }) => {
  const [dataValue, setDataValue] = useState(data?.dataValue || 'Sample Data');

  const handleDataChange = (e) => {
    setDataValue(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Data"
      outputHandles={[{ id: `${id}-output` }]}
    >
      <label style={labelStyle}>
        <span>Value:</span>
        <input 
          type="text" 
          value={dataValue} 
          onChange={handleDataChange}
          style={inputStyle}
          placeholder="Enter data"
          onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
        />
      </label>
    </BaseNode>
  );
};
