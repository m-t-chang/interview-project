import React from "react";
import "./App.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface Conversation {
  id: number;
  name: string;
}

function App() {
  const queryClient = useQueryClient();

  const { isFetching: conversationsIsFetching, data: conversations } = useQuery<
    Conversation[]
  >({
    queryKey: ["conversations"],
    queryFn: () =>
      axios
        .get<Conversation[]>("http://localhost:8000/conversations")
        .then((res) => res.data),
  });

  const createConversationMutation = useMutation({
    mutationFn: (name: string) =>
      axios.post<Conversation>("http://localhost:8000/conversation", { name }),
    onSuccess: (response) => {
      setSelectedConversationId(response.data.id);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });

  const deleteConversationMutation = useMutation({
    mutationFn: (id: number) =>
      axios.delete(`http://localhost:8000/conversation/${id}`),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      setSelectedConversationId(-1);
    },
  });

  const [selectedConversationId, setSelectedConversationId] =
    React.useState(-1);

  const [newConversationName, setNewConversationName] = React.useState("");

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewConversationName(event.target.value);
  };

  const handleSelectConversation = (conversationId: number) => {
    setSelectedConversationId(conversationId);
  };

  const handleCreateConversation = () => {
    createConversationMutation.mutate(newConversationName);
  };

  const handleDeleteConversation = (id: number) => {
    deleteConversationMutation.mutate(id);
  };

  return (
    <div className="app">
      <div className="conversations">
        <h3>Conversations</h3>
        <div className="create-conversation-form">
          <input
            type="text"
            value={newConversationName}
            placeholder="name"
            onChange={handleChangeName}
          />
          <button type="button" onClick={handleCreateConversation}>
            Create
          </button>
        </div>
        {conversations?.map((conversation) => {
          return (
            <div
              className={
                selectedConversationId === conversation.id
                  ? "conversation selected"
                  : "conversation"
              }
              onClick={() => {
                handleSelectConversation(conversation.id);
              }}
            >
              <span>{conversation.name}</span>
              <button
                type="button"
                onClick={() => {
                  handleDeleteConversation(conversation.id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
      <Messages selectedConversationId={selectedConversationId} />
    </div>
  );
}

interface Message {
  id: number;
  query: string;
  response: string;
}

const Messages: React.FC<{ selectedConversationId: number }> = ({
  selectedConversationId,
}) => {
  const queryClient = useQueryClient();

  const { isFetching: messagesIsFetching, data: messages } = useQuery<
    Message[]
  >({
    queryKey: ["messages", selectedConversationId],
    enabled: selectedConversationId !== -1,
    queryFn: () =>
      axios
        .get<Message[]>(
          `http://localhost:8000/conversation/${selectedConversationId}/messages`
        )
        .then((res) => res.data),
  });

  const [query, setQuery] = React.useState("");

  const createMessageMutation = useMutation({
    mutationFn: (userQuery: string) =>
      axios.post<Message>(
        `http://localhost:8000/conversation/${selectedConversationId}/message`,
        {
          query: userQuery,
        }
      ),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["messages", selectedConversationId],
      });
    },
  });

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleClickCreate = () => {
    createMessageMutation.mutate(query);
    setQuery("");
  };

  if (selectedConversationId === -1) {
    return (
      <div className="messages">
        <h3>Messages</h3>
        <p>Please select a conversation</p>
      </div>
    );
  }

  return (
    <div className="messages">
      <h3>Messages</h3>
      <div className="message-list">
        {messages?.map((message) => (
          <div className="message-list-item">
            <div className="user">{message.query}</div>
            <div className="assistant">{message.response}</div>
          </div>
        ))}
        {createMessageMutation.isLoading && <div>Working...</div>}
      </div>
      <div className="message-form">
        <input
          type="text"
          value={query}
          placeholder="query"
          onChange={handleChangeQuery}
        />
        <button type="button" onClick={handleClickCreate}>
          Create
        </button>
      </div>
    </div>
  );
};

export default App;
