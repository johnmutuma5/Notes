import url from 'url';

export const urlParser = (req) => {
  const parsedUrl = url.parse(req.url, true)
  req.query = parsedUrl.query;
  req.pathname = parsedUrl.pathname;
  return req;
}
