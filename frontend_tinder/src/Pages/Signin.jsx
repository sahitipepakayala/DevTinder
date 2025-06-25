import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addUser } from '../Store/userSlice';
import BackendUrl from '../Constants/BackendUrl';
import { useNavigate, Link } from 'react-router-dom';

function Signin() {
  const user = useSelector((store) => store.user);
  const [firstName, setFirst] = useState("");
  const [lastName, setLast] = useState("");
  const [about, setAbout] = useState("");
  const [age, setAge] = useState(18);
  const [gender, setGender] = useState("male");
  const [image, setImage] = useState("");
  const [skills, setSkills] = useState([]);
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error1, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    console.log("Sign in button clicked");

    // Basic validation
    if (!emailId || !password || !firstName || !lastName) {
      setError("Please fill all required fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password should be at least 6 characters long.");
      return;
    }

    try {
      const res = await axios.post(
        BackendUrl + "/signup",
        { firstName, lastName, emailId, password, about, age, skills, image, gender },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      console.log(res.data);

      if (res.data) {
        navigate("/profile");
      }
    } catch (error) {
      console.log(error.response?.data);
      setError(error.response?.data || "Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    if (user) {
      setFirst(user.firstName || "");
      setLast(user.lastName || "");
      setAbout(user.about || "");
      setAge(user.age || 19);
      setGender((user.gender || "male").toLowerCase());
      setImage(user.image || "");
      setSkills(user.skills || []);
      setEmail(user.emailId || "");
      setPassword(""); // Don't prefill password
    }
    setLoading(false);
  }, [user]);

  if (loading) return <h1 className='text-center text-2xl'>Loading user profile...</h1>;

  return (
    <div className='flex justify-center min-h-screen pb-20 gap-14 mb-10'>
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="flex justify-center card-title items-center text-2xl">Sign Up Here!</h2>

          <fieldset className="fieldset">
            <legend className="fieldset-legend text-lg font-normal">First Name:</legend>
            <input type="text" className="input h-12 text-lg" placeholder='Enter First Name' value={firstName} onChange={(e) => setFirst(e.target.value)} />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend text-lg font-normal">Last Name:</legend>
            <input type="text" className="input h-12 text-lg" placeholder='Enter Last Name' value={lastName} onChange={(e) => setLast(e.target.value)} />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend text-lg font-normal">Email Id:</legend>
            <input type="text" className="input h-12 text-lg" placeholder="Email ID" value={emailId} onChange={(e) => setEmail(e.target.value)} />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend text-lg font-normal">Password:</legend>
            <input type="password" className="input h-12 text-lg" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </fieldset>

          <div className="flex gap-6 mt-4">
            <div className="fieldset flex-1">
              <legend className="fieldset-legend text-lg font-normal">Age:</legend>
              <input type="number" className="input h-12 text-lg w-full" value={age} placeholder='Enter Age' onChange={(e) => setAge(Number(e.target.value))} />
            </div>

            <div className="fieldset flex-1">
              <legend className="fieldset-legend text-lg font-normal">Gender:</legend>
              <select className="input h-12 text-lg w-full" value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>
          </div>

          <fieldset className="fieldset">
            <legend className="fieldset-legend text-lg font-normal">About:</legend>
            <textarea rows="3" cols="20" className="input h-12 text-lg" placeholder="Tell us about yourself" value={about} onChange={(e) => setAbout(e.target.value)} />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend text-lg font-normal">Skills:</legend>
            <input type="text" className="input h-12 text-lg" placeholder="Enter Skills (comma separated)" value={skills.join(', ')} onChange={(e) => setSkills(e.target.value.split(',').map(skill => skill.trim()))} />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend text-lg font-normal">Image URL:</legend>
            <input type="text" className="input h-12 text-lg" placeholder="Enter Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
          </fieldset>

          <p className='text-lg mt-2'>Already have an account? <Link className='text-blue-400' to="/login">Log In</Link></p>

          <p className='text-red-500 text-xl mt-3'>{error1}</p>

          <div className="card-actions justify-center">
            <button className="btn btn-primary mt-10 block" onClick={handleSignIn}>Create Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
