export const DraggableNode = ({ type, label, icon, color }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="draggable-node"
      onDragStart={(event) => onDragStart(event, type)}
      style={{ backgroundColor: color || '#1C2536' }}
      draggable
    >
      <span className="draggable-node-icon">{icon}</span>
      <span className="draggable-node-label">{label}</span>
    </div>
  );
};