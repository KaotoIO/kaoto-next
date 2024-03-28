/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { Button, Card, CardBody, CardExpandableContent, CardHeader, CardTitle } from '@patternfly/react-core';
import { useMemo, useState } from 'react';
import { HTMLFieldProps, connectField, filterDOMProps } from 'uniforms';
import { isDefined } from '../../../utils';
import { CustomAutoField } from '../CustomAutoField';
import './CustomNestField.scss';

export type CustomNestFieldProps = HTMLFieldProps<
  object,
  HTMLDivElement,
  { properties?: Record<string, unknown>; helperText?: string; itemProps?: object }
>;

export const CustomNestField = connectField(
  ({
    children,
    error,
    errorMessage,
    fields,
    itemProps,
    label,
    name,
    showInlineError,
    disabled,
    ...props
  }: CustomNestFieldProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const advancedFields = useMemo(() => {
      const advanced: string[] = [];
      if (isDefined(props.properties)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Object.entries(props.properties as Record<string, any>).forEach(([key, value]) => {
          if (isDefined(value.labels) && value.labels.includes('advanced')) {
            advanced.push(key);
          }
        });
      }
      return advanced;
    }, [props.properties]);

    const nodes =
      children ||
      fields
        ?.filter((field) => !advancedFields.includes(field))
        .map((field) => <CustomAutoField key={field} name={field} />);
    const advancedNodes = advancedFields?.map((field) => <CustomAutoField key={field} name={field} />);

    return (
      <Card data-testid={'nest-field'} {...filterDOMProps(props)} isExpanded={isExpanded}>
        <CardHeader>
          <CardTitle>{label}</CardTitle>
        </CardHeader>
        <CardBody className="custom-nestfield-spacing">{nodes}</CardBody>
        {advancedNodes.length > 0 && (
          <>
            <CardHeader onExpand={() => setIsExpanded(!isExpanded)}>
              <CardTitle>
                <Button variant="link" isInline onClick={() => setIsExpanded(!isExpanded)}>
                  Advanced properties
                </Button>
              </CardTitle>
            </CardHeader>
            <CardExpandableContent>
              <CardBody className="custom-nestfield-spacing">{advancedNodes}</CardBody>
            </CardExpandableContent>
          </>
        )}
      </Card>
    );
  },
);
