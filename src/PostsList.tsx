import { useEffect, useRef, useState } from 'react';
import { fetchPosts, Post } from './services/api';

type PostCardProps = {
  title: string;
  text: string;
  author: number;
}

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

let isCalled = false;
const throttle = (fn: (a: number) => any, delay = 1000) => {
  if (isCalled) return;
  isCalled = true;
  return (...args: any) => {
    fn(args);
    setTimeout(()=>{
      isCalled = false;
    }, delay);
  }
}

export default function PostLists() {
  const [data, setData] = useState<Post[]>([] as Post[]);
  const scroller = useRef<HTMLDivElement|null>(null);
  const [isScrolled, setIsScrolled]  = useState(false);
  const [pageNum, setPageNum] = useState(1);


  const fetchCurrentPost = async (num: number) => {
    try {
    const result = await fetchPosts(num);
    console.log({result});
    setData(data.concat(result));
    } catch(e: unknown) {
      console.log('error while fetching ==>', (e as Error).message)
    }
    finally {
      console.log('inside finally', isScrolled);
      setIsScrolled(false);
    }
  };



  const handleScroll = (e: any) => {
    const { clientHeight, offsetHeight, scrollHeight, scrollTop} = e.target;
    const totalHeight = offsetHeight + scrollTop ;
    const heightDiff = Math.abs(scrollHeight - totalHeight);
    document.body.style.setProperty('--scroll', heightDiff.toString() );
    if(heightDiff <= 50) {
      console.log({clientHeight, offsetHeight, scrollHeight, scrollTop});
      setIsScrolled(true);
      setPageNum(pageNum+1);
    }
  };

  useEffect(()=>{
    scroller?.current?.addEventListener("scroll", handleScroll, false);
    throttle(fetchCurrentPost(pageNum) as any, 10_000);
    return () =>  scroller?.current?.removeEventListener("scroll", handleScroll);
  }, [pageNum])

  return (
    <div className="post-list" ref={scroller} > 
    {data.map((d, i)=> <PostCard key={i} title={d.title} text={d.body} author={d.userId}/>)}
    </div>
  );
}
