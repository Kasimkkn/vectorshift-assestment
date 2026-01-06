import { BaseNode } from '../BaseNode';
import { nodeConfigs } from '../nodeConfigs';

export const ConditionalNode = ({ id, data }) => {
    return <BaseNode id={id} data={data} config={nodeConfigs.conditional} />;
};