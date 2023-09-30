import React, { useState } from 'react';
import { addDataToFirestore } from '../../firebase';
import Card from './Card';

const PostCard = (props) => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredContent, setEnteredContent] = useState('');
  const [enteredImage, setEnteredImage] = useState('');
  const [enteredCategory, setEnteredCategory] = useState('');

  const addPostHandler = (event) => {
    event.preventDefault();
    if (enteredContent.trim().length === 0 || enteredTitle.trim().length === 0) {
      return;
    }
    addDataToFirestore(enteredTitle, enteredContent, enteredImage, 'Post');
    props.addPost(enteredContent, enteredTitle, enteredImage, enteredCategory);

    setEnteredContent('');
    setEnteredTitle('');
    setEnteredImage('');
    setEnteredCategory('');
  };

  

  return (
    <div className='flex items-center justify-center mt-4'>
        <Card className="text-center p-2 w-1/2">

        <form onSubmit={addPostHandler} className="bg-white rounded-lg p-2 shadow-md">
        <input
            type="text"
            value={enteredTitle}
            placeholder="Tên tác giả"
            className="w-full h-1/2 border rounded-md p-2 mb-3"
            onChange={(event) => setEnteredTitle(event.target.value)}
        />
        <textarea
            id="usertext"
            type="text"
            className="h-1/4 w-full border rounded-md p-2 mb-3"
            cols="10"
            rows="1"
            maxLength="40"
            required
            value={enteredContent}
            onChange={(event) => setEnteredContent(event.target.value)}
            placeholder='Nội dung bài viết...'
        />
        <div className="flex justify-between mb-3">
            <input
            type="text"
            value={enteredImage}
            className="w-full h-1/2 border rounded-md p-2 mr-2"
            placeholder="Nhập link video"
            onChange={(event) => setEnteredImage(event.target.value)}
            />
            {/* <input
            type="text"
            value={enteredCategory}
            className="w-1/2 border rounded-md p-2"
            placeholder="Enter your category"
            onChange={(event) => setEnteredCategory(event.target.value)}
            /> */}
        </div>
        <button
            type="submit"
            className="bg-main-100 text-white rounded-full px-4 py-2 font-semibold hover:bg-main-200"
        >
            Đăng bài
        </button>
        </form>
        </Card>
    </div>
  );
};

export default PostCard;
