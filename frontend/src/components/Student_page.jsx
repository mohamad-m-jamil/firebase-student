import { useEffect, useState } from "react";
import {auth, db} from "../fireBase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Spinner from "../components/Spinner";

function Student_page()
{
    const [studentData, setStudentData] = useState(null);
    const [Loading, setLoading] = useState(true);
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                console.log("No user logged in");
                setLoading(false);
                return;
            }
            try {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if(userDoc.exists()){
                    setStudentData(userDoc.data());
                }
            } catch (error) {
                console.error("Error fetching student data:", error);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (Loading) {
        return <Spinner />;
    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Student Page
            </h2>

            <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg text-gray-600">
                Welcome <span className="font-medium text-gray-800">
                {studentData.first_name} {studentData.last_name}
                </span>
            </h3>
            </div>
        </div>
    );
}

export default Student_page;