import React, { useEffect } from 'react'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import { useStateContext } from '../contexts/ContextProvider'
import { AiOutlineMenu } from 'react-icons/ai';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
    <TooltipComponent content={title} position='BottomCenter'>
        <button type='button' onClick={customFunc} className='relative text-xl rounded-full p-3 hover:bg-light-gray'>
            <span className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2'/>
            {icon}
        </button>
    </TooltipComponent>
);

const Navbar = () => {

    const { activeMenu, setActiveMenu, screenSize, setScreenSize } = useStateContext();

    useEffect(() => {
        const handleResize = () => {
            setScreenSize(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (screenSize <= 900) {
            setActiveMenu(false);
        } else {
            setActiveMenu(true);
        }
    }, [screenSize])

    return (
        <div className='flex justify-between p-2 md:mx-6 relative'>
            <NavButton title='Menu' customFunc={() => {
                setActiveMenu((prevActiveMenu) => !prevActiveMenu)
            }}
            color='blue' 
            icon={<AiOutlineMenu />}
            />
        </div>
    )
}

export default Navbar