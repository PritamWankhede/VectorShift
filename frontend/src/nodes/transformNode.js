// transformNode.js
// Transform Node - transforms data using a rule

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { selectStyle, labelStyle } from './nodeStyles';

export const TransformNode = ({ id, data }) => {
  const [transformRule, setTransformRule] = useState(data?.transformRule || 'upper');

  const handleRuleChange = (e) => {
    setTransformRule(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Transform"
      inputHandles={[{ id: `${id}-input` }]}
      outputHandles={[{ id: `${id}-output` }]}
    >
      <label style={labelStyle}>
        <span>Rule:</span>
        <select 
          value={transformRule} 
          onChange={handleRuleChange}
          style={selectStyle}
          onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
        >
          <option value="upper">To Uppercase</option>
          <option value="lower">To Lowercase</option>
          <option value="reverse">Reverse</option>
          <option value="trim">Trim</option>
        </select>
      </label>
    </BaseNode>
  );
};
