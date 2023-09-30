const Emotion =() =>{
  const handleItemClick = (selectedTopic) => {
      // Xử lý khi người dùng nhấp vào ô
      console.log(`Bạn đã nhấp vào mục: ${selectedTopic.name}`);
      // Thêm xử lý tùy ý tại đây
    };

  const list = [
      {
          name: '',
          imageUrl: '',
          
      },
      {
          name: '',
          imageUrl: '',
      },
      {
          name: '',
          imageUrl: '',
      },
      {
          name: '',
          imageUrl: '',
      },
  ]
  return(
      <div className="p-10 grid grid-cols-4 gap-10 md:gap-6">
          {list.map((oneOfEmotion, index) => (
          <div
              key={index}
              className="border p-2 rounded-xl outline outline-1 cursor-pointer transition-transform hover:scale-105" 
              onClick={() => handleItemClick(oneOfEmotion)} // Gọi hàm xử lý khi người dùng nhấp vào ô
          >
              <div
              className="flex h-72"
              style={{
                  backgroundImage: `url(${oneOfEmotion.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
              }}
              ></div>
              <div className="text-lg font-semibold mt-2 text-center">
              {oneOfEmotion.name}
              </div>
          </div>
          ))}
      </div>

  )
}

export default Emotion;