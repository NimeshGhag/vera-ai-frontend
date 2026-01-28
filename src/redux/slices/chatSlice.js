import { createSlice } from "@reduxjs/toolkit";

const uid = () => Math.random().toString(36).slice(2, 11);

const initialState = {
  chats: [], // Array of chat objects: [{id, title, messages: [{id, role, content, ts}]}]
  currentChatId: null, // Currently active chat ID
  isLoading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // Create a new chat with a title
    addChat: (state, action) => {
      const newChat = {
        id: uid(),
        title: action.payload || "New Chat",
        messages: [],
        createdAt: Date.now(),
      };
      state.chats.unshift(newChat);
      state.currentChatId = newChat.id;
    },

    // Set the currently active chat
    setCurrentChat: (state, action) => {
      state.currentChatId = action.payload;
    },

    // Add a message to the current chat
    addMessage: (state, action) => {
      const chatId = state.currentChatId;
      const chat = state.chats.find((c) => c.id === chatId);
      if (chat) {
        chat.messages.push({
          id: uid(),
          role: action.payload.role,
          content: action.payload.content,
          ts: Date.now(),
          ...(action.payload.error && { error: true }),
        });

        // Update chat title if it's the first message
        if (chat.messages.length === 1 && action.payload.role === "user") {
          const title =
            action.payload.content.slice(0, 40) +
            (action.payload.content.length > 40 ? "…" : "");
          chat.title = title;
        }
      }
    },

    // Update a specific chat
    updateChat: (state, action) => {
      const { chatId, updates } = action.payload;
      const chat = state.chats.find((c) => c.id === chatId);
      if (chat) {
        Object.assign(chat, updates);
      }
    },

    // Delete a chat
    deleteChat: (state, action) => {
      const chatId = action.payload;
      state.chats = state.chats.filter((c) => c.id !== chatId);

      // If deleted chat was active, set new active chat
      if (state.currentChatId === chatId) {
        state.currentChatId = state.chats.length > 0 ? state.chats[0].id : null;
      }
    },

    // Clear all chats
    clearAllChats: (state) => {
      state.chats = [];
      state.currentChatId = null;
    },

    // Set loading state
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    // Set error
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  addChat,
  setCurrentChat,
  addMessage,
  updateChat,
  deleteChat,
  clearAllChats,
  setLoading,
  setError,
} = chatSlice.actions;

export default chatSlice.reducer;
