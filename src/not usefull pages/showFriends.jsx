/*
const FriendCard = ({ name, friends, _id }) => {
  return (
    <div className="friend-card">
      <h3>{name}</h3>
      <h4>{_id}</h4>
      {friends.length === 0 ? (
        <p>No friends!!</p>
      ) : (
        <div>
          {friends.map((friend) => (
            <>
              <h4>friend</h4>
              <p>, </p>
            </>
          ))}
        </div>
      )}
    </div>
  );
};
function showFriends() {
  console.log("inside showFriends");
  return (
    <div className="friends-list">
      {friends.length === 0 ? (
        <p>No Friends available.</p>
      ) : (
        friends.map((friend, index) => (
          <FriendCard
            name={friend.name}
            friends={friend.friends}
            _id={friend._id}
            key={friend._id}
          />
        ))
      )}
    </div>
  );
}
  */
// Define FriendCard as a separate functional component
import React from "react";
const FriendCard = ({ name, friends, _id }) => {
  return (
    <div className="friend-card">
      <h3>{name}</h3>
      <h4>{_id}</h4>
      {friends.length === 0 ? (
        <p>No friends!!</p>
      ) : (
        <div>
          {friends.map((friend, index) => (
            <div key={index}>
              {/* Ensure each element in the list has a unique key {/* Example of rendering a friend's name */}

              <h4>{friend}</h4>
              <p>, </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Define showFriends component
/*
ShowFriends.defaultProps = {
  friends: [],
};
*/ function ShowFriends({ friends }) {
  console.log("inside showFriends");
  return (
    <>
      {friends ? (
        friends.length === 0 ? (
          <p>No Friends available.</p>
        ) : (
          friends.map((friend) => (
            <FriendCard
              name={friend.name}
              friends={friend.friends}
              _id={friend._id}
              key={friend._id}
            />
          ))
        )
      ) : (
        <p>Friends data is undefined.</p>
      )}
    </>
  );
}

// Export ShowFriends as default
export default ShowFriends;
