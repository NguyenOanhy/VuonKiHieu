import React from 'react';
import icons from '../utils/icons'
import path from '../utils/path'
import { useNavigate } from 'react-router-dom'
import { auth, getCurrentUserEmail } from '../firebase';

const { AiOutlineUser} = icons

const Header = ({ isLoggedIn }) => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log('User logged out successfully.');
      navigate(path.PUBLIC);
    } catch (error) {
      console.log("Error signing out", error.message);
    }
  };

  return (
    <>
    <div className='flex'>
      <div className="bg-white w-full h-[70px] shadow-md fixed flex justify-between mb-10" >
        <div className='flex gap-1 w-full items-center px-4'>
          <img src="/asset/logo1.png" alt='logo' className='mt-10 w-1/4' />
        </div>
        <div className='flex items-center gap-4'>
          {isLoggedIn? (
            <div>
              <p className='text-main-200 flex items-center justify-center'>{getCurrentUserEmail()}</p>
              <div className="bg-main-100 hover:bg-main-200 w-[140px] flex justify-center items-center p-2 h-1/2 rounded-lg cursor-pointer"
                onClick={() => navigate(path.PUBLIC)}
              >
                <p className="text-white text-[17px] font-semibold" onClick={handleLogout}>Đăng xuất</p>
              </div>
            </div>
          ) : (
            <div className="bg-main-100 hover:bg-main-200 w-[140px] flex justify-center items-center p-2 h-1/2 rounded-lg cursor-pointer">
              <p className="text-white text-[18px] font-semibold "
                onClick={() => navigate(path.LOGIN)}
              >Đăng nhập</p>
            </div>
          )}
          <div className='mr-10'>
            <span><AiOutlineUser size={28}/></span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
export default Header;