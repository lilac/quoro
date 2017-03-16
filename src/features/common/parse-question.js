export default (fetchedQuestion) => {
  const { content, user_id: userId, added_at: addedAt, id, title } = fetchedQuestion;
  const addedAtDate = new Date(addedAt);
  const question = {
    content,
    id,
    title,
    userId,
    addedAt: {
      day: addedAtDate.toLocaleDateString(),
      time: addedAtDate.toLocaleTimeString(),
    },
  };
  return question;
};
