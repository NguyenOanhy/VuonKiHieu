import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, SidebarLeft } from '../../components'
import { Scrollbars } from 'react-custom-scrollbars-2';

const Private = () => {

  return (
    <div className='h-full flex'>
      <div className='z-40'>
        <Header isLoggedIn/>
      </div>
      <div className='w-[240px] flex-none'>
        <SidebarLeft isLoggedIn/>
      </div>
      <div className='flex-auto mt-16'>
        <Scrollbars autoHide style={{ width: '100%', height: '100%' }}>
            <Outlet className='mt-24'/>
        </Scrollbars>
      </div>
    </div>
  );
};

export default Private