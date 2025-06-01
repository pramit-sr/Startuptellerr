import { useState } from 'react';

const BlogForm = ({ initialData = {}, onSubmit }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [content, setContent] = useState(initialData.content || '');
  const [author, setAuthor] = useState(initialData.author || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, author });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Content"
        value={content}
        required
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded min-h-[150px]"
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        required
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default BlogForm;
