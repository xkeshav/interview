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

export default function PostLists() {
  const [data, setData] = useState<Post[]>([] as Post[]);
  const scroller = useRef<HTMLDivElement|null>(null);
  const [isScrolled, setIsScrolled]  = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const fetchRequestRef = useRef(true);
  const pageNumRef = useRef(1);


  const fetchCurrentPost = async (num: number) => {
    const result = await fetchPosts(num);
    console.log({result});
    setData(data.concat(result));
    fetchRequestRef.current = true;
  };

  const handleScroll = (e: any) => {
    const { clientHeight, offsetHeight, scrollHeight, scrollTop} = e.target;
    console.log({clientHeight, offsetHeight, scrollHeight, scrollTop});
    const totalHeight = offsetHeight + scrollTop ;
    const heightDiff = Math.abs(scrollHeight - totalHeight);
    console.log({heightDiff});
    document.body.style.setProperty('--scroll', heightDiff.toString() );
    if(!isScrolled && heightDiff < 50) {
      console.log('do fetch');
      // FIX: still calling fetch call 2 3 times
      if(fetchRequestRef.current) fetchRequestRef.current = false;
      setPageNum(pageNum+1);
      //setIsScrolled(true);
    }
    setIsScrolled(false);
    // Adding timeout doesn't work
    //setTimeout(() => {
    //  setIsScrolled(false);
    //}, 1);
  }

  useEffect(()=>{
    scroller?.current?.addEventListener("scroll", handleScroll, false);
    fetchCurrentPost(pageNum);
    return () =>  scroller?.current?.removeEventListener("scroll", handleScroll);
  }, [pageNum])

  return (
    <div className="post-list" ref={scroller} > 
    {data.map((d, i)=> (
      <PostCard key={i} title={d.title} text={d.body} author={d.userId}/>
    ))}
    </div>
  );
}
