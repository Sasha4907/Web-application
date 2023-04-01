import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../redux/features/post/postSlice';

export const AddPostPage = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = () => {
    try {
      const data = new FormData();
      data.append('title', title);
      data.append('text', text);
      data.append('image', image);
      dispatch(createPost(data));
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const clearFormHandler = () => {
    setText('');
    setTitle('');
  };

return (
  <form
    className="w-2/3 mx-auto py-10 bg-white rounded-lg shadow-md px-6 relative"
    onSubmit={(e) => e.preventDefault()}
  >
    <div className="relative mb-4">
      <label className="text-gray-600 text-sm font-semibold block mb-2">
        Прикріпіть обкладинку:
      </label>
      <label className="text-gray-600 text-sm font-semibold inline-block py-2 px-3 cursor-pointer hover:bg-gray-300 rounded-md">
        <input
          type="file"
          className="hidden"
          onChange={(e) => setImage(e.target.files[0])}
        />
        Виберіть файл
      </label>
      {image && (
        <div className="w-20 h-20 absolute top-0 right-0 mt-2 mr-2 rounded-md overflow-hidden">
          <img
            src={URL.createObjectURL(image)}
            alt={image.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>

    <div className="mb-4">
      <label className="text-gray-600 text-sm font-semibold block mb-2">
        Назва книжки:
      </label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Заголовок"
        className="mt-1 text-black w-full rounded-lg bg-gray-300 border-2 py-2 px-4 text-sm outline-none placeholder-gray-500 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
      />
    </div>

    <div className="mb-6">
      <label className="text-gray-600 text-sm font-semibold block mb-2">
        Текст глави:
      </label>
      <textarea
        onChange={(e) => setText(e.target.value)}
        value={text}
        placeholder="Текст глави"
        className="mt-1 text-black w-full rounded-lg bg-gray-300 border-2 py-2 px-4 text-sm outline-none resize-none h-40 placeholder-gray-500 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
      />
    </div>

    <div className="flex justify-center">
      <button
        onClick={submitHandler}
        className="bg-gray-600 text-sm text-white rounded-md py-2 px-4 transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
      >
        Додати
      </button>
      <button
        onClick={clearFormHandler}
        className="bg-red-500 text-sm text-white rounded-md py-2 px-4 ml-4 transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
      >
        Відмінити
      </button>
    </div>
        </form>
    )
}
