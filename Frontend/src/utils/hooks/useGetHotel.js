import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetHotel } from "@/services-new/hotel";
import GetHotels from "@/services-new/hotel/GetHotels";
export default function useGetHotel() {
  const [hotels, setHotels] = useState([]);
  const [ hotel,setHotel]= useState({})
  const [filter,setFilter]=useState();
  const hotelsQuery= useQuery({
  queryKey:["gethotels"],
  queryFn:GetHotels,
  onSuccess: (data)=>{
    console.log(data.hotels);    
    setHotels(data.hotels);
}
  });
  const {mutate:getHotelbyId, isLoading:queryLoading}= useMutation({mutationKey:["mutate"],
   mutationFn:(id)=>GetHotel(id),
   onSuccess:(data)=>{
    setHotel(data.hotel);
    // console.log(data);  
   }
});
  return {hotelsQuery,setFilter,hotel,hotels,setHotel,getHotelbyId,};
}
