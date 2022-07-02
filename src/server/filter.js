export const filter = (url, data) => {
  console.log(url);
  return data.models.filter((item) => {
    if (!item.deleted_at) {
      return item;
    }
  });
};