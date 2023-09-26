import { FormSpecData } from "../interfaces/form-spec.interface";

export const $apiService = {
  async getFormSpec(
    formSpecName: string
  ): Promise<FormSpecData | { error: string }> {
    let response = undefined;
    try {
      const res = await fetch("./api/" + formSpecName);
      response = await res.json();
      if (!(response as FormSpecData).formSpec) {
        response = { formSpec: response } as FormSpecData;
      }
      return response as FormSpecData;
    } catch {
      // for example cors
      response = { error: "Error in fetch request" };
    }

    return response;
  },
};
