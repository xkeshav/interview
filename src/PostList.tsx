import { useEffect, useRef, useState } from 'react';
import { fetchPosts, Post } from './services/api';

type PostCardProps = {
  title: string;
  text: string;
  author: number;
};

const MIN_HEIGHT = 200;

function PostCard({ title, text, author }: PostCardProps) {
  return (
    <article className="post scroll">
      <h2>{title}</h2>
      <p>{text}</p>
      <footer>
        <span>{author}</span>
      </footer>
    </article>
  );
}

const PostList = () => {
  const [data, setData] = useState<Post[]>([] as Post[]);
  const scroller = useRef<HTMLDivElement | null>(null);
  const [pageNum, setPageNum] = useState(1);
  const isScrolledRef = useRef(false); // Use ref to track scrolling state

  const fetchCurrentPost = async (num: number) => {
    try {
      const result = await fetchPosts(num);
      console.log({ result });
      setData((prevData) => prevData.concat(result));
    } catch (e: unknown) {
      console.log('error while fetching ==>', (e as Error).message);
    } finally {
      console.log('inside finally');
      isScrolledRef.current = false; // Reset scrolling state
    }
  };

  const handleScroll = () => {
    if (!scroller.current) return;

    const { offsetHeight, scrollHeight, scrollTop } = scroller.current;
    const totalHeight = offsetHeight + scrollTop;
    const heightDiff = Math.abs(scrollHeight - totalHeight);

    console.log(`%c ${isScrolledRef.current}`, 'font-size:1rem;color:yellow');
    document.body.style.setProperty('--scroll', heightDiff.toString());

    if (heightDiff <= MIN_HEIGHT && !isScrolledRef.current) {
      isScrolledRef.current = true; // Prevent multiple triggers
      setPageNum((prevPageNum) => prevPageNum + 1);
    }
  };

  useEffect(() => {
    const currentScroller = scroller.current;
    if (currentScroller) {
      currentScroller.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (currentScroller) {
        currentScroller.removeEventListener('scroll', handleScroll);
      }
    };
  }, []); // Attach the scroll listener only once

  useEffect(() => {
    fetchCurrentPost(pageNum);
  }, [pageNum]); // Fetch posts when pageNum changes

  return (
    <div id="posts" className="post-list" ref={scroller}>
      {data.map((d, i) => (
        <PostCard key={i} title={d.title} text={d.body} author={d.userId} />
      ))}
    </div>
  );
};

export { PostList };