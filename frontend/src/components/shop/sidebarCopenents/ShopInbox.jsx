import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "../../../server";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "../../../styles/styles";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import socketIO from "socket.io-client";
import { format } from "timeago.js";


const ENDPOINT = "http://localhost:4500";
const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

const ShopInbox = () => {
  const { seller } = useSelector((state) => state.seller);
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    socket.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    if (arrivalMessage && currentChat?.members.includes(arrivalMessage.sender)) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(
          `${server}/conversation/seller-conversations/${seller._id}`
        );
        setConversations(response.data.conversations);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, [seller]);

  useEffect(() => {
    const getMessages = async () => {
      if (currentChat) {
        try {
          const response = await axios.get(
            `${server}/message/get-all-messages/${currentChat._id}`
          );
          setMessages(response.data.messages);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };

    getMessages();
  }, [currentChat]);

  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const message = {
      sender: seller._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find((member) => member !== seller._id);

    socket.emit("sendMessage", {
      senderId: seller._id,
      receiverId,
      text: newMessage,
    });

    try {
      if (newMessage !== "") {
        const response = await axios.post(`${server}/message/create-new-message`, message);
        setMessages([...messages, response.data.message]);
        updateLastMessage();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateLastMessage = async () => {
    socket.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: seller._id,
    });

    try {
      const response = await axios.put(`${server}/conversation/update-last-message/${currentChat._id}`, {
        lastMessage: newMessage,
        lastMessageId: seller._id,
      });
      console.log(response.data.conversation);
      setNewMessage("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-white m-3 w-[97.5%] shadow-sm ">
      {!open ? (
        <>
          <h3 className="text-[25px] font-[500] text-center p-3">
            All Messages
          </h3>
          {/* List of conversations */}
          {conversations &&
            conversations.map((item, index) => (
              <MessageList
                item={item}
                key={index}
                index={index}
                setOpen={setOpen}
                setCurrentChat={setCurrentChat}
                seller={seller}
                setUserData={setUserData}
                userData={userData}
              />
            ))}
        </>
      ) : (
        <SellerInbox
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          sellerId={seller._id}
        />
      )}
    </div>
  );
};

const MessageList = ({ item, index, setOpen, setCurrentChat, seller, userData, setUserData }) => {
  const [active, setActive] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (item && item.members) {
      const userId = item.members.find((user) => user !== seller._id);

      const getUser = async () => {
        try {
          const response = await axios.get(`${server}/user/user/${userId}`);
          setUserData(response.data.user);
        } catch (error) {
          console.log(error.message);
        }
      };
      getUser();
    }
  }, [seller, item]);

  const handleClick = (id) => {
    navigate(`?${id}`);
  };

  return (
    <div
      className={`w-full flex p-3 ${
        active === index ? "bg-[#00000011]" : "bg-transparent"
      } relative max-h-screen`}
      onClick={() => {
        setActive(index);
        handleClick(item._id);
        setOpen(true);
        setCurrentChat(item);
      }}
    >
      <img
        src="http://localhost:5003/122769-christmas-jumper-free-photo-1689784337381-NaN.png"
        alt="Profile"
        className="w-[60px] h-[60px] rounded-full border-2 "
        crossOrigin="anonymous"
      />
      <div className="">
        <h4 className="text-[18px] font-[400]">Fils Dios</h4>
        <h3 className="text-[#000c] text-[17px]">You: Yeah I'm good</h3>
      </div>
      <span className="bg-[green] rounded-full absolute h-[15px] w-[15px] top-4 left-3"></span>
    </div>
  );
};

const SellerInbox = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  sellerId,
}) => {
  return (
    <div className=" h-[80vh] justify-between flex flex-col">
      <div className="w-full bg-slate-200 p-1 ">
        {/* Message header */}
        <div className="w-full h-full flex justify-between items-center">
          <div className="flex ">
            <img
              src="http://localhost:5003/122769-christmas-jumper-free-photo-1689784337381-NaN.png"
              alt="Profile"
              className="w-[60px] h-[60px] rounded-full border-2 border-black"
              crossOrigin="anonymous"
            />
            <div className="ml-2 ">
              <h4 className="text-[18px] font-[500]">Fils Dios</h4>
              <h3 className="text-[#000c] text-[17px]">Active now</h3>
            </div>
          </div>
          <AiOutlineArrowRight
            size={25}
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>
      </div>

      {/* Messages */}
      {messages &&
        messages.map((message, index) => (
          <div className="h-[60vh] w-full" key={index}>
            <div className="w-full">
              <div className="px-3 py-2 bg-green-100  w-max h-min mt-5 ml-3 rounded-bl-[10px] rounded-tr-[10px] shadow-md">
                <p>{message?.text}</p>
              </div>
              <span className="ml-3">{format(message?.createdAt)}</span>
            </div>
          </div>
        ))}

      {/* Message input */}
      <form
        aria-required
        className="w-[98%] flex m-1 relative"
        onSubmit={sendMessageHandler}
      >
        <div className="w-[30px] flex items-center justify-center mr-2">
          <TfiGallery size={25} />
        </div>
        <input
          type="text"
          className={`${styles.input} border-[green] `}
          placeholder="Type message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          required="Please type some message!"
        />
        <input type="submit" value="send" className="hidden" id="send" />
        <label htmlFor="send">
          <AiOutlineSend
            size={25}
            className="absolute top-1 right-1 cursor-pointer"
          />
        </label>
      </form>
    </div>
  );
};

export default ShopInbox;
