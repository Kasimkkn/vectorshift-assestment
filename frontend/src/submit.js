import { useStore } from './store';

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const handleSubmit = async () => {
    try {
      // Prepare the pipeline data
      const pipelineData = {
        nodes: nodes.map(node => ({
          id: node.id,
          type: node.type,
          position: node.position,
          data: node.data
        })),
        edges: edges.map(edge => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
          sourceHandle: edge.sourceHandle,
          targetHandle: edge.targetHandle
        }))
      };

      // Send to backend
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pipelineData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Show custom modal
      showCustomModal(result);

    } catch (error) {
      console.error('Error submitting pipeline:', error);
      alert(`❌ Error: ${error.message}\n\nPlease ensure the backend is running on http://localhost:8000`);
    }
  };

  const showCustomModal = (result) => {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    const modal = document.createElement('div');
    modal.className = 'modal-container';

    const isDAG = result.is_dag;
    const messageClass = isDAG ? 'success' : 'error';
    const statClass = isDAG ? 'success' : 'error';

    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-icon">
          ${isDAG ? '✅' : '❌'}
        </div>
        <h2 class="modal-title">
          Pipeline Analysis
        </h2>
        
        <div class="modal-stats">
          <div class="modal-stat-row">
            <span class="modal-stat-label">Nodes:</span>
            <span class="modal-stat-value">${result.num_nodes}</span>
          </div>
          <div class="modal-stat-row">
            <span class="modal-stat-label">Edges:</span>
            <span class="modal-stat-value">${result.num_edges}</span>
          </div>
          <div class="modal-stat-row">
            <span class="modal-stat-label">Valid DAG:</span>
            <span class="modal-stat-value ${statClass}">
              ${isDAG ? 'Yes' : 'No'}
            </span>
          </div>
        </div>

        <div class="modal-message ${messageClass}">
          <p>
            ${isDAG
        ? '✨ Your pipeline is structurally valid and contains no circular dependencies. It\'s ready to execute!'
        : '⚠️ Your pipeline contains circular dependencies. Please review your connections to remove any cycles.'}
          </p>
        </div>

        <button class="modal-close-button" onclick="this.closest('.modal-overlay').remove()">
          Close
        </button>
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Close on overlay click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.remove();
      }
    });
  };

  return (
    <div className="submit-button-container">
      <button
        type="button"
        onClick={handleSubmit}
        className="submit-button"
      >
        Submit Pipeline
      </button>
    </div>
  );
};