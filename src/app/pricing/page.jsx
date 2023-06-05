import React from 'react'
import './page.module.css'
import './price.css'
import PriceCard from '@/components/PriceCard/PriceCard';

const Pricing = () => {
  return (
    <div>
      <h3 className="text-[32px] font-bold">Ценовая политика</h3>

      <div className="mt-11 grid gap-8 md:gap-5 md:grid-cols-3 lg:gap-8 xl:gap-16 justify-center">
        <PriceCard
          title="Стандарт"
          description="Brief price description"
          price="3,500"
          operators="2"
          features={[
            "1000 сообщ./мес.",
            "3₽/сообщ.",
            "Подгрузка до 1 млн. символов",
            "Дашборд для просмотра сообщений",
            "3 варианта персонажа"
          ]}
        />
        <PriceCard
          title="Стандарт+"
          description="Brief price description"
          price="5,000"
          operators="5+"
          features={[
            "1000 сообщ./мес.",
            "4₽/сообщ.",
            "Память в диалоге",
            "Подгрузка до 3 млн. символов",
            "Дашборд для просмотра сообщений",
            "6 вариантов персонажа"
          ]}
        />
        <PriceCard
          title="Премиум"
          description="Brief price description"
          price="12,000"
          operators="10+"
          features={[
            "1000 сообщ./мес.",
            "4₽/сообщ.",
            "Память в диалоге",
            "Подгрузка до 3 млн. символов",
            "Дашборд для просмотра сообщений",
            "Расширенная аналитика",
            "Переключение на человека",
            "12 вариантов персонажа",
            "'Плохие' сообщения"
          ]}
        />
      </div>
    </div>
  );
}

export default Pricing