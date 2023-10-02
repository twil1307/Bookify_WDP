import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { UserContext } from "@/utils/contexts";

import { AddFavorite } from ".";
export default function useUser() {
  const [userData, setUserData] = useState(); 
  const queryClient = useQueryClient();
  const { user } = useContext(UserContext);
  // console.log(user);
  const _id = user._id;
  const { isLoading, data } = useQuery({
    queryKey: ["fetchUser", _id],
    queryFn: () => {},
    onSuccess: (data) => {
      // console.log(data);
      setUserData(data);
    },
  });
  const { mutate: updateUser } = useMutation({
    mutationKey: ["update user", user._id],
    mutationFn: (userForm) => {},
    onSuccess: async (data, variables) => {
      if (!data) {
      }
      await queryClient.refetchQueries({ queryKey: ["posts"], type: "active" });
    },
  });
  const { mutate: updatePass } = useMutation({
    mutationKey: ["update-password"],
    mutationFn: (pass) =>{},
  });
  const { mutate: updateCard } = useMutation({
    mutationKey: ["update-Card_number"],
    mutationFn: (number) => {},
  });
  const {mutate:addBookmarked}= useMutation({
    mutationKey:["add-bookmarked"],
    mutationFn:(_id)=>{}
  })
  const {mutate:getBookingHistory}= useMutation({mutationKey:["booking-history:",_id],mutationFn:(filter)=>{}});

  return {
    isLoading,
    updateUser,
    userData,
    setUserData,
    updatePass,
    updateCard,
    addBookmarked,getBookingHistory
  };
}
