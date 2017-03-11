export default (fetchedQuestion) => {
  const { content, user_id: userId, added_at: addedAt, id } = fetchedQuestion;
  const addedAtDate = new Date(addedAt);
  const question = {
    content,
    id,
    userId,
    addedAt: {
      day: addedAtDate.toLocaleDateString(),
      time: addedAtDate.toLocaleTimeString(),
    },
  };
  return question;
};
