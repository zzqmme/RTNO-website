'use client'

import axios from "axios";
import { useEffect, useState } from "react";
// import "./BadMessages.css";

const BadMessages = ({ company_name, host }) => {
    const [messages, setMessages] = useState([]);
  
    useEffect(() => {
        getBadMessages();
      }, []);
    
    const getBadMessages = async () => {
        const config = {
          headers: {
            "RTNO-API-KEY": `${company_name}_dashboard`,
          },
        };
      
        const url = `${host}}dashboard/bad_messages/?company_name=${company_name}`;
      
        const result = await axios.get(url, config);
        setMessages(result.data);
        console.log(result.data);
      };
      


    const resolveMessage = async (messageId) => {
        const config = {
          headers: {
            "RTNO-API-KEY": `${company_name}_dashboard`,
          },
        };
        console.log(messageId)
        try {
          // await axios.put(`http://localhost:5000/dashboard/resolve_message/${messageId}`, {}, config);
          setMessages((prevMessages) => {
            const updatedMessages = prevMessages.filter((message) => message.user_message_id !== messageId);
            return updatedMessages;
          });
        } catch (error) {
          console.error("Error resolving message:", error);
        }
      };
      
      
      
    console.log(messages)
  
    return (
      <div className="bg-gray-100">
        {messages.map((message, index) => (
        <div key={index} className='mx-10 mt-10 p-2 bg-white rounded-3xl my-10'>
          <div className="flex flex-col items-center w-full px-20 py-2 space-y-4 overflow-y-auto">
            <div key={message.id} className="message human max-w-2/5 mb-4 bg-blue-100 p-3 rounded-xl self-end mr-8">
              <div className="message-text">{message.user_data}</div>
            </div>
            <div key={message.id} className="message chat-bot max-w-2/5 mb-4 bg-gray-500 text-white p-3 w-3/4 rounded-xl self-start">
              <div className="message-text">{message.chatbot_data}</div>
            </div>
          </div>
          <div className="flex justify-center mt-3">
            <button className="resolve-button bg-gray-500 text-white py-2 px-4 rounded-xl text-center inline-block text-sm mb-2 cursor-pointer" onClick={() => resolveMessage(message.user_message_id)}>Resolve</button>
          </div>
          {index !== messages.length - 1 && (
            <hr className="border-0 border-t border-gray-300 my-5" />
          )}
        </div>
      ))}
      </div>
    );
  };

export default BadMessages;
