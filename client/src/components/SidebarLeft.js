import React from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import path from '../utils/path';
import icons from "../utils/icons";
import SidebarMenu from '../utils/menu'

const { SlSocialStumbleupon, LuContact} = icons;

const notActiveStyle ='py-3 px-10 flex items-center justify-start text-[18px] hover:bg-main-100 hover:text-white transition duration-300';
const activeStyle = 'py-3 px-10 flex items-center justify-start text-[19px] font-semibold hover:bg-main-100 hover:text-white transition duration-300';

const SidebarLeft = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col h-screen shadow-xl'>
        <div onClick={() => navigate(path.HOME)} className='w-full h-[70px] py-[15px] px-[40px] flex justify-start items-center cursor-pointer'>
        </div>
        <div className='flex flex-col mt-10'> 
        {isLoggedIn ? <SidebarMenu isLoggedIn/> : <SidebarMenu isLoggedIn={false}/>}
            {isLoggedIn ? (
              <div>
                  <NavLink
                      to='library'
                      key='library'
                      className= {({isActive}) => isActive ? activeStyle : notActiveStyle}
                  >
                     <SlSocialStumbleupon size={20} className='text-main-100' />
                      <span className="ml-2">Trang giao lưu</span>
                      
                  </NavLink>

                  <NavLink
                      to='contact'
                      key='contact'
                      className= {({isActive}) => isActive ? activeStyle : notActiveStyle}
                  >
                     <LuContact size={20} className='text-main-100' />
                      <span className="ml-2">Liên hệ</span>
                      
                  </NavLink>
                  </div>

                    ) : null}
        </div>
    </div>
  );
};

export default SidebarLeft;