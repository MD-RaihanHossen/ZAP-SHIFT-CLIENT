import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import AuthContextHook from "./AuthContextHook";

const UseAdminHook = () => {
  const axiosSecure = useAxiosSecure();
  const { user , loader} = AuthContextHook();

  // ✅ Only run query if user is logged in
  const { data: isAdmin = false, isLoading, refetch } = useQuery({
    queryKey: ["isAdmin", user?.email],
    enabled: !!user?.email && !loader, // runs only when user email is available
    queryFn: async () => {
      // 🔹 Fetch user data from backend using email
      const res = await axiosSecure.get(`/userdata/${user?.email}`);
      // You can also check in riders if needed
      // const resRider = await axiosSecure.get(`/userriders/${user?.email}`);

      const person = res.data;
      // Return true if roll === "admin"
      if(person?.roll === "admin"){
        return person
      }
    },
  });

  return [isAdmin, isLoading, refetch];

//   console.log(isAdmin)

};



export default UseAdminHook;


//1 first jai button gula mai dekhaite chai na ta hide korbo that roll === "admin" chara keo dekhte parbe 

//2nd step hobe akta privet route banano and shetar condition diye deya
//3rd holo amake middle ware banate hobe server a and shekhane conditionaly check korte hobe then 
//4 jekhan theke axiosSecure use hook banaichilam shekhane headers a token add kore dichilam sekhane response ja asbe ta kichu error handle korte hobe