function buildUrl(url: URL, query: string | number) {
  if (url.toString().includes('?')) {
    return new URL(url.toString() + `&${query}`);
  }

  return new URL(url.toString() + `?${query}`);
}

export default buildUrl;
