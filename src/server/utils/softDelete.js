export const softDelete = (data) => {
  return data.models.filter((item) => {
    if (!item.deleted_at) {
      return item;
    }
  });
};