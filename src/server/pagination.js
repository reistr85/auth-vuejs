export const pagination = (domain, data, page, perPage) => {
  let from = page;
  let to = perPage;
  let offset = 0;

  if (page > 1) {
    from = (((page - 1) * perPage) + 1);
    to = page * perPage;
    offset = from - 1;
  }

  let filtered = data.models.slice(offset, to);

  return {
    [domain]: filtered,
    total: data.models.length,
    page,
    perPage,
    lastPage: Math.ceil(data.models.length / perPage),
    from,
    to
  };
};