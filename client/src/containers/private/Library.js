// import React, { useState } from 'react';
// import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import { storage, db } from '../../firebase';
// import { doc, setDoc } from 'firebase/firestore';

// import { DropFileInput, UploadButton } from '../../components';

// const Library = () => {
//   const [file, setFile] = useState(null);
//   const [videoURL, setVideoURL] = useState(null); // Added to track video URL

//   const onFileChange = (files) => {
//     const currentFile = files[0];
//     setFile(currentFile);
//     console.log(files);
//   };

//   const uploadToDatabase = (url) => {
//     let docData = {
//       mostRecentUploadURL: url,
//       username: 'jasondubon',
//     };
//     const userRef = doc(db, 'users', docData.username);
//     setDoc(userRef, docData, { merge: true })
//       .then(() => {
//         console.log('Successfully updated DB');
//       })
//       .catch((error) => {
//         console.error('Error updating DB:', error);
//       });
//   };

//   const handleClick = () => {
//     if (file === null) return;
//     const fileRef = ref(storage, `videos/${file.name}`);
//     const uploadTask = uploadBytesResumable(fileRef, file);

//     uploadTask.on(
//       'state_changed',
//       (snapshot) => {
//         let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log('Upload progress:', progress);
//       },
//       (error) => {
//         console.error('Upload error:', error);
//       },
//       () => {
//         console.log('Upload success!!');
//         getDownloadURL(uploadTask.snapshot.ref)
//           .then((downloadURL) => {
//             setVideoURL(downloadURL); // Store the video URL
//             uploadToDatabase(downloadURL);
//             console.log('Download URL:', downloadURL);
//           })
//           .catch((error) => {
//             console.error('Error getting download URL:', error);
//           });
//       }
//     );
//   };

//   return (
//     <div className="flex flex-col">
//       <div className='flex'>
//       <DropFileInput onFileChange={(files) => onFileChange(files)} />
//       <UploadButton onClick={() => handleClick()}>Upload</UploadButton>
//       </div>
//       {videoURL && (
//         <div className="mt-4">
//           <p className="font-semibold">Uploaded Video:</p>
//           <video controls src={videoURL} className="mt-2" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Library;

import { Fragment , useState, useEffect} from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

import PostCard from '../../components/PostComponent/PostCard';
import ShowCard from '../../components/PostComponent/ShowCard';

const Library = () => {
  const [posts, setPosts] = useState([])
  const [postList   , setPostList] = useState([ ]); 
  const addPostHandler = ( enteredContent, enteredTitle, enteredImage, enteredCategory) => { 
    console.log(enteredImage,"image");
      setPostList((prevUsersList) => {
        return [...prevUsersList, {
            content: enteredContent,
            title: enteredTitle,
            image: enteredImage,
            category: enteredCategory,
            id: Math.random().toString()}];
      });
  };

  useEffect(() => {
    getPosts()
  },)

  function getPosts() {
    const postRef = collection(db, 'Post')
    getDocs(postRef)
      .then(Response => {
        const posts = Response.docs.map(doc => ({
          data: doc.data(),
          id: doc.id,
        }))
        console.log()
        setPosts(posts) 
      })
      .catch(error => console.log(error.message))
  }
 

  return (
    <Fragment>
       
        <PostCard addPost={addPostHandler} />
        
        {/* <ShowCard newpost={postList} /> */}
        <div className="m-10 mx-auto">
          <ul>
            {posts.map((post) => (
            
              <li key={post.id} className="border border-gray-300 rounded-lg my-2 p-4">
                <div className="flex justify-between mt-2 ">
                  <div className="text-black">
                    <p className="text-xl font-bold capitalize">{post.data.name}</p>
                    {/* <p className="text-sm font-light text-gray-500">{year}-{month < 10 ? `0${month}` : `${month}`}-{date}</p> */}
                  </div>
                  <div className=" p-2 rounded-md">
                    {/* <p className="text-sm font-semibold">{post.category}</p> */}
                  </div>
                </div>
                <p className="text-black mt-2">{post.data.data}</p>
                <video id="videoPlayer" width="320" height="240" controls className='border border-2px'>
                    <source src={post.data.image} type="video/mp4" />
                  </video>
              </li>
            
          ))}
          </ul>
        </div>
    </Fragment>
  );
}
// }
export default Library;
