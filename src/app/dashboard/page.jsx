"use client"
import React, { useState, useEffect } from 'react'
import ChatMessages from '@/components/ChatMessages'
import ChatList from '@/components/ChatList'
import DialogueStats from '@/components/DialogueStats'
import axios from 'axios'
import styles from './page.module.css'
import { useStateContext } from '@/context/ContextProvider'
import NoSelectedMessage from '@/components/NoSelectedMessage'
import { usePathname } from 'next/navigation'




const Dashboard = ({ company_name, host }) => {

  

    const { selectedUserId, setSelectedUserId } = useStateContext();
    const [update, setUpdate] = useState(true);
    const [keys, setKeys] = useState([]);
    const [selectedKey, setSelectedKey] = useState(null);

    const handleSelectChat = (user_id) => {
        setSelectedUserId(user_id);
    };

    const handleMarkAsRead = async (user_id) => {
        console.log("this means it fired in dashboard.jsx")
        const config = {
            headers: {
                'RTNO-API-KEY': `${company_name}_dashboard`
            },
            params: {
                company_name: company_name,
                timestamp: Date.now(),
                user_id: user_id
            }
        }
        await axios.put(`${host}dashboard/update_read_status/`, {}, config);
        setUpdate((prev) => !prev);
    };  

    return (
        <div className={`flex p-0 h-screen w-full ${styles.container}`}>
                <div className="w-1/4 mt-10 mx-4">
                    <ChatList onSelectChat={handleSelectChat} update={update} host={host} company_name={company_name}/>
                </div>
                <div className="mt-10 mb-12 m4-4 w-2/4 overflow-y-auto relative">
                    {selectedUserId ? (
                    <ChatMessages user_id={selectedUserId} onMarkAsRead={handleMarkAsRead} host={host} company_name={company_name} keys={keys} setKeys={setKeys} selectedKey={selectedKey} setSelectedKey={setSelectedKey}/>
                    ) : (
                    <NoSelectedMessage />
                    )}
                </div>
                <div className='w-1/4 mt-10 mx-4 overflow-y-auto'>
                <DialogueStats user_id={selectedUserId} company_name={company_name} keys={keys} host={host} setSelectedKey={setSelectedKey} selectedKey={selectedKey}/>
                </div>
            </div>
    )
}

export default Dashboard