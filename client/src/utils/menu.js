import React from 'react';
import icons from '../utils/icons';
import { NavLink} from 'react-router-dom';

const { BiHomeAlt2, PiTreeStructure, AiOutlineQuestionCircle, TiSortAlphabetically, BsChatRightDots} = icons;

export const SidebarMenu = ({ isLoggedIn }) => {
  const notActiveStyle ='py-3 px-10 flex items-center justify-start text-[18px] hover:bg-main-100 hover:text-white transition duration-300';
  const activeStyle = 'py-3 px-10 flex items-center justify-start text-[19px] font-semibold hover:bg-main-100 hover:text-white transition duration-300';
  const sidebarMenu = [
    {
      path: isLoggedIn ? '/private' : '/',
      text: 'Trang chủ',
      end: true,
      icons: <BiHomeAlt2 size={20} className='text-main-100' />
    },
    {
      path: isLoggedIn ? '/private/topic' : '/topic',
      text: 'Chủ đề',
      icons: <PiTreeStructure size={20} className='text-main-100' />
    },
    {
      path: isLoggedIn ? '/private/alphabet' : '/alphabet',
      text: 'Bảng chữ cái',
      icons: <TiSortAlphabetically size={20} className='text-main-100' />
    },

    {
      path: isLoggedIn ? '/private/quiz' : '/quiz',
      text: 'Câu hỏi',
      icons: <AiOutlineQuestionCircle size={20} className='text-main-100' />
    },
    // {
    //   path: isLoggedIn ? '/private/summary' : '/summary',
    //   text: 'Summary',
    //   icons: <AiOutlineCheckCircle size={20} className='text-main-100' />
    // },
    {
      path: isLoggedIn ? '/private/chatbot' : '/chatbot',
      text: 'Trợ lý ảo',
      icons: <BsChatRightDots size={20} className='text-main-100' />
    },
  ];
  return (
    <div className='flex flex-col h-full justify-between'>
      {sidebarMenu.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          end={item.end}
          className={({isActive}) => isActive ? activeStyle : notActiveStyle}
        >
          {item.icons}
          <span className='ml-2'>{item.text}</span>
        </NavLink>
      ))}
    </div>
  );
}
export default SidebarMenu;