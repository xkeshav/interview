export type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
};


export async function fetchPosts(pageNo: number, pageSize = 10): Promise<Post[]> {
    const url = new URL("https://jsonplaceholder.typicode.com/posts");
    url.searchParams.append("_page", pageNo.toString());
    url.searchParams.append("_limit", pageSize.toString());
    const res = await fetch(url);
    return res.json();
}
