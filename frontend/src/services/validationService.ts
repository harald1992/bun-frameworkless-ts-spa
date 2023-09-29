import { Facets } from "../interfaces/form-spec.interface";

export function validateField(fieldValue: any, facets: Facets) {
  let errors: string[] = [];

  Object.entries(facets).forEach((item: [string, any]) => {
    let facetName = item[0];
    let facetValue = item[1];
    // if (fieldValue as string).length > ()
    let error = validateFacet(fieldValue, facetName, facetValue);
    if (error) {
      errors.push(error);
    }
  });

  return errors;
}

function validateFacet(fieldValue: any, facetName: string, facetValue: any) {
  switch (facetName) {
    case "maxLength":
      if ((fieldValue as string).length > (facetValue as number)) {
        return "maxLength";
      }
      break;
    default:
      return;
      break;
  }
}
