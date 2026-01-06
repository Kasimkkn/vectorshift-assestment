import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { FilterNode } from './nodes/filterNode';
import { TransformNode } from './nodes/transformNode';
import { APINode } from './nodes/apiNode';
import { DatabaseNode } from './nodes/databaseNode';
import { ConditionalNode } from './nodes/conditionalNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  filter: FilterNode,
  transform: TransformNode,
  api: APINode,
  database: DatabaseNode,
  conditional: ConditionalNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  }

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;

        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} style={{ width: '100vw', height: '75vh', background: '#f3f4f6' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType='smoothstep'
        defaultEdgeOptions={{
          style: { strokeWidth: 2, stroke: '#94a3b8' },
          animated: true
        }}
      >
        <Background color="#cbd5e1" gap={gridSize} />
        <Controls
          style={{
            button: {
              backgroundColor: '#fff',
              color: '#1e293b',
              borderBottom: '1px solid #e2e8f0'
            }
          }}
        />
        <MiniMap
          nodeColor={(node) => {
            const colors = {
              customInput: '#10b981',
              llm: '#8b5cf6',
              customOutput: '#ef4444',
              text: '#3b82f6',
              filter: '#f59e0b',
              transform: '#06b6d4',
              api: '#ec4899',
              database: '#6366f1',
              conditional: '#14b8a6'
            };
            return colors[node.type] || '#94a3b8';
          }}
          style={{
            backgroundColor: '#f8fafc',
            border: '2px solid #e2e8f0',
            borderRadius: '8px'
          }}
        />
      </ReactFlow>
    </div>
  )
}