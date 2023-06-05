import React from 'react'

const NoSelectedMessage = () => {
  return (
    <div className="flex items-center flex flex-col items-center w-full h-3/4 p-5 bg-white rounded-3xl">
        <h1 className="text-center text-[inherit] text-lg mx-auto">
        Здравствуйте!<br />
        Добро пожаловать в дашборд вашего чата, где вы удобно можете просмотреть чаты пользователей.<br />
        Чтобы начать, выбарите чат из меню слева
        </h1>
    </div>
  )
}

export default NoSelectedMessage