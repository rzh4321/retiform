'use client'
import { getUsersFromFilter } from "../../../actions";
import FriendsSection from "../../../components/FriendsSection";
import { useState, useEffect } from "react";

// async function getUsersFromFilter(filter, userId) {
//   const regex = new RegExp(`^${filter}`, "i"); // 'i' makes the search case-insensitive
//   const names = await User.find({ name: regex, _id: { $ne: userId } });
//   const usernames = await User.find({ username: regex, _id: { $ne: userId } });
//   const res = [...names];
//   const seenIds = new Set(names.map((obj) => obj._id.toString()));
//   // make sure there are no duplicate users
//   for (const obj of usernames) {
//     if (!seenIds.has(obj._id.toString())) {
//       seenIds.add(obj._id.toString());
//       res.push(obj);
//     }
//   }
//   return res;
// }

export default function Search({ searchParams }) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function setState(filter, userId) {
      const arr = await getUsersFromFilter(filter, userId);
      setUsers(JSON.parse(arr));
    }
    setState(searchParams.filter, searchParams.userId);
  }, [searchParams]);

  return (
    <div className="container">
      <FriendsSection
        friends={users}
        heading={`Results for "${searchParams.filter}"`}
      />
    </div>
  );
}
