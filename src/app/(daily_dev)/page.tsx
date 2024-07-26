import { getPosts } from "../dataFetch/postFetch";
import { getServerSession } from "next-auth";
import {
  authOptions,
  CustomSession,
  CustomUser,
} from "../api/auth/[...nextauth]/authOptions";
import { json } from "node:stream/consumers";
import Posts from "@/components/post/Posts";
export default async function App() {
  const session: CustomSession | null = await getServerSession(authOptions);

  const posts: APIResponseType<PostType> = await getPosts(
    session?.user?.token!
  );
  console.log("posts", posts);

  return (
    <div>
      <Posts data={posts} />
    </div>
  );
}
