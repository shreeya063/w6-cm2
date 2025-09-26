import { useState } from "react";
import { toast } from "react-toastify";

export const useSignup = () => {

    const signup = async(newUser)=> {
        try {
            const res = await fetch("/api/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            body: JSON.stringify(newUser),
        });

      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem("data", JSON.stringify(data));
        return true;
      } else {
        toast.error(data.message || "Signup failed");
        return false;
      }

    } catch (error) {
      console.error(error);
      toast.error("Signup failed.Please try again.");
      return false;
    }
  };

  return{signup};
};