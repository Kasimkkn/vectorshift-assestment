import { Handle, Position } from 'reactflow';
import { useState, useEffect } from 'react';

export const BaseNode = ({ id, data, config }) => {
    const {
        title,
        description,
        fields = [],
        handles = [],
        icon,
        color = '#3b82f6',
        minWidth = 220,
        minHeight = 100
    } = config;

    const [fieldValues, setFieldValues] = useState(() => {
        const initialValues = {};
        fields.forEach(field => {
            initialValues[field.name] = data?.[field.name] || field.defaultValue || '';
        });
        return initialValues;
    });

    const handleFieldChange = (fieldName, value) => {
        setFieldValues(prev => ({
            ...prev,
            [fieldName]: value
        }));
    };

    const renderField = (field) => {
        switch (field.type) {
            case 'text':
                return (
                    <input
                        type="text"
                        value={fieldValues[field.name]}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        style={{
                            width: '100%',
                            padding: '6px 8px',
                            border: '1px solid #e5e7eb',
                            borderRadius: '6px',
                            fontSize: '13px',
                            backgroundColor: '#f9fafb',
                            outline: 'none',
                            transition: 'all 0.2s'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = color;
                            e.target.style.backgroundColor = '#fff';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = '#e5e7eb';
                            e.target.style.backgroundColor = '#f9fafb';
                        }}
                    />
                );

            case 'textarea':
                return (
                    <textarea
                        value={fieldValues[field.name]}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        rows={field.rows || 3}
                        style={{
                            width: '100%',
                            padding: '6px 8px',
                            border: '1px solid #e5e7eb',
                            borderRadius: '6px',
                            fontSize: '13px',
                            backgroundColor: '#f9fafb',
                            outline: 'none',
                            resize: 'vertical',
                            fontFamily: 'inherit'
                        }}
                    />
                );

            case 'select':
                return (
                    <select
                        value={fieldValues[field.name]}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        style={{
                            width: '100%',
                            padding: '6px 8px',
                            border: '1px solid #e5e7eb',
                            borderRadius: '6px',
                            fontSize: '13px',
                            backgroundColor: '#f9fafb',
                            outline: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        {field.options.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );

            case 'number':
                return (
                    <input
                        type="number"
                        value={fieldValues[field.name]}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        min={field.min}
                        max={field.max}
                        step={field.step}
                        style={{
                            width: '100%',
                            padding: '6px 8px',
                            border: '1px solid #e5e7eb',
                            borderRadius: '6px',
                            fontSize: '13px',
                            backgroundColor: '#f9fafb',
                            outline: 'none'
                        }}
                    />
                );

            default:
                return null;
        }
    };

    const renderHandle = (handle, index) => {
        const isSource = handle.type === 'source';
        const position = isSource ? Position.Right : Position.Left;

        return (
            <Handle
                key={`${handle.type}-${handle.id || index}`}
                type={handle.type}
                position={position}
                id={`${id}-${handle.id || index}`}
                style={{
                    background: color,
                    width: '10px',
                    height: '10px',
                    border: '2px solid #fff',
                    ...handle.style
                }}
            />
        );
    };

    return (
        <div
            style={{
                minWidth: `${minWidth}px`,
                minHeight: `${minHeight}px`,
                background: '#fff',
                border: `2px solid ${color}`,
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                overflow: 'hidden'
            }}
        >
            <div
                style={{
                    background: color,
                    padding: '10px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}
            >
                {icon && <span style={{ fontSize: '18px' }}>{icon}</span>}
                <span style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>
                    {title}
                </span>
            </div>

            <div style={{ padding: '12px' }}>
                {description && (
                    <p style={{
                        margin: '0 0 12px 0',
                        fontSize: '12px',
                        color: '#6b7280',
                        lineHeight: '1.4'
                    }}>
                        {description}
                    </p>
                )}

                {fields.map((field, index) => (
                    <div key={field.name} style={{ marginBottom: index < fields.length - 1 ? '10px' : '0' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '12px',
                            fontWeight: '500',
                            color: '#374151',
                            marginBottom: '4px'
                        }}>
                            {field.label}
                        </label>
                        {renderField(field)}
                    </div>
                ))}
            </div>

            {handles.map((handle, index) => renderHandle(handle, index))}
        </div>
    );
};