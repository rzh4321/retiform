"use client";

import FriendCard from "./FriendCard";
import { useEffect, useState, useRef } from "react";

export default function FriendsSection({ friends, heading }) {
  // we need prevFriends to make sure useEffect calls setFriendObjs if search filter changes and we're still on
  // this route. This is because if we still on this route and filter changes, we need a way to call setFriendObjs
  // to update displayed users. One way is to see if filter has changed from last render. The "friends" prop is
  // directly determined by filter, so we use useRef to store prev "friends" prop (which represents prev filter)

  // useEffect(() => {
  //   if (
  //     typeof friends === "string" &&
  //     (friendObjs === null || prevFriends.current != friends)
  //   ) {
  //     setFriendObjs(JSON.parse(friends));
  //   } else if (friendObjs === null || typeof friends === "object") {
  //     setFriendObjs(friends);
  //   }
  //   prevFriends.current = friends;
  // }, [friends, friendObjs]);
  useEffect(() => {
    console.log(friends);
  }, [friends]);
  let arr;
  if (friends?.length > 0) {
    arr = friends.map((user) => <FriendCard key={user._id} user={user} />);
  }

  return (
    <ul className={`ps-0 mx-auto user-card`}>
      <h1 className="fs-3 mb-0">{heading}</h1>
      {arr}
    </ul>
  );
}
