import { useState } from "react";
import {auth, db} from "../fireBase";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";



function Register()
{
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        student_id: "",
        first_name: "",
        last_name: "",
        birthday: "",
        email: "",
        phone_number: "",
        password: "",
        confirm_password: ""
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }
    const [loding, setLoding] = useState(false);
    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoding(true);

        const {
            student_id,
            first_name,
            last_name,
            birthday,
            email,
            phone_number,
            password,
            confirm_password
        } = formData;

        if (
            !student_id ||
            !first_name ||
            !last_name ||
            !birthday ||
            !email ||
            !phone_number ||
            !password ||
            !confirm_password
        ) {
            alert("Please fill all the fields");
            setLoding(false);
            return;
        }
        if (formData.password !== formData.confirm_password) {
        alert("Passwords do not match");
        setLoding(false);
        return;
      }
      
      try {
        const userCredential =  await createUserWithEmailAndPassword(
            auth, email, password
        );
        const user = userCredential.user;
        console.log("User registered:", user.uid);
        await setDoc(doc(db, "users", user.uid), {
            student_id,
            first_name,
            last_name,
            birthday,
            email,
            phone_number,
            role: "student",
            createdAt: new Date()
        });
        alert("Registration successful!");
        navigate("/login");
      }
        catch (error) {
        console.error("Error registering user:", error);
        alert("Error registering user: " + error.message);
      }
      setLoding(false);

    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-sm w-full max-w-md  my-10">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                Student Register
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                <label className="block text-sm text-gray-600 mb-1">Student ID</label>
                <input
                    type="text"
                    name="student_id"
                    placeholder="Enter student id"
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                </div>

                <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm text-gray-600 mb-1">First Name</label>
                    <input
                    type="text"
                    name="first_name"
                    placeholder="First name"
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-600 mb-1">Last Name</label>
                    <input
                    type="text"
                    name="last_name"
                    placeholder="Last name"
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                </div>

                <div>
                <label className="block text-sm text-gray-600 mb-1">Birthday</label>
                <input
                    type="date"
                    name="birthday"
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                </div>

                <div>
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                </div>

                <div>
                <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
                <input
                    type="tel"
                    name="phone_number"
                    placeholder="Enter phone number"
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                </div>

                <div>
                <label className="block text-sm text-gray-600 mb-1">Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                </div>

                <div>
                <label className="block text-sm text-gray-600 mb-1">
                    Confirm Password
                </label>
                <input
                    type="password"
                    name="confirm_password"
                    placeholder="Confirm password"
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                </div>

                <button
                type="submit"
                disabled={loding}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                >
                {loding ? "Loading..." : "Register"}
                </button>
            </form>

            <div className="text-center text-sm text-gray-600 mt-4">
                Already have an account?
                <button
                onClick={() => navigate("/login")}
                className="text-blue-600 ml-1 hover:underline"
                >
                Login here
                </button>
            </div>
            </div>
        </div>
        );

}

export default Register;