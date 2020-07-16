import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth/authState";
import { auth } from "../firebase/firebase.utils";

const UserAccount = () => {
  const {
    authState: { currentUser },
  } = useContext(AuthContext);

  const renderUserAvatar = () =>
    currentUser ? (
      <div onClick={() => setUserMenu(!userMenu)} className="cursor-pointer">
        {currentUser.photoURL ? (
          <img
            className="h-12 w-12 m-2 rounded-full"
            src={currentUser.photoURL}
            alt="user"
          />
        ) : (
          <div className="h-12 w-12 m-2 rounded-full bg-indigo-500 text-white flex justify-center items-center text-xl border border-white">
            {currentUser.displayName.charAt(0)}
          </div>
        )}
      </div>
    ) : (
      <img src="./loading.gif" alt="loading" />
    );

  const [userMenu, setUserMenu] = useState(true);

  return (
    <div className="absolute right-0 top-0 flex">
      {renderUserAvatar()}
      {/* <i
        onClick={() => auth.signOut()}
        className="text-white fa fa-sign-out fa-2x mt-3 mr-5 cursor-pointer transform hover:scale-110"
      ></i> */}
      <div className={`logout-menu ${userMenu && "hidden"}`}>
        <i
          onClick={() => setUserMenu(!userMenu)}
          className="fa fa-window-close absolute top-0 right-0 cursor-pointer"
        ></i>
        <div className="text-center py-2 border-b bg-gray-400">
          {currentUser && currentUser.displayName}
        </div>
        <div onClick={() => auth.signOut()} className="cursor-pointer">
          Logout
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
