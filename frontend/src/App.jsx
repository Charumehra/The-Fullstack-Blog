import { useEffect, useState } from "react";
import axios from "axios";
import PostForm from "./components/PostForm";
import { API_URL } from "./api";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState("");
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(API_URL);
      setPosts(response.data.data || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Backend is offline or unreachable");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostCreated = (createdPost) => {
    setPosts((currentPosts) => [createdPost, ...currentPosts]);
  };

  const handleDelete = async (postId) => {
    setDeletingId(postId);
    setError("");

    try {
      await axios.delete(`${API_URL}/${postId}`);
      setPosts((currentPosts) => currentPosts.filter((post) => post._id !== postId));
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete post");
    } finally {
      setDeletingId("");
    }
  };

  return (
    <div className="page-shell">
      <header className="hero card">
        <div>
          <p className="eyebrow">MongoDB Post Studio</p>
          <h1>Publish, review, and manage posts in one clean workspace.</h1>
          <p className="hero-copy">
            A polished React interface connected to your local Node.js API, with instant create, delete, and refresh flows.
          </p>
        </div>

        <div className="hero-metrics">
          <div className="metric">
            <span className="metric-value">{posts.length}</span>
            <span className="metric-label">Total posts</span>
          </div>
          <div className="metric">
            <span className="metric-value">{loading ? "..." : "Live"}</span>
            <span className="metric-label">Feed status</span>
          </div>
          <div className="metric">
            <span className="metric-value">{error ? "Issue" : "Ready"}</span>
            <span className="metric-label">Connection</span>
          </div>
        </div>
      </header>

      <section className="dashboard-grid">
        <PostForm onPostCreated={handlePostCreated} />

        <div className="posts-section card">
          <div className="section-header">
            <div>
              <p className="section-kicker">Latest feed</p>
              <h2 className="card-title">Your Posts</h2>
            </div>
            <button className="btn ghost" type="button" onClick={fetchPosts} disabled={loading}>
              {loading ? "Loading..." : "Refresh"}
            </button>
          </div>

          {error && <div className="toast error">{error}</div>}

          {loading ? (
            <div className="empty-state">Loading posts...</div>
          ) : posts.length === 0 ? (
            <div className="empty-state">No posts yet. Create one above.</div>
          ) : (
            <div className="post-grid">
              {posts.map((post) => (
                <article className="post-item" key={post._id}>
                  <div className="post-item-head">
                    <h3>{post.title}</h3>
                    <button
                      className="btn danger"
                      type="button"
                      onClick={() => handleDelete(post._id)}
                      disabled={deletingId === post._id}
                    >
                      {deletingId === post._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                  <p>{post.content}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
