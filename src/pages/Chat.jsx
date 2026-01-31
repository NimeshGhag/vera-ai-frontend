import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatMobileBar from "../components/chat/ChatMobileBar.jsx";
import ChatSidebar from "../components/chat/ChatSidebar.jsx";
import ChatMessages from "../components/chat/ChatMessages.jsx";
import ChatComposer from "../components/chat/ChatComposer.jsx";
import NewChatModal from "../components/ui/NewChatModal.jsx";
import "../components/chat/ChatLayout.css";
import { fakeAIReply } from "../components/chat/aiClient.js";
import {
  addChat,
  addMessage,
  setCurrentChat,
  setLoading,
  setChats,
} from "../redux/slices/chatSlice";
import {
  selectChats,
  selectCurrentChatId,
  selectCurrentChat,
  selectCurrentChatMessages,
} from "../redux/selectors/chatSelectors";
import axios from "../api/axios";
import { io } from "socket.io-client";

const Chat = () => {
  const dispatch = useDispatch();

  // Redux state
  const chats = useSelector(selectChats);
  const activeChatId = useSelector(selectCurrentChatId);
  const activeChat = useSelector(selectCurrentChat);
  const messages = useSelector(selectCurrentChatMessages);

  // Local state
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  // const [message, setMessage] = useState([
  //   {
  //     role: "user",
  //     content: "Hello, I need help with my account.",
  //   },
  //   {
  //     role: "ai",
  //     content: "  Sure, I can help you with that. What seems to be the issue?",
  //   },
  // ]);

  // socket state
  const [Socket, setSocket] = useState(null);
  const socketRef = useRef(null);

  // Initialize with first chat if none exists
  useEffect(() => {
    const response = axios
      .get("/chat/", { withCredentials: true })
      .then((response) => {
        dispatch(setChats(response.data));
        // Set the first chat as active
        if (response.data.length > 0) {
          const firstChatId = response.data[0].id || response.data[0]._id;
          dispatch(setCurrentChat(firstChatId));
        }
      });

    const newSocket = io("http://localhost:3000", {
      withCredentials: true,
    });

    socketRef.current = newSocket;

    newSocket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    //  Handle incoming AI responses
    newSocket.on("ai-response", (message) => {
      try {
        dispatch(addMessage({ role: "ai", content: message.content }));
      } catch (error) {
        dispatch(
          addMessage({
            role: "ai",
            content: "Error fetching AI response.",
            error: true,
          }),
        );
      } finally {
        setIsSending(false);
      }
    });

    newSocket.on("disconnect", () => {
      console.log("Socket Server disconnected");
    });

    setSocket(newSocket);

    // Cleanup function to disconnect socket on component unmount
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [dispatch]);

  const startNewChat = useCallback(() => {
    setShowNewChatModal(true);
  }, []);

  const handleCreateChat = useCallback(
    async (chatTitle) => {
      const response = await axios.post(
        "/chat/",
        { title: chatTitle },
        { withCredentials: true },
      );
      dispatch(addChat(chatTitle));
      setSidebarOpen(false);
    },
    [dispatch],
  );

  const sendMessage = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || !activeChatId || isSending) return;

    setIsSending(true);

    // Add user message to Redux
    dispatch(addMessage({ role: "user", content: trimmed }));
    setInput("");

    // send user message via socket
    Socket.emit("ai-message", {
      chat: activeChatId,
      content: trimmed,
    });
  }, [input, activeChatId, isSending, dispatch, Socket]);

  const getmessages = useCallback(
    async (chatId) => {
      if (!chatId) {
        console.warn("No chatId provided to getmessages");
        return;
      }
      const response = await axios.get(`/chat/messages/${chatId}`, {
        withCredentials: true,
      });


      // Dispatch each message individually
      response.data.messages.map((msg) =>
        dispatch(
          addMessage({
            role: msg.role === "user" ? "user" : "ai",
            content: msg.content,
          }),
        ),
      );
    },
    [dispatch],
  );

  return (
    <div className="chat-layout minimal">
      <ChatMobileBar
        onToggleSidebar={() => setSidebarOpen((o) => !o)}
        onNewChat={startNewChat}
      />
      <ChatSidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={(id) => {
          dispatch(setCurrentChat(id));
          getmessages(id);
          setSidebarOpen(false);
        }}
        // getmessages={getmessages}
        onNewChat={startNewChat}
        open={sidebarOpen}
        socket={Socket}
      />
      <main className="chat-main" role="main">
        {messages.length === 0 && (
          <div className="chat-welcome" aria-hidden="true">
            <div className="chip">Early Preview</div>
            <h1>Vera-Ai</h1>
            <p>
              Ask anything. Paste text, brainstorm ideas, or get quick
              explanations. Your chats stay in the sidebar so you can pick up
              where you left off.
            </p>
          </div>
        )}
        <ChatMessages messages={messages} isSending={isSending} />
        <ChatComposer
          input={input}
          setInput={setInput}
          onSend={sendMessage}
          isSending={isSending}
        />
      </main>
      {sidebarOpen && (
        <button
          className="sidebar-backdrop"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <NewChatModal
        isOpen={showNewChatModal}
        onClose={() => setShowNewChatModal(false)}
        onCreateChat={handleCreateChat}
      />
    </div>
  );
};

export default Chat;
