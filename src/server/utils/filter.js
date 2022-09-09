export const filter = (url, data) => {
  let filtered = data.models.filter((item) => {
    if (!item.deleted_at) {
      return item;
    }
  });

  Object.keys(url).map((key) => {
    if (key != 'page' && key != 'perPage') {
      filtered = filtered.filter((item) => {
        if (item[key] === url[key]) {
          return item;
        }
      });
    }
  });

  return filtered;
};