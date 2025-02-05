"use client";

import React from "react";
import { useUser } from "@/hooks/use-user";
import { Loader } from "../loader";

const IdCard = () => {
  const { user } = useUser();

  if (!user) {
    return (
      <div>
        <Loader loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col border rounded-2xl shadow-md max-w-2xl mx-auto">
      <div className="flex flex-col py-5 px-2 lg:px-5 lg:flex-row items-center justify-center lg:justify-between gap-6 ">
        <div className="flex w-72 h-72 items-center justify-center overflow-hidden rounded-full">
          {user.profilePic ? (
            <img
              src={user.profilePic}
              alt="Profile Picture"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600">No Image</span>
            </div>
          )}
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <p className="text-xl font-semibold tracking-wide mb-4 hidden lg:block">
            Empoyee Details
          </p>
          <table className="w-full border-collapse border text-left text-sm lg:text-[14px]">
            <tbody>
              <tr className="border-b">
                <td className="p-2 border-r font-medium">Full Name</td>
                <td className="p-2">{user.fullName}</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 border-r font-medium">Email</td>
                <td className="p-2">{user.email}</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-5 lg:mt-12">
            <table className="w-full border-collapse border border-primary/25 text-left text-sm lg:text-[14px]">
              <tbody>
                <tr className="border-b">
                  <td className="p-2 border-r font-medium">Issue Date:</td>
                  <td className="p-2">{user.createdAt.slice(0, 10)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="text-xs flex items-center justify-center mb-2">
        <p>This Id was issued by E.L.S</p>
      </div>
    </div>
  );
};

export default IdCard;
