import { toast } from "react-toastify";

export const useSignup = () => {
  const signup = async (newUser) => {
    try {
      const res = await fetch("http://localhost:4000/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Signup failed");

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      return data;
    } catch (error) {
      toast.error(error.message || "Signup failed. Please try again.");
      return null;
    }
  };

  return { signup };
};
