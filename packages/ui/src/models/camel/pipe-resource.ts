import { BaseCamelEntity } from './entities';
import { PipeVisualEntity } from '../visualization/flows';
import { Pipe as PipeType } from '@kaoto-next/camel-catalog/types';
import { SourceSchemaType } from './source-schema-type';
import { PipeErrorHandlerEntity } from '../visualization/metadata/pipeErrorHandlerEntity';
import { CamelKResource } from './camel-k-resource';

export class PipeResource extends CamelKResource {
  private flow?: PipeVisualEntity;
  private errorHandler?: PipeErrorHandlerEntity;

  constructor(protected pipe?: PipeType) {
    super(pipe);
    if (!pipe) {
      this.pipe = this.resource as PipeType;
      this.pipe.kind = SourceSchemaType.Pipe;
    }
    if (!this.pipe!.spec) {
      this.pipe!.spec = {};
    }
    this.flow = new PipeVisualEntity(this.pipe!.spec);
    this.errorHandler = this.pipe!.spec!.errorHandler && new PipeErrorHandlerEntity(this.pipe!.spec!);
  }

  getEntities(): BaseCamelEntity[] {
    const answer = super.getEntities();
    if (this.pipe!.spec!.errorHandler && this.errorHandler) {
      answer.push(this.errorHandler);
    }
    return answer;
  }

  getType(): SourceSchemaType {
    return SourceSchemaType.Pipe;
  }

  getVisualEntities(): PipeVisualEntity[] {
    return this.flow ? [this.flow] : [];
  }

  supportsMultipleVisualEntities(): boolean {
    return false;
  }

  toJSON(): PipeType {
    return this.pipe!;
  }

  createErrorHandlerEntity() {
    this.pipe!.spec!.errorHandler = {};
    this.errorHandler = new PipeErrorHandlerEntity(this.pipe!.spec!);
    return this.errorHandler;
  }

  getErrorHandlerEntity() {
    return this.errorHandler;
  }

  deleteErrorHandlerEntity() {
    this.pipe!.spec!.errorHandler = undefined;
    this.errorHandler = undefined;
  }
}
