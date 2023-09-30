import React, { useEffect, useState } from 'react';
import { getDocumentById } from '../firebase';
import { useNavigate, useParams } from 'react-router-dom';

const Video = (props) => {
    const {topic} = props;
    const [videoUrl, setVideoUrl] = useState(null);
    const navigate = useNavigate();
    const {item} = useParams();

    useEffect(() => {
      async function fetchVideo() {
        try {
          // Gọi hàm getVideoFromFirebase để lấy URL của video
          const data = await getDocumentById(item, topic);
          const url = data.videoUrl;
          // Set URL vào state
          setVideoUrl(url);
        } catch (error) {
          console.error('Error:', error);
        }
      }
      fetchVideo();
      console.log(topic);
    }, [item]); // Thêm mảng rỗng để đảm bảo useEffect chỉ chạy một lần sau khi component mount
    const goBack = () => {
      navigate(-1);
    };
    return (
        
        <div className='flex justify-center items-center mt-10 flex-col'> 
          
          {videoUrl ? (
            <div className='text-white  mx-20 rounded-lg px-20 py-10 shadow-xl flex bg-gradient-to-tr from-yellow-400 to-pink-500 w-[500px] justify-center items-center' >
              <div className="video-wrapper flex items-center justify-center" > {/* Thêm class CSS cho div wrapper */}
                <img
                  src={videoUrl}
                  width='70%'
                  alt='video'
                />
              </div>
            </div>
          ) : (
            <p>Loading video...</p>
          )}
          <button onClick={goBack} className='mt-6 ml-3 text-lg text-white bg-gradient-to-t from-orange-400 to-pink-500 border border-red-500 rounded-lg flex p-2 items-center justify-center cursor-pointer'>Quay lại</button>
        </div>
        
    );
  }
  
  export default Video