# Self-Assessment

## Implements and Improvements ##
### 1. Improve State Management ###

**Issue:**  
Initially, our signup form was functional but lacked proper handling of user feedback and authentication persistence. The form would submit data, but users had no clear feedback on success/failure, and authentication state wasn’t tracked globally.  

**Original Concept:**
```//Signup.jsx
const submitForm = async (e) => {
  e.preventDefault();
  const newUser = { name, email, password, phone, gender, date_of_birth: dob, membership_status: membership };
  await signup(newUser);
  navigate("/");
};
```
To address this issue, we refactored the code 

**Refactored Concept:**
```//Signup.jsx
const submitForm = async (e) => {
  e.preventDefault();

  const newUser = {
    name, email, password,
    phone_number: phone, gender,
    date_of_birth: dob, membership_status: membership
  };

  const data = await signup(newUser);

  if (data) {
    toast.success("Signup successful!");
    setIsAuthenticated(true);
    navigate("/");
  }
};
```

**Key Improvements:**
- User Feedback: Integrated `react-toastify` for success/error messages.
- Authentication State: Updated `setIsAuthenticated(true)` upon successful signup.
- Navigation: Redirected users to the homepage after signup.
- UX Clarity: Form inputs remain unchanged on failure; prevents user confusion.

### 2. Modularizing Authentication with a Custom Hook ###

**Issue:**  
Signup logic was initially embedded in the component and did not handle errors, local storage, or user session persistence. 

**Original Concept:**
```
    //useSignup.js
const signup = async (newUser) => {
  const res = await fetch("/users/signup", {...});
  return res.ok;
};

```
To address this issue, we refactored the code 

**Refactored Concept:**
```
    //useSignup.js
export const useSignup = () => {
  const signup = async (newUser) => {
    try {
      const res = await fetch("/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

```

**Key Improvements:**
- Error Handling: Provides clear messages using toast.error for failed requests.
- Session Persistence: Stores user and token in localStorage for subsequent authenticated requests.
- Reusability: Encapsulates API call logic in a custom hook (useSignup) for clean separation of concerns.
- Return Data: Returns user data upon success, allowing the component to update state accordingly.

### Lesson Learned: ###
This coding marathon was a great learning experience for me on the frontend side. Working on the signup form and the `useSignup` hook helped me understand state management, authentication, and session persistence. I learned how to modularize frontend logic for better maintainability and how to handle asynchronous requests safely. 
Although we faced some issues during the connection, collaborating with the team allowed us to communicate effectively and ensure smooth integration between frontend and backend. Overall, I feel more confident in building robust, user-friendly interfaces and managing project code in a team setting.