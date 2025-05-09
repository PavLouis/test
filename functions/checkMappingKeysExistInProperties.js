// functions/checkMappingKeysExistInProperties.js
import { createRulesetFunction } from "@stoplight/spectral-core";

export default createRulesetFunction(
  {
    input: {
      type: "object",
      properties: {
        properties: {
          type: "object",
        },
        "x-tango-mapping": {
          type: "object",
        },
      },
      required: ["properties", "x-tango-mapping"],
    },
    options: null, // No options for this function
  },
  function checkMappingKeysExistInProperties(schema) {
    const errors = [];

    if (schema && schema['x-tango-mapping'] && schema.properties) {
      const mappingKeys = Object.keys(schema['x-tango-mapping']);
      const schemaProperties = Object.keys(schema.properties);

      for (const mappingKey of mappingKeys) {
        if (!schemaProperties.includes(mappingKey)) {
          errors.push({
            message: `Mapping key '${mappingKey}' in 'x-tango-mapping' does not refer to an existing property in this schema. Available properties are: ${schemaProperties.join(', ')}`,
            path: ['x-tango-mapping', mappingKey],
          });
        }
      }
    }

    return errors;
  },
);
