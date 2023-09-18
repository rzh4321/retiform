'use client'

import ProfileSection from "../../../components/ProfileSection";
import HomeFeed from "../../../components/HomeFeed";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

// async function findUser(userId) {
//   const user = await User.findById(userId);
//   return user;
// }

// async function getPosts(userId) {
//   try {
//     let posts = await fetch(
//       `https://social-media-eight-rho.vercel.app/api/users/${userId}/posts`,
//     );
//     posts = posts.json();
//     return posts;
//   } catch (err) {
//     //console.log("error fecthing users posts: ", err);
//     throw new Error(err);
//   }
// }

export default function ProfilePage({ params }) {
  const { data: session, status } = useSession();
  const [postsData, setPostsData] = useState([]);
  const [user, setUser] = useState();
  useEffect(() => {
    if (status === 'loading') return
    async function setStates() {
      let res = await fetch(`/api/users/${session.user.userId}`);
      let data = await res.json();
      setUser(data.user);
      res = await fetch(`/api/users/${session.user.userId}/posts`);
      data = await res.json();
      setPostsData(data.posts);
    }
    setStates();
  }, [session, status]);

  return (
    <div className="mt-4">
      <ProfileSection userData={user} edit={true} />
      <HomeFeed feedType={"profile"} postsData={postsData} />
    </div>
  );
}
