// nodeStyles.js
// Shared styling constants for node form elements

export const inputStyle = {
  padding: '6px 8px',
  fontSize: '13px',
  border: '1px solid var(--border-color)',
  borderRadius: '6px',
  backgroundColor: 'var(--surface)',
  color: 'var(--text-primary)',
  width: '100%',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s ease',
  outline: 'none'
};

export const selectStyle = {
  padding: '6px 8px',
  fontSize: '13px',
  border: '1px solid var(--border-color)',
  borderRadius: '6px',
  backgroundColor: 'var(--surface)',
  color: 'var(--text-primary)',
  width: '100%',
  cursor: 'pointer',
  transition: 'border-color 0.2s ease',
  outline: 'none'
};

export const labelStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  fontSize: '12px',
  color: 'var(--text-secondary)',
  fontWeight: '500'
};
