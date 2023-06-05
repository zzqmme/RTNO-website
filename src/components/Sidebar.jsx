import React from 'react';
import Link from 'next/link';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { useStateContext } from '@/context/ContextProvider';

const Sidebar = () => {

    const { activeMenu, setActiveMenu, screenSize } = useStateContext();
    
    const handleCloseSideBar = () => {
        if (activeMenu && screenSize <= 900) {
            setActiveMenu(false);
        }
    }

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              href="/dashboard"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              {/* <SiShopware /> */}
              <span>RTNO</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu((prev) => !prev)}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10">
            <Link
              exact
              href="/dashboard"
              onClick={handleCloseSideBar}
              activeClassName="bg-gray-100 text-gray-900"
              className="text-xl font-medium text-gray-700 hover:text-gray-900 py-2 px-4 block"
            >
              Дашборд
            </Link>
            <Link
              href="/dashboard/bad"
              onClick={handleCloseSideBar}
              activeClassName="bg-gray-100 text-gray-900"
              className="text-xl font-medium text-gray-700 hover:text-gray-900 py-2 px-4 block"
            >
              Плохие
            </Link>
            <Link
              href="/dashboard/analytics"
              onClick={handleCloseSideBar}
              activeClassName="bg-gray-100 text-gray-900"
              className="text-xl font-medium text-gray-700 hover:text-gray-900 py-2 px-4 block"
            >
              Аналитика
            </Link>
            <Link
              href="/dashboard/documentation"
              onClick={handleCloseSideBar}
              activeClassName="bg-gray-100 text-gray-900"
              className="text-xl font-medium text-gray-700 hover:text-gray-900 py-2 px-4 block"
            >
              Документация
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
