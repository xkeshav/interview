import { useEffect, useRef, useState } from 'react';
import { fetchChars, fetchPosts, Post } from './services/api';

type PostCardProps = {
  title: string;
  text: string;
  author: number;
}

const MIN_HEIGHT = 200;

function PostCard({ title, text, author }: PostCardProps) {
  return (
    <article className="post scroll" >
      <h2>{title}</h2>
      <p>{text}</p>
      <footer>
        <span>{author}</span>
      </footer>
    </article>
  );
}

const doThrottle = (fn: any, wait = 3000) => {
  let isWaiting = false;
  return (...args: any) => {
    if (!isWaiting) {
      fn(args);
      isWaiting = true;
      setTimeout(() => {
        console.log('setTimeout called', { args }, new Date());
        isWaiting = false;
      }, wait);
    }
  };
}

const PostList = () => {
    const [data, setData] = useState<Post[]>([] as Post[]);
    const [isScrolled, setIsScrolled] = useState(false);
    const scroller = useRef<HTMLDivElement | null>(null);
    const [pageNum, setPageNum] = useState(1);

    const fetchCurrentPost = async (num: number) => {
      try {
        const result = await fetchChars(num);
        console.log({ result });
        setData(data.concat(result));
        setIsScrolled(false);
      } catch (e: unknown) {
        console.log('error while fetching ==>', (e as Error).message)
      }
      finally {
        console.log('inside finally');
        setIsScrolled(false);
      }
    };

    const handleScroll = (e: Event) =>  {
      const { offsetHeight, scrollHeight, scrollTop } = e.target as HTMLDivElement;
      console.log({ offsetHeight, scrollHeight, scrollTop });

      const totalHeight = offsetHeight + scrollTop;
      const heightDiff = Math.abs(scrollHeight - totalHeight);
      console.log({offsetHeight, heightDiff, isScrolled});
      document.body.style.setProperty('--scroll', heightDiff.toString());
      if (heightDiff <= MIN_HEIGHT && !isScrolled) {
        setPageNum(pageNum + 1);
      }
    };

    useEffect(() => {
      scroller?.current?.addEventListener("scroll", handleScroll, false);
      fetchCurrentPost(pageNum);
      setIsScrolled(true);
      return () => scroller?.current?.removeEventListener("scroll", handleScroll);
    }, [pageNum])

    return (
      <div className="post-list" ref={scroller} >
        {data.map((d, i) => <PostCard key={i} title={d.title} text={d.body} author={d.userId} />)}
      </div>
    );
  }

  export { PostList }