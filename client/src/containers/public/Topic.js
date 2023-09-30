import React from 'react'
import { useNavigate } from 'react-router-dom';

const Topic = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const topic = [
    {
      path: 'animal',
      name: 'Động Vật',
      imageUrl:
        'https://i.pinimg.com/564x/22/4f/8a/224f8a195ec0e1ec1b421d3100c4d754.jpg',
    },
    {
      path: 'nature',
      name: 'Tự nhiên',
      imageUrl:
        'https://i.pinimg.com/564x/30/11/da/3011da8281ff17148705e039250dd127.jpg',
    },
    {
      path: 'emotion',
      name: 'Cảm xúc',
      imageUrl:
        'https://i.pinimg.com/564x/38/66/67/386667a4c2becda9d14654f1414e0bdf.jpg',
    },
    {
      path: 'color',
      name: 'Màu sắc',
      imageUrl:
        'https://sohanews.sohacdn.com/thumb_w/660/160588918557773824/2021/4/5/b9698c56b2bf861c8a92b5ed83-1617611936373741834327.png',
    },
    {
      path: 'family',
      name: 'Gia đình',
      imageUrl:
        'https://i.pinimg.com/564x/f3/aa/25/f3aa252e4259affff387ed4c59f0f2d9.jpg',
    },
    {
      path: 'basic',
      name: 'Từ thông dụng',
      imageUrl:
        'https://i.pinimg.com/564x/ee/dc/76/eedc76d8e1641efd5a3cedafca997898.jpg',
    },
  ]

  const handleItemClick = (selectedTopic) => {
    // Xử lý khi người dùng nhấp vào ô
    console.log(`Bạn đã nhấp vào mục: ${selectedTopic.name}`);
    // Thêm xử lý tùy ý tại đây
    isLoggedIn ? navigate(`/private/topic/${selectedTopic.path}`) :
    navigate(`/topic/${selectedTopic.path}`)
    
  };

  return (
    <div className="p-10 grid grid-cols-2 gap-10 md:gap-6">
          {topic.map((oneTopic, index) => (
            <div 
              key={index} 
              className="outline outline-2 outline-gray-300 shadow-xl p-4 rounded-lg cursor-pointer transition-transform hover:scale-105 m-6" 
              onClick={() => handleItemClick(oneTopic)} 
            >
              <div className="flex h-56 " 
              style = {{ 
                backgroundImage: `url(${oneTopic.imageUrl})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
                backgroundRepeat: 'no-repeat', 
                }}
              ></div>
              <div className="text-lg font-semibold mt-2 text-center">
                {oneTopic.name}
              </div>
              
            </div>
        ))}
    </div> 
  )
}

export default Topic
