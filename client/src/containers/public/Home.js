import React from 'react';
import { useNavigate } from 'react-router-dom';
import path from '../../utils/path';

const Home = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  return (
    <div className='flex'>
        {isLoggedIn ? (
            <div className='flex'>
            <div className='flex px-20 flex-col items-center gap-20'>
              <p style={{ wordWrap: 'break-word', textAlign: 'center' }} className='text-2xl pt-60'>
             Vườn Kí Hiệu là nguồn tài liệu và khóa học hữu ích để giúp bạn tìm hiểu và phát triển kỹ năng ngôn ngữ kí hiệu. Dù bạn mới bắt đầu hay muốn nâng cao, chúng tôi ở đây để hỗ trợ bạn trên hành trình học tập của mình. Hãy bắt đầu ngay hôm nay!
              </p>
            </div>
          </div>
          
        ) : (
          <div className='flex px-40 flex-col items-center gap-6'>
            <p style={{ wordWrap: 'break-word', textAlign: 'center' }} className='text-2xl pt-60'>
            Vườn Kí Hiệu là nguồn tài liệu và khóa học hữu ích để giúp bạn tìm hiểu và phát triển kỹ năng ngôn ngữ kí hiệu. Dù bạn mới bắt đầu hay muốn nâng cao, chúng tôi ở đây để hỗ trợ bạn trên hành trình học tập của mình. Hãy bắt đầu ngay hôm nay!
            </p>
            <div
              className='bg-main-100 hover:bg-main-200 w-[240px] flex justify-center items-center p-4 rounded-lg cursor-pointer mt-2'
              onClick={() => navigate(path.LOGIN)}
            >
              <p className='text-white text-lg font-semibold' onClick={() => navigate(path.LOGIN)}>Đăng nhập</p>
            </div>
          </div>
        )}
    </div>
  );
};

export default Home;