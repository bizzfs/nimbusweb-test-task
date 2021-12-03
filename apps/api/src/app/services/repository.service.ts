import { Connection, r, RDatum, WriteResult } from 'rethinkdb-ts';
import { JsonConvert } from 'json2typescript';

import { cleanNullProps } from '../utils/clean-non-null-fields';

export class RepositoryService<T extends { id: string | null }> {
  protected readonly table: string;

  constructor(
    protected readonly jsonConvert: JsonConvert,
    protected readonly connection: Connection,
    protected readonly modelClass: { new (): T }
  ) {
    if (!modelClass.prototype.table) throw new Error('provided invalid model class');
    this.table = modelClass.prototype.table;
  }

  create(model: T): Promise<T> {
    return r
      .table(this.table)
      .insert(this.jsonConvert.serializeObject(model))
      .run(this.connection)
      .then((res) => {
        model.id = this.parseGeneratedId(res);
        return model;
      });
  }

  protected parseGeneratedId(res: WriteResult<T>): string {
    if (!res.generated_keys || res.generated_keys.length !== 1) throw new Error('id was not generated');
    return res.generated_keys[0];
  }

  update(model: T): Promise<T> {
    if (!model.id) throw new Error('no id was provided');
    return r
      .table(this.table)
      .insert(this.jsonConvert.serializeObject(model))
      .run(this.connection)
      .then(() => model);
  }

  getById(id: string): Promise<T> {
    return r
      .table(this.table)
      .filter(r.row('id').eq(id))
      .run(this.connection)
      .then((res) => this.jsonConvert.deserializeObject(this.parseRes(res), this.modelClass));
  }

  protected parseRes(res: Record<string, unknown>[]): Record<string, unknown> {
    if (res.length !== 1) throw new Error('invalid number of results');
    return res[0];
  }

  getByIds(ids: string[]): Promise<T[]> {
    return r
      .table(this.table)
      .filter((doc: RDatum) => r.expr(ids).contains(doc('id')))
      .run(this.connection)
      .then((res) => this.jsonConvert.deserializeArray(this.parseObjs(res, ids.length), this.modelClass));
  }

  protected parseObjs(res: Record<string, unknown>[], count: number): Record<string, unknown>[] {
    if (res.length !== count) throw new Error('invalid number of results');
    return res;
  }

  getAll(): Promise<T[]> {
    return r
      .table(this.table)
      .run(this.connection)
      .then((res) => this.jsonConvert.deserializeArray(res, this.modelClass));
  }

  delete(model: T): Promise<void> {
    return r
      .table(this.table)
      .filter(cleanNullProps(this.jsonConvert.serializeObject(model)))
      .delete()
      .run(this.connection)
      .then(() => void 0);
  }

  deleteById(id: string): Promise<void> {
    return r
      .table(this.table)
      .filter(r.row('id').eq(id))
      .delete()
      .run(this.connection)
      .then(() => void 0);
  }

  find(model: T): Promise<T> {
    return r
      .table(this.table)
      .filter(cleanNullProps(this.jsonConvert.serializeObject(model)))
      .run(this.connection)
      .then((res) => {
        if (res.length === 0) throw new Error('not found');
        return this.jsonConvert.deserializeObject(res[0], this.modelClass);
      });
  }
}
