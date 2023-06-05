import React from "react";

function PriceCard({ title, price, features }) {
  return (
    <div id="pricing" className="border min-w-[80vw] sm:min-w-[400px] md:min-w-full group even:bg-primary even:text-white flex flex-col items-center rounded-xl shadow-borderShadow">
      <h4 className="mt-6 font-bold text-2xl">{title}</h4>

      <div className="mt-6 flex items-center">
        <p className="text-7xl text-primary group-even:text-white font-bold">{price}</p>
        <div className="ml-2 flex flex-col items-start">
          <p className="text-primary group-even:text-white font-bold text-2xl">₽</p>
          <p className="text-[#AFAFAF] group-even:text-[#E0E0E0] -mt-1">/Месяц</p>
        </div>
      </div>

      <div className="mt-5">
        {features.map((feature) => (
          <p key={feature} className="mt-4">{feature}</p>
        ))}
      </div>

      <button className="primary-button mt-9 mb-8 group-even:primary-button-white rounded-lg">Связаться</button>
    </div>
  );
}

export default PriceCard;
