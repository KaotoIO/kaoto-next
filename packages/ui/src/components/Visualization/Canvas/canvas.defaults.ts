import { NodeShape } from '@patternfly/react-topology';
import { LayoutType } from './canvas.models';

export class CanvasDefaults {
  static readonly DEFAULT_LAYOUT = LayoutType.Dagre;
  static readonly DEFAULT_NODE_SHAPE = NodeShape.rect;
  static readonly DEFAULT_NODE_DIAMETER = 75;
  static readonly DEFAULT_GROUP_PADDING = 50;
}
