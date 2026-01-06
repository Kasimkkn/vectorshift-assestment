export const nodeConfigs = {
    customInput: {
        title: 'Input',
        icon: '📥',
        color: '#10b981',
        description: 'Define input parameters',
        fields: [
            {
                name: 'inputName',
                label: 'Name',
                type: 'text',
                defaultValue: 'input_1',
                placeholder: 'Enter input name'
            },
            {
                name: 'inputType',
                label: 'Type',
                type: 'select',
                defaultValue: 'Text',
                options: [
                    { value: 'Text', label: 'Text' },
                    { value: 'File', label: 'File' }
                ]
            }
        ],
        handles: [
            { type: 'source', id: 'value' }
        ]
    },

    llm: {
        title: 'LLM',
        icon: '🤖',
        color: '#8b5cf6',
        description: 'Large Language Model processing',
        fields: [],
        handles: [
            { type: 'target', id: 'system', style: { top: '33%' } },
            { type: 'target', id: 'prompt', style: { top: '66%' } },
            { type: 'source', id: 'response' }
        ]
    },

    customOutput: {
        title: 'Output',
        icon: '📤',
        color: '#ef4444',
        description: 'Define output parameters',
        fields: [
            {
                name: 'outputName',
                label: 'Name',
                type: 'text',
                defaultValue: 'output_1',
                placeholder: 'Enter output name'
            },
            {
                name: 'outputType',
                label: 'Type',
                type: 'select',
                defaultValue: 'Text',
                options: [
                    { value: 'Text', label: 'Text' },
                    { value: 'Image', label: 'Image' }
                ]
            }
        ],
        handles: [
            { type: 'target', id: 'value' }
        ]
    },

    filter: {
        title: 'Filter',
        icon: '🔍',
        color: '#f59e0b',
        description: 'Filter data based on conditions',
        fields: [
            {
                name: 'condition',
                label: 'Condition',
                type: 'select',
                defaultValue: 'contains',
                options: [
                    { value: 'contains', label: 'Contains' },
                    { value: 'equals', label: 'Equals' },
                    { value: 'startsWith', label: 'Starts With' },
                    { value: 'endsWith', label: 'Ends With' }
                ]
            },
            {
                name: 'value',
                label: 'Value',
                type: 'text',
                placeholder: 'Filter value'
            }
        ],
        handles: [
            { type: 'target', id: 'input' },
            { type: 'source', id: 'output' }
        ]
    },

    transform: {
        title: 'Transform',
        icon: '🔄',
        color: '#06b6d4',
        description: 'Transform data format',
        fields: [
            {
                name: 'operation',
                label: 'Operation',
                type: 'select',
                defaultValue: 'uppercase',
                options: [
                    { value: 'uppercase', label: 'Uppercase' },
                    { value: 'lowercase', label: 'Lowercase' },
                    { value: 'trim', label: 'Trim' },
                    { value: 'reverse', label: 'Reverse' }
                ]
            }
        ],
        handles: [
            { type: 'target', id: 'input' },
            { type: 'source', id: 'output' }
        ]
    },

    api: {
        title: 'API Call',
        icon: '🌐',
        color: '#ec4899',
        description: 'Make HTTP API requests',
        fields: [
            {
                name: 'method',
                label: 'Method',
                type: 'select',
                defaultValue: 'GET',
                options: [
                    { value: 'GET', label: 'GET' },
                    { value: 'POST', label: 'POST' },
                    { value: 'PUT', label: 'PUT' },
                    { value: 'DELETE', label: 'DELETE' }
                ]
            },
            {
                name: 'url',
                label: 'URL',
                type: 'text',
                placeholder: 'https://api.example.com'
            }
        ],
        handles: [
            { type: 'target', id: 'params' },
            { type: 'source', id: 'response' },
            { type: 'source', id: 'error', style: { top: '70%' } }
        ]
    },

    database: {
        title: 'Database',
        icon: '💾',
        color: '#6366f1',
        description: 'Query database',
        fields: [
            {
                name: 'operation',
                label: 'Operation',
                type: 'select',
                defaultValue: 'select',
                options: [
                    { value: 'select', label: 'SELECT' },
                    { value: 'insert', label: 'INSERT' },
                    { value: 'update', label: 'UPDATE' },
                    { value: 'delete', label: 'DELETE' }
                ]
            },
            {
                name: 'query',
                label: 'Query',
                type: 'textarea',
                rows: 3,
                placeholder: 'SELECT * FROM table'
            }
        ],
        handles: [
            { type: 'target', id: 'connection' },
            { type: 'source', id: 'result' }
        ]
    },

    conditional: {
        title: 'Conditional',
        icon: '⚡',
        color: '#14b8a6',
        description: 'Branch based on condition',
        fields: [
            {
                name: 'operator',
                label: 'Operator',
                type: 'select',
                defaultValue: 'equals',
                options: [
                    { value: 'equals', label: '==' },
                    { value: 'notEquals', label: '!=' },
                    { value: 'greaterThan', label: '>' },
                    { value: 'lessThan', label: '<' }
                ]
            },
            {
                name: 'threshold',
                label: 'Threshold',
                type: 'number',
                defaultValue: 0,
                placeholder: 'Comparison value'
            }
        ],
        handles: [
            { type: 'target', id: 'input' },
            { type: 'source', id: 'true', style: { top: '40%' } },
            { type: 'source', id: 'false', style: { top: '60%' } }
        ]
    }
};