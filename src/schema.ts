import { isArray, isObject, isFunction, isArrayOfObject } from './type-check';
import SchemaTools from './schema-tool';
import getSchemaValue from './schema-tool/get-schema-value';
import { cloneDeep } from './utils';

type SchemaFunction = (
  data: Object[],
  schema: Object | Function,
  options?: {
    override?: boolean;
  }
) => Object[];

const schema: SchemaFunction = (data, schema, options = {}) => {
  if (!isArray(data)) {
    return [];
  }

  if (!isObject(schema) && !isFunction(schema)) {
    return data;
  }

  let schemaObj = schema;

  if (isFunction(schemaObj)) {
    schemaObj = (<Function>schemaObj)(SchemaTools);
  }

  const result: Object[] = [];

  data.forEach(item => {
    const temp = cloneDeep(schemaObj);
    result.push(getSchemaValue(temp, item, options));
  });

  return result;
};

export default schema;
