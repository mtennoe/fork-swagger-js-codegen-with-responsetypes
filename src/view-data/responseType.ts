import { convertType } from "../typescript";
import { HttpOperation, Swagger, SwaggerType } from "../swagger/Swagger";
import { TypeSpec } from "../typespec";

const defaultSuccessfulResponseType = "void";

// https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#2xx_Success
const successfulCodes = [
  "200", // OK
  "201", // Created
  "202", // Accepted
  "203", // Non-Authoritative Information
  "204", // No Content
  "205", // Reset Content
  "206", // Partial Content
  "207", // Multi-Status
  "208", // Already Reported
  "226" // IM Used
];

function onlySuccessful(statusCode: string) {
  return successfulCodes.includes(statusCode);
}

function getSuccessfulResponse(op: HttpOperation): SwaggerType {
  const definedSuccessCodes = Object.keys(op.responses).filter(onlySuccessful);

  if (definedSuccessCodes.length === 0) {
    throw new Error("No success responses defined");
  }

  return op.responses[definedSuccessCodes[0]];
}

function generateResponseType(
  property: TypeSpec,
  topArray: Boolean = false
): String {
  let string = "";
  if (!topArray) {
    string = `${property.name}${property.isNullable ? "?" : ""}: `;
  }
  if (property.isRef) {
    return `${string}${property.target}`;
  }
  if (property.isArray) {
    return `${string}Array<${generateResponseType(
      property.elementType!,
      true
    )}>`;
  }
  if (property.isObject) {
    return `${string}{${property.properties!.map(p =>
      generateResponseType(p)
    )}}`;
  }
  return `${string}${property.tsType}`;
}

export function getSuccessfulResponseType(
  op: HttpOperation,
  swagger: Swagger
): [string, boolean] {
  let successfulResponseTypeIsRef = false;
  let successfulResponseType;

  try {
    const successfulResponse = getSuccessfulResponse(op);
    const convertedType = convertType(successfulResponse, swagger);

    if (convertedType.target) {
      successfulResponseTypeIsRef = true;
    }

    successfulResponseType =
      convertedType.target ||
      convertedType.tsType ||
      defaultSuccessfulResponseType;
    if (convertedType.properties && convertedType.properties.length !== 0) {
      successfulResponseType = `{${convertedType.properties
        .map(p => generateResponseType(p))
        .join(", ")}}`;
    }
  } catch (error) {
    successfulResponseType = defaultSuccessfulResponseType;
  }

  return [successfulResponseType, successfulResponseTypeIsRef];
}
