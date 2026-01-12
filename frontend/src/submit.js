// submit.js

import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

export const SubmitButton = () => {
    const [isLoading, setIsLoading] = useState(false);
    
    // Get nodes and edges from store
    const { nodes, edges } = useStore(
        (state) => ({
            nodes: state.nodes,
            edges: state.edges
        }),
        shallow
    );

    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: 'var(--surface)',
        borderTop: '1px solid var(--border-color)'
    };

    const buttonStyle = {
        padding: '12px 32px',
        fontSize: '16px',
        fontWeight: '600',
        color: '#ffffff',
        backgroundColor: isLoading ? 'var(--text-secondary)' : 'var(--primary-color)',
        border: 'none',
        borderRadius: '8px',
        cursor: isLoading ? 'not-allowed' : 'pointer',
        boxShadow: 'var(--shadow-md)',
        transition: 'all 0.2s ease',
        opacity: isLoading ? 0.7 : 1
    };

    const handleMouseEnter = (e) => {
        if (!isLoading) {
            e.target.style.backgroundColor = 'var(--primary-hover)';
            e.target.style.boxShadow = 'var(--shadow-lg)';
            e.target.style.transform = 'translateY(-2px)';
        }
    };

    const handleMouseLeave = (e) => {
        if (!isLoading) {
            e.target.style.backgroundColor = 'var(--primary-color)';
            e.target.style.boxShadow = 'var(--shadow-md)';
            e.target.style.transform = 'translateY(0)';
        }
    };

    const handleSubmit = async () => {
        if (isLoading) return;

        // Validate that there are nodes
        if (nodes.length === 0) {
            alert('Please add at least one node to the pipeline before submitting.');
            return;
        }

        setIsLoading(true);

        try {
            // Get API URL from environment variable, fallback to localhost for development
            const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
            
            // Send pipeline data to backend
            const response = await fetch(`${apiUrl}/pipelines/parse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nodes: nodes,
                    edges: edges
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Display alert with results
            const dagStatus = data.is_dag ? 'Yes (Valid DAG)' : 'No (Contains Cycles)';
            const message = `Pipeline Analysis Results:\n\n` +
                          `Number of Nodes: ${data.num_nodes}\n` +
                          `Number of Edges: ${data.num_edges}\n` +
                          `Is DAG: ${dagStatus}`;

            alert(message);

        } catch (error) {
            console.error('Error submitting pipeline:', error);
            const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
            alert(`Error submitting pipeline. Make sure the backend server is running on ${apiUrl}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={containerStyle}>
            <button 
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                style={buttonStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {isLoading ? 'Submitting...' : 'Submit Pipeline'}
            </button>
        </div>
    );
}
