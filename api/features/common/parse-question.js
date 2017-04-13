export default (fetchedQuestion) => {
  const {
    content,
    id,
    title,
    image,
    title_cat: category,
    id_cat: categoryId,
    user_id: userId,
    added_at: addedAt,
  } = fetchedQuestion;
  const addedAtDate = new Date(addedAt);
  return {
    content,
    id,
    title,
    userId,
    image,
    categoryId,
    category,
    addedAt: {
      day: addedAtDate.toLocaleDateString(),
      time: addedAtDate.toLocaleTimeString(),
    },
  };
};
