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
  const [pageNum, setPageNum] = useState(1);
  const ref = useRef<any>();
  

  useEffect(()=>{
    console.log(ref && ref.current);
  }, [ref]);

  const fetchCurrentPost = async (num: number) => {
    const result = await fetchPosts(num);
    setData(data.concat(result));
  };

  const handleScroll = (e: any) => {
    const { clientHeight, offsetHeight, scrollHeight, scrollTop} = e.target;
    //console.log(ref?.current)
    console.log({clientHeight, offsetHeight, scrollHeight, scrollTop});
    //console.log(scrollHeight - (scrollTop + offsetHeight));
    if(scrollHeight - (scrollTop + offsetHeight)  < 40) {
      console.log('do fetch');
      setPageNum(pageNum+1);
    }
  }

  useEffect(()=>{
    fetchCurrentPost(pageNum);
  }, [pageNum])

  return (
    <div className="post-list" ref={ref} onScroll={handleScroll}> 
    {data.map((d, i)=> (
      <PostCard key={i} title={d.title} text={d.body} author={d.userId}/>
    ))}
    </div>
  );
}
