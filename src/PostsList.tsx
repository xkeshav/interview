import { useEffect, useRef, useState } from 'react';
import { fetchPosts, Post } from './services/api';

type PostCardProps = {
  title: string;
  text: string;
  author: number;
}

function PostCard({ title, text, author }: PostCardProps) {
  return (
    <article className="post" >
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
  let isScrolled = false;
  const [pageNum, setPageNum] = useState(1);


  const fetchCurrentPost = async (num: number) => {
    const result = await fetchPosts(num);
    console.log({result});
    setData(data.concat(result));
    isScrolled = false;
  };

  const handleScroll = (e: any) => {
    const { clientHeight, offsetHeight, scrollHeight, scrollTop} = e.target;
    console.log({clientHeight, offsetHeight, scrollHeight, scrollTop});
    const totalHeight = offsetHeight + scrollTop ;
    const heightDiff = Math.abs(scrollHeight - totalHeight);
    console.log({heightDiff})
    if(heightDiff < 50) {
      console.log('do fetch');
      // FIX: still calling fetch call 2 3 times
      !isScrolled && setPageNum(pageNum+1);
      isScrolled = true;
    }
    
  }

  useEffect(()=>{
    scroller?.current?.addEventListener("scroll", handleScroll);
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
