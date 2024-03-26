import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { AutoField } from '@kaoto-next/uniforms-patternfly';

import { AutoForm } from 'uniforms';
import { CustomAutoFieldDetector } from '../CustomAutoField';
import { SchemaService } from '../schema.service';
import { CustomNestField } from './CustomNestField';

describe('CustomNestField', () => {
  const mockSchema = {
    title: 'Test',
    type: 'object',
    additionalProperties: false,
    properties: {
      parameters: {
        type: 'object',
        title: 'Endpoint Properties',
        description: 'Endpoint properties description',
        properties: {
          timerName: {
            title: 'Timer Name',
            labels: '',
            description: 'The name of the timer',
            type: 'string',
            deprecated: false,
          },
          pattern: {
            title: 'Pattern',
            labels: 'advanced',
            description:
              'Allows you to specify a custom Date pattern to use for setting the time option using URI syntax.',
            type: 'string',
            deprecated: false,
          },
        },
      },
    },
  };

  const schemaService = new SchemaService();
  const schemaBridge = schemaService.getSchemaBridge(mockSchema);

  it('should render the component', () => {
    render(
      <AutoField.componentDetectorContext.Provider value={CustomAutoFieldDetector}>
        <AutoForm schema={schemaBridge!}>
          <CustomNestField name="parameters" />
        </AutoForm>
      </AutoField.componentDetectorContext.Provider>,
    );
    const inputTimerElement = screen
      .getAllByRole('textbox')
      .filter((textbox) => textbox.getAttribute('label') === 'Timer Name');
    expect(inputTimerElement).toHaveLength(1);
    const inputPatternElement = screen
      .getAllByRole('textbox')
      .filter((textbox) => textbox.getAttribute('label') === 'Pattern');
    expect(inputPatternElement).toHaveLength(0);
    const buttonElement = screen.getByRole('button', { name: 'Advanced properties' });
    expect(buttonElement).toBeInTheDocument();
  });

  it('should display the advanced properties', async () => {
    render(
      <AutoField.componentDetectorContext.Provider value={CustomAutoFieldDetector}>
        <AutoForm schema={schemaBridge!}>
          <CustomNestField name="parameters" />
        </AutoForm>
      </AutoField.componentDetectorContext.Provider>,
    );
    const buttonElement = screen.getByRole('button', { name: 'Advanced properties' });
    await act(async () => {
      fireEvent.click(buttonElement);
    });
    const inputPatternElement = screen
      .getAllByRole('textbox')
      .filter((textbox) => textbox.getAttribute('label') === 'Pattern');
    expect(inputPatternElement).toHaveLength(1);
  });
});

describe('CustomNestField', () => {
  const mockSchema = {
    title: 'Test',
    type: 'object',
    additionalProperties: false,
    properties: {
      parameters: {
        type: 'object',
        title: 'Endpoint Properties',
        description: 'Endpoint properties description',
        properties: {
          timerName: {
            title: 'Timer Name',
            labels: '',
            description: 'The name of the timer',
            type: 'string',
            deprecated: false,
          },
        },
      },
    },
  };

  const schemaService = new SchemaService();
  const schemaBridge = schemaService.getSchemaBridge(mockSchema);

  it('should not render the advanced properties button if no advanced properties are provided', () => {
    render(
      <AutoField.componentDetectorContext.Provider value={CustomAutoFieldDetector}>
        <AutoForm schema={schemaBridge!}>
          <CustomNestField name="parameters" />
        </AutoForm>
      </AutoField.componentDetectorContext.Provider>,
    );
    const inputTimerElement = screen
      .getAllByRole('textbox')
      .filter((textbox) => textbox.getAttribute('label') === 'Timer Name');
    expect(inputTimerElement).toHaveLength(1);

    const advancedButton = screen
      .getAllByRole('button')
      .filter((button) => button.textContent === 'Advanced properties');
    expect(advancedButton).toHaveLength(0);
  });
});
