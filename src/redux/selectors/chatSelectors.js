// Selectors for accessing chat state

export const selectChats = (state) => state.chat.chats;

export const selectCurrentChatId = (state) => state.chat.currentChatId;

export const selectCurrentChat = (state) => {
  const chatId = state.chat.currentChatId;
  const chats = Array.isArray(state.chat.chats) ? state.chat.chats : [];
  return chats.find((c) => c.id === chatId) || null;
};

export const selectCurrentChatMessages = (state) => {
  const currentChat = selectCurrentChat(state);
  return currentChat && Array.isArray(currentChat.messages)
    ? currentChat.messages
    : [];
};

export const selectIsLoading = (state) => state.chat.isLoading;

export const selectError = (state) => state.chat.error;

export const selectChatById = (chatId) => (state) => {
  const chats = Array.isArray(state.chat.chats) ? state.chat.chats : [];
  return chats.find((c) => c.id === chatId);
};
