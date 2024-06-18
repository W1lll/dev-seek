"use client";

import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { timeSince } from "../_components/time-since";

export default function Posts() {
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [filteredPosts, setFilteredPosts] = useState([]);
  // Fetch posts using TRPC's useQuery
  const { data: posts = [], refetch } = api.post.get.useQuery();
  console.log(posts);

  useEffect(() => {
    setFilteredPosts(posts); // Initialize filteredPosts with all posts
    setLoading(false);
  }, [posts]);

  useEffect(() => {
    filterPosts();
  }, [category, searchTerm, posts]);

  const filterPosts = () => {
    let filtered = posts;
    if (category) {
      filtered = filtered.filter((post) => post.category === category);
    }
    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    setFilteredPosts(filtered);
  };

  const handleCategoryClick = (category) => {
    setCategory(category);
  };

  const handleTagClick = (tag) => {
    setSearchTerm(tag);
  };

  const resetFilters = (event) => {
    setCategory("");
    setSearchTerm("");
    setTimeout(() => {
      event.target.blur();
    }, 250)
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center text-2xl text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center py-2 text-white">
      <div className="w-full max-w-4xl px-6 pb-6">
        <h1 className="mb-4 text-center text-3xl font-bold">Posts</h1>
        <div className="mb-4 grid grid-cols-1 gap-6 md:w-2/3 md:grid-cols-3">
          <div>
            <label
              className="block text-sm font-medium text-gray-300"
              htmlFor="category"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-2 block h-9 w-full rounded-md border-2 border-green-600/50 bg-transparent p-2 text-xs text-gray-300 shadow-sm transition-all duration-300 focus:border-green-400/65 focus:outline-none"
            >
              <option value="">All</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              {/* Add more categories as needed */}
            </select>
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-300"
              htmlFor="search"
            >
              Search by Title/Tags
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-2 block h-9 w-full rounded-md border-2 border-green-600/50 bg-transparent p-2 text-xs text-gray-300 shadow-sm transition-all duration-300 focus:border-green-400/65 focus:outline-none"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={resetFilters}
              className="h-9 rounded-md border-2 border-red-600/50 bg-transparent px-4 text-xs text-gray-300 shadow-sm transition-all duration-300 focus:border-red-400/65 focus:outline-none"
            >
              Reset
            </button>
          </div>
        </div>
        {filteredPosts.length === 0 ? (
          <div className="text-center text-gray-300">No posts available.</div>
        ) : (
          <ul className="space-y-6">
            {filteredPosts.map((post) => {
              const tags = post.tags.split(", ").filter((tag) => tag !== "");
              return (
                <li
                  key={post.id}
                  className="rounded-md border border-gray-400/65 p-4 shadow-md"
                >
                  <h2 className="text-xl font-semibold text-gray-100">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-300">{post.content}</p>
                  {tags.length > 0 && (
                    <div className="mt-4 flex select-none flex-wrap items-center gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex cursor-pointer items-center rounded-md bg-green-400/15 px-3 py-1 text-sm font-medium text-green-200"
                          onClick={() => handleTagClick(tag)}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-4 flex flex-row items-center justify-between">
                    <p
                      className="cursor-pointer text-gray-400"
                      onClick={() => handleCategoryClick(post.category)}
                    >
                      Category: {post.category}
                    </p>
                    <div className="flex w-1/6 flex-row justify-between">
                      <p className="text-gray-400">{post.createdBy.name}</p>
                      <p
                        className="select-none text-gray-400"
                        title={new Date(post.createdAt).toLocaleString()}
                      >
                        {timeSince(post.createdAt)}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
