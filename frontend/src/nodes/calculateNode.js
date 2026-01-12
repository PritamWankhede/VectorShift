// calculateNode.js
// Calculate Node - performs calculations

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { selectStyle, labelStyle } from './nodeStyles';

export const CalculateNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');

  const handleOperationChange = (e) => {
    setOperation(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Calculate"
      inputHandles={[
        { id: `${id}-input1` },
        { id: `${id}-input2` }
      ]}
      outputHandles={[{ id: `${id}-output` }]}
    >
      <label style={labelStyle}>
        <span>Operation:</span>
        <select 
          value={operation} 
          onChange={handleOperationChange}
          style={selectStyle}
          onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
        >
          <option value="add">Add (+)</option>
          <option value="subtract">Subtract (-)</option>
          <option value="multiply">Multiply (×)</option>
          <option value="divide">Divide (÷)</option>
        </select>
      </label>
    </BaseNode>
  );
};
