import React, { useEffect, useRef, useState } from "react";
import "../../styles/Chats/ChatsMainContainer.css";
import CreatePostInput from "./../CreatePost/CreatePostInput";
import SearchIcon from "../../assets/home/top_navbar/ic_search_icon.svg";
import UserProfile from "../../assets/profile/user_profile_default_icon.svg";
import ChatIndividual from "./ChatIndividual";
import ChatSingleTextComponent from "./ChatSingleTextComponent";
import sendbutton from "../../assets/chats/send_btn.svg";
import Cookies from "js-cookie";
import instance from "../../helper/axios";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../helper/state_provider";
import socketIo from "socket.io-client";

function MessageMainContainer() {

  const history = useHistory();
  const scrollRef = useRef();
  const socket = useRef();
  const [{ userDetails }, dispatch] = useStateValue();
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [userSearch, setUserSearch] = useState({
    chatSearch: "",
    chatMessage: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserSearch({
      ...userSearch,
      [name]: value,
    });
  };

  useEffect(() => {
    socket.current = socketIo("https://immense-oasis-49966.herokuapp.com", { transports: ['websocket'] });

    socket.current.on("getMessage", data => {
      setArrivalMessage({
        userId: data.senderId,
        message: data.text,
        createdAt: Date.now()
      })
    })
  }, []);

  useEffect(() => {
    arrivalMessage && currentChat?.userIds.includes(arrivalMessage.userId) &&
      setMessages([...messages, arrivalMessage]);
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    socket.current.emit("addUser", userDetails._id);
    socket.current.on("getUsers", users => {
      console.log(users);
    })
  }, [userDetails]);

  const fetchConversations = async (e) => {
    try {
      const token = Cookies.get("token");

      if (token) {
        const getConversationsRes = await instance.post(
          `/conversation/getconversations`,
          {
            conversationIds: userDetails.conversations,
          },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        const data = await getConversationsRes.data.conversations;
        setConversations(data);

      } else {
        history.replace("/signin");
      }
    } catch (error) {
      if (error.response.status === 500) {
        return alert(`Server error occured!`);
      }
      return alert(`Your session has expired, please login again!`);
    }
  };

  const fetchMessages = async (e) => {
    try {
      const token = Cookies.get("token");

      if (!currentChat) {
        return;
      }

      if (token) {
        const getMessagesRes = await instance.get(
          `/message/getmessages/${currentChat._id}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        const data = await getMessagesRes.data.messages;
        setMessages(data);

      } else {
        history.replace("/signin");
      }
    } catch (error) {
      if (error.response.status === 500) {
        return alert(`Server error occured!`);
      }
      return alert(`Your session has expired, please login again!`);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, [userDetails]);

  useEffect(() => {
    fetchMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newMessage || !currentChat || !newMessage.replace(/\s/g, '').length) {
      return;
    }

    const receiverId = currentChat.userIds.find((id) => id !== userDetails._id);

    socket.current.emit("sendMessage", {
      senderId: userDetails._id,
      receiverId,
      text: newMessage
    })

    try {
      const token = Cookies.get("token");

      if (token) {
        const addMessagesRes = await instance.post(
          `/message/addmessage/${currentChat._id}`,
          {
            message: newMessage,
            reference: ""
          },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        const msg = await addMessagesRes.data.message;
        setMessages([...messages, msg]);
        setNewMessage("");

      } else {
        history.replace("/signin");
      }
    } catch (error) {
      if (error.response.status === 500) {
        return alert(`Server error occured!`);
      }
      if (error.response.status === 400) {
        return alert(`You can't send empty message!`);
      }
      return alert(`Your session has expired, please login again!`);
    }
    console.log(newMessage);
  };

  const ConversationsList = conversations.map((item, index) => {
    return <div onClick={() => setCurrentChat(item)}>
      <ChatIndividual conversation={item} />;
    </div>
  });

  return (
    <div className="mx-auto font-manrope grid border MessageMainContainer">
      <div
        className="scrollbarHidden relative"
        style={{
          borderRight: "1px solid #555555",
        }}
      >
        <div
          className=" sticky rounded-l-md top-0"
          style={{ backgroundColor: "#F5F5F5", padding: "0.68vw 0" }}
        >
          <CreatePostInput
            inputType="text"
            inputName="chatSearch"
            inputValue={userSearch.chatSearch}
            onChangeFunction={handleInput}
            labelContent="Search People"
            isInput
            style={{
              width: "calc(100% - 1vw)",
              margin: "0 auto",
            }}
          />
          <img
            src={SearchIcon}
            alt="search"
            className="absolute w-4 object-contain"
            style={{
              top: "40%",
              right: "5%",
            }}
          />
        </div>
        {ConversationsList}
      </div>
      <div className="overflow-auto scrollbarHidden">
        {
          currentChat ?
            <>
              <div
                className=" sticky top-0 flex items-center"
                style={{
                  backgroundColor: "#F5F5F5",
                  padding: "0.68vw 1vw",
                  height: "66.89px",
                }}
              >
                <img src={UserProfile} alt="profile" className="ImgChatSection" />
                <h2 className="font-manrope font-semibold text-xl">2020-IMT</h2>
              </div>
              <div className="w-full p-4">
                {messages.map((message) => (
                  <div ref={scrollRef}>
                    <ChatSingleTextComponent message={message} own={message.userId === userDetails._id} />
                  </div>
                ))}
              </div>
              <form action="" className="sticky bottom-0" onSubmit={handleSubmit}>
                <div className=" BottomChatSection">
                  <input
                    type="text"
                    name="chatMessage"
                    id="chatMessage"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    autoComplete="off"
                  />
                  <button type="submit">
                    <img src={sendbutton} alt="submit" />
                  </button>
                </div>
              </form>
            </> :
            <span>Select a chat to start messaging</span>
        }
      </div>
    </div>
  );
}

export default MessageMainContainer;