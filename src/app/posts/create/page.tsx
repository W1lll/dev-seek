"use client";

import { useState } from 'react';
import { api } from '~/trpc/react';
import { useRouter } from 'next/navigation';

export default function CreatePostClient() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();
  const createPostMutation = api.post.create.useMutation();

  const classes = "mt-1 block w-full border-green-600 border-2 bg-transparent shadow-sm focus:border-green-400 focus:outline-none p-2 rounded-md transition-all duration-300 resize-none"

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    } else if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handleTagDelete = (tagToDelete) => {
    setTags(tags.filter(tag => tag !== tagToDelete));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPostMutation.mutateAsync({
        title,
        content,
        category,
        tags,
      });
      setSuccessMessage('Post created successfully!');
      setErrorMessage('');
      setTitle('');
      setContent('');
      setCategory('');
      setTags([]);
      setTagInput('');

      router.push('/posts'); // Uncomment to redirect to the posts page
    } catch (error) {
      setErrorMessage('Failed to create post. Please try again.');
      console.error('Failed to create post', error);
      setSuccessMessage('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 text-white">
      <h1 className="text-2xl font-bold mb-6">Create Post</h1>
      {successMessage && (
        <div className="mb-4 p-2 bg-green-500 text-white rounded">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mb-4 p-2 bg-red-500 text-white rounded">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-200" htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={classes}
            onKeyDown={handleKeyDown}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200" htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className={classes}
            onKeyDown={handleKeyDown}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200" htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={classes}
            onKeyDown={handleKeyDown}
            required
          >
            <option value="">None</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            {/* Add more categories as needed */}
          </select>
        </div>
        <div className="flex flex-wrap gap-2 my-2">
          {tags.map((tag, index) => (
            <div key={index} className="flex items-center bg-green-100 text-green-700 rounded-full px-3 py-1">
              {tag}
              <button
                type="button"
                onClick={() => handleTagDelete(tag)}
                className="ml-2 text-green-500 hover:text-green-700"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200" htmlFor="tagInput">Add Tags</label>
          <input
            type="text"
            id="tagInput"
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyDown={handleTagKeyDown}
            className={classes}
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-500 text-white font-semibold shadow-sm hover:bg-green-700 focus:ring focus:ring-green-200"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
