import { useState } from "react";
import {auth, db} from "../fireBase";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";

function Login()
{
    const navigate = useNavigate();
    const [Loading, setLoding] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoding(true);
        if(!email || !password)
        {
            toast.error("Please fill all the fields");
            setLoding(false);
            return;
        }
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if(userDoc.exists()){
                const userData = userDoc.data();
                if(userData.role === "admin"){
                    navigate("/admin");
                } else {
                    navigate("/student");
                }
            }
            else {
                toast.error("No user data found");
            }
           }
            catch (error) {
            console.error("Error logging in:", error);
            toast.error(error.message);
            }
            finally {
                setLoding(false);
            }
        };
        if (Loading) {
        return <Spinner />;
    }
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-sm w-full max-w-sm">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                Login
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                <label className="block text-sm text-gray-600 mb-1">
                    Your email
                </label>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                </div>

                <div>
                <label className="block text-sm text-gray-600 mb-1">
                    Your password
                </label>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                </div>

                <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                {Loading ? "Loading..." : "Login"}
                </button>
            </form>

            <div className="text-center text-sm text-gray-600 mt-4">
                Don’t have an account?
                <button
                onClick={() => navigate("/register")}
                className="text-blue-600 ml-1 hover:underline"
                >
                Register here
                </button>
            </div>
            </div>
        </div>
        );

}

export default Login;