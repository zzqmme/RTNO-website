import React, { useState, useEffect } from "react";
import axios from "axios";

const ChatMessages = ({
  user_id,
  onMarkAsRead,
  company_name,
  keys,
  setKeys,
  selectedKey,
  setSelectedKey,
  host,
}) => {
  const [messages, setMessages] = useState([]);
  const [globalMessages, setGlobalMessages] = useState([]);
  const [displayDate, setDisplayDate] = useState(null);
  const [read, setRead] = useState(true);

  useEffect(() => {
    if (user_id) {
      fetchMessages(user_id);
    }
    setRead(true);
    setSelectedKey(null);
  }, [user_id]);
  useEffect(() => {
    if (selectedKey !== null) {
      const filteredMessages = [];
      for (let i = 0; i < globalMessages.length; i++) {
        if (globalMessages[i].key_entity === selectedKey) {
          filteredMessages.push(globalMessages[i]);
          if (i + 1 < globalMessages.length) {
            filteredMessages.push(globalMessages[i + 1]);
          }
        }
      }
      setMessages(filteredMessages);
    } else {
      setMessages(globalMessages);
    }
  }, [selectedKey, globalMessages]);

  const fetchMessages = async (user_id) => {
    try {
      const config = {
        headers: {
          "RTNO-API-KEY": `${company_name}_dashboard`,
        },
      };
      const response = await axios.get(
        `${host}dashboard/chat/?user_id=${user_id}&company_name=${company_name}`,
        config
      );

      setMessages(response.data.slice(0, -1)); //response.data[0] когда пулл сделаем
      setGlobalMessages(response.data.slice(0, -1));
      setRead(response.data[response.data.length - 1]);
      setKeys(response.data.slice(0, -1).map((obj) => obj.key_entity));
      if (response.data.length > 0) {
        setDisplayDate(response.data[0].timestamp);
      }
    } catch (error) {
      console.error("Error fetching new chat data:", error);
    }
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("ru-RU", options);
  };

  const handleMarkAsRead = async () => {
    console.log("this means the hanldeMarkAsRead function has started");
    onMarkAsRead(user_id);
    setRead(true);
  };

  return (
    <div className="flex flex-col items-center w-full p-5 bg-white rounded-3xl">
      <div className="w-full h-full overflow-y-auto max-h-[calc(100vh-10rem)] flex flex-col items-center">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-3/4 mb-5 px-3 py-2 rounded-lg text-lg ${
              message.type === "человек"
                ? "self-end text-right bg-blue-100 mr-8"
                : "self-start bg-gray-500 text-white w-3/4"
            }`}
          >
            <div className="flex items-center justify-between">
              {message.key_entity && (
                <span className="mr-2 text-xs font-semibold bg-gray-100 px-2 py-1 rounded">
                  {message.key_entity}
                </span>
              )}
              <div className="break-words">{message.data}</div>
            </div>
            <div
              className={`text-xs ${
                message.type === "человек" ? "text-right" : ""
              }`}
            >
              {message.timestamp.substring(11, message.timestamp.length - 13)}
            </div>
          </div>
        ))}
        <button
          className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 ${
            read ? "bg-gray-500 cursor-not-allowed opacity-50" : ""
          }`}
          disabled={read}
          onClick={handleMarkAsRead}
        >
          {read ? "прочитано" : "Отметить прочитанным"}
        </button>
      </div>
    </div>
  );
};

export default ChatMessages;
