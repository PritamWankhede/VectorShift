// textNode.js

import { useState, useMemo, useRef, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { inputStyle, labelStyle } from './nodeStyles';

/**
 * Extract valid JavaScript variable names from {{ variable }} syntax
 */
const extractVariables = (text) => {
  // Regex to match {{ variableName }} where variableName is a valid JS identifier
  const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  const matches = [];
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    const variableName = match[1];
    if (!matches.includes(variableName)) {
      matches.push(variableName);
    }
  }
  
  return matches;
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);

  // Extract variables from text
  const variables = useMemo(() => extractVariables(currText), [currText]);

  // Calculate dynamic dimensions based on text length
  const calculateDimensions = () => {
    const minWidth = 200;
    const minHeight = 100;
    const maxWidth = 500;
    const lineHeight = 24;
    const padding = 24; // 12px padding on each side
    const headerHeight = 42; // Header height
    const baseHeight = 60; // Base content height

    // Estimate width based on longest line
    const lines = currText.split('\n');
    const longestLine = lines.reduce((longest, line) => {
      // Rough estimate: 8px per character for monospace-like font
      const estimatedWidth = line.length * 8 + padding;
      return Math.max(longest, estimatedWidth);
    }, minWidth);

    const width = Math.min(Math.max(longestLine, minWidth), maxWidth);
    
    // Calculate height based on number of lines
    const numLines = Math.max(lines.length, 1);
    const contentHeight = Math.max(numLines * lineHeight + 20, baseHeight);
    const height = headerHeight + contentHeight;

    return { width, height: Math.max(height, minHeight) };
  };

  const { width, height } = calculateDimensions();

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Create input handles for each variable
  const inputHandles = useMemo(() => {
    if (variables.length === 0) return [];
    
    // Distribute handles evenly along the left side
    return variables.map((variable, index) => {
      const totalHandles = variables.length;
      const position = totalHandles === 1 
        ? '50%' 
        : `${(index + 1) * (100 / (totalHandles + 1))}%`;
      
      return {
        id: `${id}-${variable}`,
        style: { top: position }
      };
    });
  }, [variables, id]);

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
    transition: 'width 0.2s ease, min-height 0.2s ease',
    overflow: 'hidden',
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

  const textareaStyle = {
    ...inputStyle,
    minHeight: '60px',
    resize: 'vertical',
    fontFamily: 'inherit',
    lineHeight: '1.5',
    overflowY: 'auto'
  };

  return (
    <div style={containerStyle} className="text-node">
      {/* Input Handles (Left side) - dynamically created for each variable */}
      {inputHandles.map((handle) => (
        <Handle
          key={handle.id}
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
      <div style={headerStyle}>
        Text
      </div>

      {/* Body */}
      <div style={bodyStyle}>
        <label style={labelStyle}>
          <span>Text:</span>
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={handleTextChange}
            style={textareaStyle}
            placeholder="Enter text with {{ variables }}"
            rows={3}
            onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
          />
        </label>
        
        {/* Show variables hint */}
        {variables.length > 0 && (
          <div style={{
            fontSize: '11px',
            color: 'var(--text-secondary)',
            fontStyle: 'italic',
            marginTop: '4px'
          }}>
            Variables: {variables.join(', ')}
          </div>
        )}
      </div>

      {/* Output Handle (Right side) */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          width: '12px',
          height: '12px',
          background: 'var(--handle-color)',
          border: '2px solid var(--node-bg)',
        }}
      />
    </div>
  );
}
