// Selectors for accessing chat state

export const selectChats = (state) => state.chat.chats;

export const selectCurrentChatId = (state) => state.chat.currentChatId;

export const selectCurrentChat = (state) => {
  const chatId = state.chat.currentChatId;
  return state.chat.chats.find((c) => c.id === chatId) || null;
};

export const selectCurrentChatMessages = (state) => {
  const currentChat = selectCurrentChat(state);
  return currentChat ? currentChat.messages : [];
};

export const selectIsLoading = (state) => state.chat.isLoading;

export const selectError = (state) => state.chat.error;

export const selectChatById = (chatId) => (state) => {
  return state.chat.chats.find((c) => c.id === chatId);
};
