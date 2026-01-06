import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    const nodeCategories = [
        {
            title: 'I/O Nodes',
            nodes: [
                { type: 'customInput', label: 'Input', icon: '📥', color: '#10b981' },
                { type: 'customOutput', label: 'Output', icon: '📤', color: '#ef4444' },
                { type: 'text', label: 'Text', icon: '📝', color: '#3b82f6' },
            ]
        },
        {
            title: 'Processing',
            nodes: [
                { type: 'llm', label: 'LLM', icon: '🤖', color: '#8b5cf6' },
                { type: 'filter', label: 'Filter', icon: '🔍', color: '#f59e0b' },
                { type: 'transform', label: 'Transform', icon: '🔄', color: '#06b6d4' },
            ]
        },
        {
            title: 'Integration',
            nodes: [
                { type: 'api', label: 'API', icon: '🌐', color: '#ec4899' },
                { type: 'database', label: 'Database', icon: '💾', color: '#6366f1' },
                { type: 'conditional', label: 'Conditional', icon: '⚡', color: '#14b8a6' },
            ]
        }
    ];

    return (
        <div className="pipeline-toolbar">
            <div className="toolbar-content">
                <div className="toolbar-categories">
                    {nodeCategories.map((category, idx) => (
                        <div key={idx} className="toolbar-category">
                            <h3 className="category-title">
                                {category.title}
                            </h3>
                            <div className="category-nodes">
                                {category.nodes.map((node) => (
                                    <DraggableNode
                                        key={node.type}
                                        type={node.type}
                                        label={node.label}
                                        icon={node.icon}
                                        color={node.color}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="toolbar-hint">
                    <p>💡 Drag nodes onto the canvas to build your pipeline</p>
                </div>
            </div>
        </div>
    );
};