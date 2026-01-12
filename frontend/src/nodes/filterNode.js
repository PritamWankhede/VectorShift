// filterNode.js
// Filter Node - filters data based on a condition

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { selectStyle, labelStyle } from './nodeStyles';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'contains');

  const handleConditionChange = (e) => {
    setCondition(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Filter"
      inputHandles={[{ id: `${id}-input` }]}
      outputHandles={[{ id: `${id}-output` }]}
    >
      <label style={labelStyle}>
        <span>Condition:</span>
        <select 
          value={condition} 
          onChange={handleConditionChange}
          style={selectStyle}
          onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
        >
          <option value="contains">Contains</option>
          <option value="equals">Equals</option>
          <option value="starts">Starts With</option>
          <option value="ends">Ends With</option>
        </select>
      </label>
    </BaseNode>
  );
};
