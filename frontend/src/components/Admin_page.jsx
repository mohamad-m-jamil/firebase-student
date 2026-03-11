import { useEffect, useState } from "react";
import { db } from "../fireBase";
import { collection, getDocs, doc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import Spinner from "../components/Spinner";    

function AdminPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const fetchStudents = async () => {
    setLoading(true);

    const q = query(collection(db, "users"), where("role", "!=", "admin"));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    setStudents(data);
    setLoading(false);
    };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleEdit = (student) => {
    setEditingId(student.id);
    setEditData({ 
      first_name: student.first_name,
      last_name: student.last_name,
      birthday: student.birthday,
      email: student.email,
      phone_number: student.phone_number
    });
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async (id) => {
    const studentRef = doc(db, "users", id);
    await updateDoc(studentRef, editData);
    setEditingId(null);
    fetchStudents();
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (!confirmDelete) return;
    await deleteDoc(doc(db, "users", id));
    fetchStudents();
  };

  if (loading) {
        return <Spinner />;
    }

  return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Admin Dashboard</h2>

            <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-100">
                <tr>
                    <th className="px-4 py-2 text-sm font-medium text-gray-600">ID</th>
                    <th className="px-4 py-2 text-sm font-medium text-gray-600">First Name</th>
                    <th className="px-4 py-2 text-sm font-medium text-gray-600">Last Name</th>
                    <th className="px-4 py-2 text-sm font-medium text-gray-600">Birthday</th>
                    <th className="px-4 py-2 text-sm font-medium text-gray-600">Email</th>
                    <th className="px-4 py-2 text-sm font-medium text-gray-600">Phone</th>
                    <th className="px-4 py-2 text-sm font-medium text-gray-600">Role</th>
                    <th className="px-4 py-2 text-sm font-medium text-gray-600">Actions</th>
                </tr>
                </thead>

                <tbody>
                {students.map((student) => (
                    <tr key={student.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-700">{student.student_id}</td>

                    {editingId === student.id ? (
                        <>
                        <td className="px-4 py-2">
                            <input
                            type="text"
                            name="first_name"
                            value={editData.first_name}
                            onChange={handleChange}
                            className="w-full border px-2 py-1 rounded-md"
                            />
                        </td>
                        <td className="px-4 py-2">
                            <input
                            type="text"
                            name="last_name"
                            value={editData.last_name}
                            onChange={handleChange}
                            className="w-full border px-2 py-1 rounded-md"
                            />
                        </td>
                        <td className="px-4 py-2">
                            <input
                            type="date"
                            name="birthday"
                            value={editData.birthday}
                            onChange={handleChange}
                            className="w-full border px-2 py-1 rounded-md"
                            />
                        </td>
                        <td className="px-4 py-2">
                            <input
                            type="email"
                            name="email"
                            value={editData.email}
                            onChange={handleChange}
                            className="w-full border px-2 py-1 rounded-md"
                            />
                        </td>
                        <td className="px-4 py-2">
                            <input
                            type="tel"
                            name="phone_number"
                            value={editData.phone_number}
                            onChange={handleChange}
                            className="w-full border px-2 py-1 rounded-md"
                            />
                        </td>
                        </>
                    ) : (
                        <>
                        <td className="px-4 py-2 text-gray-700">{student.first_name}</td>
                        <td className="px-4 py-2 text-gray-700">{student.last_name}</td>
                        <td className="px-4 py-2 text-gray-700">{student.birthday}</td>
                        <td className="px-4 py-2 text-gray-700">{student.email}</td>
                        <td className="px-4 py-2 text-gray-700">{student.phone_number}</td>
                        </>
                    )}

                    <td className="px-4 py-2 text-gray-700">{student.role}</td>

                    <td className="px-4 py-2 space-x-2">
                        {editingId === student.id ? (
                        <>
                            <button
                            onClick={() => handleSave(student.id)}
                            className="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
                            >
                            Save
                            </button>
                            <button
                            onClick={() => setEditingId(null)}
                            className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-400"
                            >
                            Cancel
                            </button>
                        </>
                        ) : (
                        <>
                            <button
                            onClick={() => handleEdit(student)}
                            className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                            >
                            Edit
                            </button>
                            <button
                            onClick={() => handleDelete(student.id)}
                            className="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
                            >
                            Delete
                            </button>
                        </>
                        )}
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
        );
}

export default AdminPage;
