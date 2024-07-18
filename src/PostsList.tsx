import { useEffect, useState } from "react";
import { fetchPosts } from "./services/api";

function PostCard({ title, text, author }) {
  return (
    <article className="post">
      <h2>title</h2>
      <p>text</p>
      <footer>
        <span>author</span>
      </footer>
    </article>
  );
}

export default function PostLists() {
  return (
    <div className="post-list"> 
      {/* Render PostCard(s) here */}
    </div>
  );
}
