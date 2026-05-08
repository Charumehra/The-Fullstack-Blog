import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { API_URL } from "../api";

const PostForm = ({ onPostCreated }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview("");
    }

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("content", content.trim());
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await axios.post(API_URL, formData);
      onPostCreated?.(res.data.data);
      setSuccess("Post created successfully");
      resetForm();
      setTimeout(() => setSuccess(""), 3000);
      console.log(res.data);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-form">
      <div className="card">
        <h2 className="card-title">Create Blog Post</h2>

        <form onSubmit={handleSubmit} className="form">
          <label className="field">
            <span className="label">Thumbnail image</span>
            <input
              ref={fileInputRef}
              className="input file-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>

          {imagePreview && (
            <div className="image-preview-wrap">
              <img className="image-preview" src={imagePreview} alt="Selected thumbnail preview" />
            </div>
          )}

          <label className="field">
            <span className="label">Title</span>
            <input
              className="input"
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={150}
            />
          </label>

          <label className="field">
            <span className="label">Content</span>
            <textarea
              className="textarea"
              placeholder="Write something interesting..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              maxLength={2000}
            />
          </label>

          <div className="form-footer">
            <div className="meta">{content.length}/2000</div>
            <button
              className="btn primary"
              type="submit"
              disabled={loading || !title.trim() || !content.trim()}
            >
              {loading ? "Posting..." : "Create Post"}
            </button>
          </div>

          {success && <div className="toast success">{success}</div>}
          {error && <div className="toast error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default PostForm;