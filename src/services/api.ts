export type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

const PAGE_SIZE = 10;

export async function fetchPosts(pageNo: number): Promise<Post[]> {
    const url = new URL("https://jsonplaceholder.typicode.com/posts");
    url.searchParams.append("_page", pageNo.toString());
    url.searchParams.append("_limit", PAGE_SIZE.toString());
    const res = await fetch(url);
    return res.json();
}
