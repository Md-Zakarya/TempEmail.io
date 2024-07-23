// // src/components/GenerateEmail.js
// import React, { useState } from "react";
// import axios from "axios";

// const GenerateEmail = ({ setEmail }) => {
//   const [loading, setLoading] = useState(false);

//   const generateEmail = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         "https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1"
//       );
//       const email = response.data[0];
//       setEmail(email);
//     } catch (error) {
//       console.error("Error generating email:", error);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
//       <button
//         onClick={generateEmail}
//         disabled={loading}
//         className={`w-full px-6 py-3 rounded-lg text-white ${
//           loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
//         }`}
//       >
//         {loading ? "Generating..." : "Generate Temporary Email"}
//       </button>
//     </div>
//   );
// };

// export default GenerateEmail;
