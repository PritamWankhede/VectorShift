// mergeNode.js
// Merge Node - merges multiple inputs into one output

import { BaseNode } from './BaseNode';

export const MergeNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="Merge"
      inputHandles={[
        { id: `${id}-input1`, style: { top: '25%' } },
        { id: `${id}-input2`, style: { top: '50%' } },
        { id: `${id}-input3`, style: { top: '75%' } }
      ]}
      outputHandles={[{ id: `${id}-output` }]}
    >
      <div style={{ 
        fontSize: '13px', 
        textAlign: 'center', 
        padding: '12px 0',
        color: 'var(--text-secondary)'
      }}>
        Combines multiple inputs
      </div>
    </BaseNode>
  );
};
