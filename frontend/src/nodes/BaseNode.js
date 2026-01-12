// BaseNode.js
// Reusable node abstraction for creating node components

import { Handle, Position } from 'reactflow';

/**
 * BaseNode - A reusable abstraction for creating node components
 * 
 * @param {string} id - Unique identifier for the node
 * @param {string} title - Title/header text for the node
 * @param {React.ReactNode} children - Content to render inside the node body
 * @param {Array} inputHandles - Array of input handle configurations: [{id: string, position?: string, style?: object}]
 * @param {Array} outputHandles - Array of output handle configurations: [{id: string, position?: string, style?: object}]
 * @param {object} style - Additional styles for the container
 * @param {number} width - Width of the node (default: 200)
 * @param {number} height - Height of the node (default: 80)
 */
export const BaseNode = ({ 
  id, 
  title, 
  children, 
  inputHandles = [], 
  outputHandles = [], 
  style = {},
  width = 200,
  height = 80 
}) => {
  const containerStyle = {
    width,
    minHeight: height,
    border: '1.5px solid var(--node-border)',
    borderRadius: '8px',
    backgroundColor: 'var(--node-bg)',
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 'var(--shadow-md)',
    transition: 'all 0.2s ease',
    overflow: 'hidden',
    ...style
  };

  const headerStyle = {
    backgroundColor: 'var(--node-header-bg)',
    padding: '10px 12px',
    borderBottom: '1px solid var(--border-color)',
    fontWeight: '600',
    fontSize: '14px',
    color: 'var(--text-primary)',
    display: 'flex',
    alignItems: 'center'
  };

  const bodyStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '12px',
    gap: '8px'
  };

  return (
    <div style={containerStyle} className="base-node">
      {/* Input Handles (Left side) */}
      {inputHandles.map((handle, index) => (
        <Handle
          key={handle.id || `input-${index}`}
          type="target"
          position={Position.Left}
          id={handle.id}
          style={{
            width: '12px',
            height: '12px',
            background: 'var(--handle-color)',
            border: '2px solid var(--node-bg)',
            ...handle.style
          }}
        />
      ))}

      {/* Header */}
      {title && (
        <div style={headerStyle}>
          {title}
        </div>
      )}

      {/* Content/Body */}
      <div style={bodyStyle}>
        {children}
      </div>

      {/* Output Handles (Right side) */}
      {outputHandles.map((handle, index) => (
        <Handle
          key={handle.id || `output-${index}`}
          type="source"
          position={Position.Right}
          id={handle.id}
          style={{
            width: '12px',
            height: '12px',
            background: 'var(--handle-color)',
            border: '2px solid var(--node-bg)',
            ...handle.style
          }}
        />
      ))}
    </div>
  );
};
