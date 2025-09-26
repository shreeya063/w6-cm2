import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignupPage = ({setIsAuthenticated}) => {
  const navigate = useNavigate();
  const{signup}= useSignup();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("Male");
  const [dob, setDob] = useState("");
  const [membership, setMembership] = useState("VIP");

  const submitForm = async (e) => {
    e.preventDefault();

    const newUser ={
        name,
        email,
        password,
        phone_number: phone,
        gender,
        date_of_birth: dob,
        membership_status: membership,
    };

    const success = await signup(newUser);

    if (success){
        toast.success("Signup successful!");
        setIsAuthenticated(true);
        navigate("/");
    }
  };

  return(
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">Sign Up</h2>

            {/* Name */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Full Name</label>
              <input
                type="text"
                required
                className="border rounded w-full py-2 px-3"
                placeholder="Firstname Lastname"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="example@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Password</label>
              <input
                type="password"
                required
                className="border rounded w-full py-2 px-3"
                placeholder="Enter a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Phone Number</label>
              <input
                type="tel"
                required
                className="border rounded w-full py-2 px-3"
                placeholder="(123) 456-7890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Gender</label>
              <select
                className="border rounded w-full py-2 px-3"
                value={gender}
                required
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer Not to Say">Prefer Not to Say</option>
              </select>
            </div>

            {/* DOB */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Date of Birth</label>
              <input
                type="date"
                required
                className="border rounded w-full py-2 px-3"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>

            {/* Membership */}
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">Membership Status</label>
              <select
                className="border rounded w-full py-2 px-3"
                value={membership}
                onChange={(e) => setMembership(e.target.value)}
              >
                <option value="Free">Free</option>
                <option value="Premium">Premium</option>
                <option value="VIP">VIP</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign Up
            </button>
        </form>
    </div>
    </div>
    </section>
  );
};

export default SignupPage;