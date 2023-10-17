import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
export default function useGetHotel() {
  const [hotels, setHotels] = useState([]);
  const [ hotel,setHotel]= useState({})
  const [filter,setFilter]=useState();
  const hotelsQuery= useQuery({
  queryKey:["gethotels"],
  queryFn:()=>{},
  onSuccess: (data)=>{
    console.log(data.hotels);    
    setHotels(data.hotels);
}
  });
  const {mutate:getHotelbyId, isLoading:queryLoading}= useMutation({mutationKey:["mutate"],
   mutationFn:(id)=>{},
   onSuccess:(data)=>{
    setHotel(data.hotel);
    // console.log(data);  
   }
});
  return {hotelsQuery,setFilter,hotel,hotels,setHotel,getHotelbyId,};
}
