function buildUrl(url: URL, newQuery: Record<string, string>): string {
  const [baseUrl, existingQuery] = url.toString().split('?');
  const existingParams = existingQuery ? existingQuery.split('&') : [];

  const paramsObj: Record<string, string> = {};
  existingParams.forEach((param) => {
    const [key, val] = param.split('=');
    paramsObj[key] = val;
  });

  Object.keys(newQuery).forEach((key) => {
    paramsObj[key] = newQuery[key];
  });

  const newParams = Object.keys(paramsObj)
    .map((key) => `${key}=${paramsObj[key]}`)
    .join('&');

  return `${baseUrl}?${newParams}`;
}

export default buildUrl;
