import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  useEffect(() => {
    const regex = /\{\{(\s*\w+\s*)\}\}/g;
    const matches = [...currText.matchAll(regex)];
    const extractedVars = matches.map(match => match[1].trim());

    const uniqueVars = [...new Set(extractedVars)];
    setVariables(uniqueVars);
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const lines = currText.split('\n').length;
  const longestLine = Math.max(...currText.split('\n').map(line => line.length), 10);

  const dynamicWidth = Math.max(220, Math.min(longestLine * 8 + 40, 500));
  const dynamicHeight = Math.max(120, Math.min(lines * 24 + 80, 400));

  return (
    <div
      style={{
        width: `${dynamicWidth}px`,
        minHeight: `${dynamicHeight}px`,
        background: '#fff',
        border: '2px solid #3b82f6',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        overflow: 'visible',
        position: 'relative'
      }}
    >
      <div
        style={{
          background: '#3b82f6',
          padding: '10px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          borderRadius: '10px 10px 0 0'
        }}
      >
        <span style={{ fontSize: '18px' }}>📝</span>
        <span style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>
          Text
        </span>
      </div>

      <div style={{ padding: '12px' }}>
        <label style={{
          display: 'block',
          fontSize: '12px',
          fontWeight: '500',
          color: '#374151',
          marginBottom: '6px'
        }}>
          Text Content
        </label>
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          placeholder="Enter text with {{variables}}..."
          style={{
            width: '100%',
            minHeight: '60px',
            padding: '8px',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            fontSize: '13px',
            backgroundColor: '#f9fafb',
            outline: 'none',
            resize: 'none',
            fontFamily: 'monospace',
            lineHeight: '1.5'
          }}
          rows={Math.max(3, lines)}
        />

        {variables.length > 0 && (
          <div style={{
            marginTop: '8px',
            fontSize: '11px',
            color: '#6b7280',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px'
          }}>
            <span>Variables:</span>
            {variables.map((v, i) => (
              <span
                key={i}
                style={{
                  background: '#dbeafe',
                  color: '#1e40af',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontFamily: 'monospace'
                }}
              >
                {v}
              </span>
            ))}
          </div>
        )}
      </div>

      {variables.map((variable, index) => (
        <Handle
          key={`var-${variable}`}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          style={{
            top: variables.length === 1
              ? '50%'
              : `${20 + (index * 60) / (variables.length - 1)}%`,
            background: '#3b82f6',
            width: '10px',
            height: '10px',
            border: '2px solid #fff'
          }}
        />
      ))}

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          background: '#3b82f6',
          width: '10px',
          height: '10px',
          border: '2px solid #fff'
        }}
      />
    </div>
  );
};