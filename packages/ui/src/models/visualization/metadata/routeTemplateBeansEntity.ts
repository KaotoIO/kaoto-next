import { RouteTemplateBeanDefinition } from '@kaoto-next/camel-catalog/types';
import { v4 as uuidv4 } from 'uuid';
import { EntityType, BaseCamelEntity } from '../../camel/entities';

export type RouteTemplateBeansParentType = {
  beans: Partial<RouteTemplateBeanDefinition>[];
};

export class RouteTemplateBeansEntity implements BaseCamelEntity {
  readonly id = uuidv4();
  type = EntityType.Beans;

  constructor(public parent: RouteTemplateBeansParentType) {}

  toJSON() {
    return { beans: this.parent.beans };
  }

  updateModel(): void {
    return;
  }
}
