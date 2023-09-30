import React, { useEffect, useState } from 'react';
import { getDocumentById } from '../firebase';
import { useNavigate } from 'react-router-dom';
const Video = () => {
    
    const [videoUrl, setVideoUrl] = useState(null);
  
    useEffect(() => {
      async function fetchVideo() {
        try {
          // Gọi hàm getVideoFromFirebase để lấy URL của video
          const url = await getDocumentById('dog', 'Animal').videoUrl;
          console.log(url)
          // Set URL vào state
          setVideoUrl(url);
        } catch (error) {
          console.error('Error:', error);
        }
      }
  
      fetchVideo();
    }, []); // Thêm mảng rỗng để đảm bảo useEffect chỉ chạy một lần sau khi component mount
    return (
      <div>
         {videoUrl ? (
              <video id="videoPlayer" width="320" height="240" controls>
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <p>Loading video...</p>
            )}
      </div>
    )
  }
  
  export default Video