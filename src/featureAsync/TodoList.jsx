import { Suspense, useState } from "react";
import {
  RecoilRoot,
  atom,
  selector,
  selectorFamily,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
  waitForAll,
} from "recoil";

function myDBQuery(query) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve({
        id: Math.random(),
        name: "aaa",
        friendList: [
          { id: 1, name: "bbb" },
          { id: 2, name: "ccc" },
        ],
      });
    }, 3000);
  });
}

const currentUserIDState = atom({
  key: "CurrentUserID",
  default: 1,
});

const userInfoQuery = selectorFamily({
  key: "UserInfoQuery",
  get: (userID) => async () => {
    const response = await myDBQuery({ userID });
    if (response.error) {
      throw response.error;
    }
    return response;
  },
});

const currentUserInfoQuery = selector({
  key: "CurrentUserInfoQuery",
  get: ({ get }) => get(userInfoQuery(get(currentUserIDState))),
});

const friendsInfoQuery = selector({
  key: "FriendsInfoQuery",
  get: ({ get }) => {
    const { friendList } = get(currentUserInfoQuery);
    // return friendList.map((friendID) => get(userInfoQuery(friendID)));
    return get(
      waitForAll(friendList.map((friendID) => userInfoQuery(friendID)))
    );
  },
});

function SomeContent() {
  console.log(Date.now());
  const currentUser = useRecoilValue(currentUserInfoQuery);
  const friends = useRecoilValue(friendsInfoQuery);
  const setCurrentUserID = useSetRecoilState(currentUserIDState);

  // const currentUser = useRecoilValueLoadable(currentUserInfoQuery);

  // if (currentUser.state === "hasValue") {
  //   return <div>{currentUser.contents.name}</div>;
  // }
  // if (currentUser.state === "loading") {
  //   return <div>loading-some-content</div>;
  // }
  // if (currentUser.state === "hasError") {
  //   return <div>error in SomeContent</div>;
  // }
  return (
    <div>
      <h1>{currentUser.name}</h1>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id} onClick={() => setCurrentUserID(friend.id)}>
            {friend.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TodoList() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SomeContent />
    </Suspense>
  );
}
