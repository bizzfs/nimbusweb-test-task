export function Model(props: { table: string }): ClassDecorator {
  if (!props.table) throw new Error('empty table name provided');

  return (constructorFunc) => {
    constructorFunc.prototype.table = props.table;
  };
}
