const recursiveFormData = (
  data: any,
  formData: FormData,
  parentKey = ''
): any => {
  if (
    data &&
    typeof data === 'object' &&
    !(data instanceof Date) &&
    !(data instanceof File) &&
    !(data instanceof Blob)
  ) {
    Object.keys(data).forEach((key) => {
      recursiveFormData(
        data[key],
        formData,
        parentKey ? `${parentKey}[${key}]` : key
      );
    });
  } else {
    const value = data == null ? '' : data;

    formData.append(parentKey, value);
  }
};

/**
 * use this function to convert an object into form data
 * ex:
 * const data = {...}
 * const formData = objToFormData(data)
 * await fetch(API_ENDPOINT, {
 *   body: formData,
 *   method: "POST"
 * })
 */

export const objToFormData = (obj: any) => {
  const formData = new FormData();
  recursiveFormData(obj, formData);
  return formData;
};
