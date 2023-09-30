import React, { useEffect, useState } from 'react';
import { getDocumentById } from '../firebase';
import { useNavigate, useParams } from 'react-router-dom';

const Video = (props) => {
    const {topic} = props;
    const [videoUrl, setVideoUrl] = useState(null);
    const navigate = useNavigate();
    const { item} = useParams();

    useEffect(() => {
      async function fetchVideo() {
        try {
          // Gọi hàm getVideoFromFirebase để lấy URL của video
          const data = await getDocumentById(item, topic);
          const url = data.videoUrl;
          console.log(url)
          // Set URL vào state
          setVideoUrl(url);
        } catch (error) {
          console.error('Error:', error);
        }
      }
  
      fetchVideo();
    }, [item]); // Thêm mảng rỗng để đảm bảo useEffect chỉ chạy một lần sau khi component mount
    const goBack = () => {
      navigate(-1);
    };
    return (
      <div className="quiz-container"> {/* Thêm class CSS cho div container */}
        <button onClick={goBack}>Quay lại</button> {/* Nút quay lại */}
        {videoUrl ? (
          
          <div className="video-wrapper"> {/* Thêm class CSS cho div wrapper */}
            <img
              src={videoUrl}
              width='70%'
              alt='video'
            />
          </div>
        ) : (
          <p>Loading video...</p>
        )}
      </div>
    );
  }
  
  export default Video