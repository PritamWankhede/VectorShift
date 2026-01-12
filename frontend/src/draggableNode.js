// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.target.style.opacity = '0.7';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };

    const onDragEnd = (event) => {
      event.target.style.cursor = 'grab';
      event.target.style.opacity = '1';
    };
  
    const buttonStyle = {
      cursor: 'grab', 
      minWidth: '90px', 
      height: '42px',
      display: 'flex', 
      alignItems: 'center', 
      borderRadius: '8px',
      backgroundColor: 'var(--primary-color)',
      color: '#ffffff',
      justifyContent: 'center', 
      flexDirection: 'column',
      border: 'none',
      fontWeight: '500',
      fontSize: '13px',
      boxShadow: 'var(--shadow-sm)',
      transition: 'all 0.2s ease',
      userSelect: 'none'
    };
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={onDragEnd}
        onMouseEnter={(e) => {
          if (e.target.style.cursor !== 'grabbing') {
            e.target.style.backgroundColor = 'var(--primary-hover)';
            e.target.style.boxShadow = 'var(--shadow-md)';
            e.target.style.transform = 'translateY(-2px)';
          }
        }}
        onMouseLeave={(e) => {
          if (e.target.style.cursor !== 'grabbing') {
            e.target.style.backgroundColor = 'var(--primary-color)';
            e.target.style.boxShadow = 'var(--shadow-sm)';
            e.target.style.transform = 'translateY(0)';
          }
        }}
        style={buttonStyle}
        draggable
      >
          <span>{label}</span>
      </div>
    );
  };
  