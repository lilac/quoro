export default (fetchedQuestion) => {
  const {
    content,
    id,
    title,
    image,
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
    addedAt: {
      day: addedAtDate.toLocaleDateString(),
      time: addedAtDate.toLocaleTimeString(),
    },
  };
};
