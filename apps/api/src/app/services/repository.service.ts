import { Connection, r, WriteResult } from 'rethinkdb-ts';
import { JsonConvert } from 'json2typescript';

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
      .insert(this.jsonConvert.serializeObject(model), { conflict: 'update' })
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

  deleteById(id: string): Promise<void> {
    return r
      .table(this.table)
      .filter(r.row('id').eq(id))
      .delete()
      .run(this.connection)
      .then(() => void 0);
  }
}
