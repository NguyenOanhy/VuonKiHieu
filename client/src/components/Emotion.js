import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate, useParams } from 'react-router-dom';
const Emotion=() =>{
    const navigate = useNavigate();
    const {topic} = useParams();
    const [emotions, setEmotions] = useState([])

    useEffect(() => {
        getEmotions()
    }, [topic])

    function getEmotions() {
        const emotionRef = collection(db, 'Emotion')
        getDocs(emotionRef)
        .then(Response => {
            const emotions = Response.docs.map(doc => ({
            data: doc.data(),
            id: doc.id,
            }))
            setEmotions(emotions) 
        })
        .catch(error => console.log(error.message))
    }

    const handleItemClick = async (emotion) => {
        try {
        // Xử lý khi người dùng nhấp vào ô
        // const imageUrl = await getImageFromFirebase('images', '7.jpg');
        // console.log('URL của hình ảnh:', imageUrl);
        console.log(`Bạn đã nhấp vào mục: ${emotion.data.name}`);
        // Thêm xử lý tùy ý tại đây
        navigate(`/topic/emotion/${emotion.id}`);
        
        } catch (error) {
        console.error('Lỗi khi lấy URL hình ảnh:', error);
        }
    };
    return (
        <div className="p-6 grid grid-cols-4 gap-6 md:gap-4">
            {emotions.map(emotion=> (
                <div 
                key={emotion.id} 
                className="outline outline-2 p-4 rounded-lg cursor-pointer transition-transform hover:scale-105 m-6" 
                onClick={() => handleItemClick(emotion)} 
                >
                <div className="flex h-56 " 
                style = {{ 
                    backgroundImage: `url(${emotion.data.imageUrl})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                    backgroundRepeat: 'no-repeat', 
                    }}
                ></div>
                <div className="text-lg font-semibold mt-2 text-center">
                    {emotion.data.name}
                </div>
                
                </div>
            ))}
        </div> 
    )
}

export default Emotion;