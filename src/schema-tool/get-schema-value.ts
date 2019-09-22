import { isString, isObject, isSchemeToolsObject } from '../type-check';
import getObjDeepProp from '../utils/get-obj-deep-prop';
import schemaToolGenerator from './schema-tool-generator';

type SchemaFunction = (
  schema: Object,
  item: Object,
  options?: {
    override?: boolean;
  }
) => Object;

const getSchemaValue: SchemaFunction = (schema, item, options) => {
  const usedFieldList = [];
  Object.keys(schema).forEach(fieldName => {
    const activeField = schema[fieldName];
    usedFieldList.push(activeField);

    if (isString(activeField)) {
      schema[fieldName] = getObjDeepProp(activeField)(item);
    } else if (isSchemeToolsObject(activeField)) {
      schema[fieldName] = schemaToolGenerator(activeField, item);
    } else if (isObject(activeField)) {
      getSchemaValue(activeField, item);
    }
  });

  if (options && options.override) {
    const newItem = { ...item, ...schema };
    usedFieldList.forEach(key => delete newItem[key]);
    return newItem;
  }

  return schema;
};

export default getSchemaValue;
