import { Button, Icon } from '@patternfly/react-core';
import { EyeIcon, EyeSlashIcon, TrashIcon } from '@patternfly/react-icons';
import { Table, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import { FunctionComponent, useCallback, useContext, useRef } from 'react';
import { BaseVisualCamelEntity } from '../../../../models/visualization/base-visual-entity';
import { EntitiesContext } from '../../../../providers/entities.provider';
import { VisibleFlowsContext } from '../../../../providers/visible-flows.provider';
import { InlineEdit } from '../../../InlineEdit';
import './FlowsList.scss';
import { FlowsListEmptyState } from './FlowsListEmptyState';
import { RouteIdValidator } from '../../../InlineEdit/routeIdValidator';
import { ValidationResult } from '../../../../models';

interface IFlowsList {
  onClose?: () => void;
}

export const FlowsList: FunctionComponent<IFlowsList> = (props) => {
  const { visualEntities, camelResource, updateEntitiesFromCamelResource } = useContext(EntitiesContext)!;
  const { visibleFlows, visualFlowsApi } = useContext(VisibleFlowsContext)!;

  const isListEmpty = visualEntities.length === 0;

  const columnNames = useRef({
    id: 'Route Id',
    isVisible: 'Visibility',
    delete: 'Delete',
  });

  const onSelectFlow = useCallback(
    (flowId: string): void => {
      visualFlowsApi.hideAllFlows();
      visualFlowsApi.toggleFlowVisible(flowId);
      props.onClose?.();
    },
    [props, visualFlowsApi],
  );

  const routeIdValidator = useCallback(
    (value: string): ValidationResult => {
      return RouteIdValidator.validateUniqueName(value, visualEntities);
    },
    [visualEntities],
  );

  return isListEmpty ? (
    <FlowsListEmptyState data-testid="flows-list-empty-state" />
  ) : (
    <Table className="flows-list-table" variant="compact" data-testid="flows-list-table">
      <Thead>
        <Tr>
          <Th>{columnNames.current.id}</Th>
          <Th>{columnNames.current.isVisible}</Th>
          <Th>{columnNames.current.delete}</Th>
        </Tr>
      </Thead>
      <Tbody>
        {visualEntities.map((flow: BaseVisualCamelEntity) => (
          <Tr key={flow.id} data-testid={`flows-list-row-${flow.id}`}>
            <Td dataLabel={columnNames.current.id}>
              <InlineEdit
                data-testid={`goto-btn-${flow.id}`}
                value={flow.id}
                validator={routeIdValidator}
                onClick={() => {
                  onSelectFlow(flow.id);
                }}
                onChange={(name) => {
                  visualFlowsApi.renameFlow(flow.id, name);
                  flow.setId(name);
                  updateEntitiesFromCamelResource();
                }}
              />
              {/*TODO add description*/}
            </Td>

            <Td dataLabel={columnNames.current.isVisible}>
              <Button
                data-testid={`toggle-btn-${flow.id}`}
                icon={
                  visibleFlows[flow.id] ? (
                    <Icon isInline>
                      <EyeIcon data-testid={`toggle-btn-${flow.id}-visible`} />
                    </Icon>
                  ) : (
                    <Icon isInline>
                      <EyeSlashIcon data-testid={`toggle-btn-${flow.id}-hidden`} />
                    </Icon>
                  )
                }
                variant="plain"
                onClick={(event) => {
                  visualFlowsApi.toggleFlowVisible(flow.id);
                  /** Required to avoid closing the Dropdown after clicking in the icon */
                  event.stopPropagation();
                }}
              />
            </Td>

            <Td dataLabel={columnNames.current.delete}>
              <Button
                data-testid={`delete-btn-${flow.id}`}
                icon={<TrashIcon />}
                variant="plain"
                onClick={(event) => {
                  camelResource.removeEntity(flow.id);
                  updateEntitiesFromCamelResource();
                  /** Required to avoid closing the Dropdown after clicking in the icon */
                  event.stopPropagation();
                }}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
