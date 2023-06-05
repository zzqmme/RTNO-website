import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DonutChart from './DonutChart'


const Analytics = ({ company_name, host }) => {

    const [keys, setKeys] = useState([]);

    const getData = async () => {
        const config = {
            headers: {
              'RTNO-API-KEY': `${company_name}_dashboard`
            }
          };
        const response = await axios.get(`${host}dashboard/analytics/all_messages/?company_name=${company_name}`, config);
        setKeys(response.data)
    }
    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="flex flex-col items-center w-full px-5 bg-white rounded-3xl">
            <div className='w-full h-full overflow-y-hidden max-h-[calc(100vh-10rem)] flex flex-col items-center overflow-x-hidden'>
                <h1 className='text-lg'>
                    Key Entity
                </h1>
                <div style={{ width: 700, height: 700 }}>
                    <DonutChart keys={keys}/>
                </div>
                <div className="flex overflow-y-auto h-full flex-col items-center justify-center ">
                {Object.entries(keys).map(([key, value]) => (
                    <h1 key={key} className="text-xl font-bold">
                    {`${key}: ${value}`}
                    </h1>
                ))}
                </div>
            </div>
        </div>
    )
}

export default Analytics