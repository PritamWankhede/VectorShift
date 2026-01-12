// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    const toolbarStyle = {
        backgroundColor: 'var(--surface)',
        borderBottom: '1px solid var(--border-color)',
        padding: '16px 20px',
        boxShadow: 'var(--shadow-sm)'
    };

    const titleStyle = {
        fontSize: '18px',
        fontWeight: '600',
        color: 'var(--text-primary)',
        marginBottom: '16px'
    };

    const nodesContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        alignItems: 'center'
    };

    return (
        <div style={toolbarStyle}>
            <div style={titleStyle}>Pipeline Nodes</div>
            <div style={nodesContainerStyle}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='transform' label='Transform' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='data' label='Data' />
                <DraggableNode type='calculate' label='Calculate' />
                <DraggableNode type='merge' label='Merge' />
            </div>
        </div>
    );
};