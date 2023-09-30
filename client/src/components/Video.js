import React, { useEffect, useState } from 'react';
import { getDocumentById } from '../firebase';
import { useNavigate, useParams } from 'react-router-dom';

const Video = (props) => {
    const {topic} = props;
    const [videoUrl, setVideoUrl] = useState(null);
    const { item} = useParams();

    useEffect(() => {
      async function fetchVideo() {
        try {
          // Gọi hàm getVideoFromFirebase để lấy URL của video
          const data = await getDocumentById(item, topic);
          const url = data.videoUrl;
          console.log()
          console.log(url)
          // Set URL vào state
          setVideoUrl(url);
        } catch (error) {
          console.error('Error:', error);
        }
      }
  
      fetchVideo();
    }, [item]); // Thêm mảng rỗng để đảm bảo useEffect chỉ chạy một lần sau khi component mount
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