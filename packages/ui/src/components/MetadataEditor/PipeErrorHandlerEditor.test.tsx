import catalogLibrary from '@kaoto/camel-catalog/index.json';
import { CatalogLibrary } from '@kaoto/camel-catalog/types';
import { within } from '@testing-library/dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { KaotoSchemaDefinition } from '../../models';
import { getFirstCatalogMap } from '../../stubs/test-load-catalog';
import { PipeErrorHandlerEditor } from './PipeErrorHandlerEditor';

describe('PipeErrorHandlerEditor', () => {
  let pipeErrorHandlerSchema: Record<string, KaotoSchemaDefinition['schema']>;

  beforeAll(async () => {
    const catalogsMap = await getFirstCatalogMap(catalogLibrary as CatalogLibrary);

    pipeErrorHandlerSchema = await import(
      `${catalogsMap.catalogPath}${catalogsMap.catalogDefinition.schemas.PipeErrorHandler.file}`
    );
  });

  it('should render', () => {
    const model = {
      log: {
        parameters: {
          maximumRedeliveries: 3,
          redeliveryDelay: 2000,
        },
      },
    };
    render(<PipeErrorHandlerEditor model={model} onChangeModel={() => {}} schema={pipeErrorHandlerSchema} />);
    const element = screen.getByTestId('metadata-editor-form-Log Pipe ErrorHandler');
    expect(element).toBeTruthy();
    const inputs = screen.getAllByTestId('text-field');
    expect(inputs.length).toBe(2);
    expect(inputs[0].getAttribute('name')).toBe('log.parameters.maximumRedeliveries');
    expect(inputs[1].getAttribute('name')).toBe('log.parameters.redeliveryDelay');
  });

  it('should not render a form if model is empty', () => {
    render(<PipeErrorHandlerEditor model={{}} onChangeModel={() => {}} schema={pipeErrorHandlerSchema} />);
    const element = screen.queryByTestId('metadata-editor-form-Log Pipe ErrorHandler');
    expect(element).toBeFalsy();
  });

  it('should render a form if sink ErrorHandler is selected', async () => {
    let model: Record<string, unknown> = {};
    render(
      <PipeErrorHandlerEditor
        model={{}}
        onChangeModel={(m) => {
          model = m;
        }}
        schema={pipeErrorHandlerSchema}
      />,
    );
    const button = screen.getByRole('button');
    await act(async () => {
      fireEvent(button!, new MouseEvent('click', { bubbles: true }));
    });
    const options = screen.getAllByTestId(/pipe-error-handler-select-option.*/);
    options.forEach((option) => {
      if (option.innerHTML.includes('Log Pipe ErrorHandler')) {
        const button = within(option).getByRole('option');
        fireEvent(button, new MouseEvent('click', { bubbles: true }));
      }
    });
    const element = screen.getByTestId('metadata-editor-form-Log Pipe ErrorHandler');
    expect(element).toBeTruthy();
    expect(model.log).toBeTruthy();
  });
});
