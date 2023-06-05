import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatList = ({ onSelectChat, update, company_name, host }) => {
  const [chatData, setChatData] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const storedChatData = JSON.parse(localStorage.getItem('chatData'));
    const storedTimestamp = localStorage.getItem('timestamp');

    if (storedChatData && storedTimestamp) {
      fetchNewChatData(storedTimestamp, storedChatData);
    } else {
      fetchAllChatData();
    }
  }, [update]);

  const mergeChats = (oldChats, newChats) => {
    const chatMap = new Map();
  
    oldChats.forEach(chat => {
      chatMap.set(chat.user_id, chat);
    });
  
    newChats.forEach(chat => {
      chatMap.set(chat.user_id, chat);
    });
  
    return Array.from(chatMap.values());
  };
  

  const fetchNewChatData = async (storedTimestamp, storedChatData) => {
    try {
      const config = {
        headers: {
          'RTNO-API-KEY': `${company_name}_dashboard`
        }
      };
      const response = await axios.get(`${host}dashboard/users?company_name=${company_name}&timestamp=${storedTimestamp}`, config);
  
      const newChatData = response.data[0].map(user => ({
        user_id: user.user_id,
        last_message: user.last_message,
        read: response.data[1].includes(user.user_id)
      }));
  
      const updatedStoredChatData = storedChatData.map(chat => ({
        ...chat,
        read: response.data[1].includes(chat.user_id) ? true : false
      }));
  
      const mergedChatData = mergeChats(updatedStoredChatData, newChatData);
      setChatData(mergedChatData);
  
      localStorage.setItem('chatData', JSON.stringify(mergedChatData));
      localStorage.setItem('timestamp', Date.now());
    } catch (error) {
      console.error('Error fetching new chat data:', error);
    }
  };

  const fetchAllChatData = async () => {
    try {
      const config = {
        headers: {
          'RTNO-API-KEY': `${company_name}_dashboard`
        }
      };
      const response = await axios.get(`${host}dashboard/users?company_name=${company_name}`, config);

      const allChatData = response.data[0].map(user => ({
        user_id: user.user_id,
        last_message: user.last_message,
        read: response.data[1].find(status => status.user_id === user.user_id)?.read || true
      }));

      setChatData(allChatData);

      localStorage.setItem('chatData', JSON.stringify(allChatData));
      localStorage.setItem('timestamp', Date.now());
    } catch (error) {
      console.error('Error fetching all chat data:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  
  const handleClick = (user_id) => {
    onSelectChat(user_id);
    setSelectedButton(user_id);
  };

  let filteredChatData = chatData.filter(chat => String(chat.user_id).includes(searchQuery));

  filteredChatData.sort((a, b) => {
    if (a.read === b.read) return 0;
    if (a.read) return 1;
    return -1;
  });

  return (
    <div className="overflow-y-auto pt-2 bg-white rounded-3xl">
      <div className='w-full h-full overflow-y-auto max-h-[calc(100vh-10rem)] flex flex-col items-center '>
      <div className="px-8 pt-2">
        <input
          type="text"
          placeholder="Искать по ID"
          value={searchQuery}
          onChange={handleSearch}
          className="border-none rounded w-full max-w-md p-2 shadow-md focus:outline-none focus:shadow-lg"
        />
      </div>
      <div className="flex flex-col items-center mt-8">
        {filteredChatData.map((chat) => {
          return (
            <button           key={chat.user_id}
            className={`w-11/12 px-8 py-3 mb-3 text-left border rounded hover:bg-gray-500 hover:text-white ${
              selectedButton === chat.user_id ? 'bg-gray-500 text-white' : 'bg-white text-gray-400 border-gray-300'
            } ${chat.read ? '' : 'bg-gray-900 text-white'}`}
            onClick={() => handleClick(chat.user_id)}
          >
            <div className="font-bold">ID: {chat.user_id}</div>
            <div className="mt-1 italic text-sm">{chat.last_message.length > 45 ? chat.last_message.substr(0, 45) + "..." : chat.last_message}</div>
          </button>
        );
      })}
    </div>
    </div>
  </div>
  )
}  

export default ChatList