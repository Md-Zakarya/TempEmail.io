// // src/components/Inbox.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Inbox = ({ email }) => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedMessage, setSelectedMessage] = useState(null);
//   const [messageDetails, setMessageDetails] = useState(null);
//   const [detailsLoading, setDetailsLoading] = useState(false);

//   const fetchInbox = async () => {
//     setLoading(true);
//     try {
//       const [login, domain] = email.split("@");
//       const response = await axios.get(
//         `https://www.1secmail.com/api/v1/?action=getMessages&login=${login}&domain=${domain}`
//       );
//       setMessages(response.data);
//       setSelectedMessage(null); // Reset selected message
//       setMessageDetails(null); // Reset message details
//     } catch (error) {
//       console.error("Error fetching inbox:", error);
//     }
//     setLoading(false);
//   };

//   const fetchMessageDetails = async (id) => {
//     setDetailsLoading(true);
//     try {
//       const [login, domain] = email.split("@");
//       const response = await axios.get(
//         `https://www.1secmail.com/api/v1/?action=readMessage&login=${login}&domain=${domain}&id=${id}`
//       );
//       setMessageDetails(response.data);
//     } catch (error) {
//       console.error("Error fetching message details:", error);
//     }
//     setDetailsLoading(false);
//   };

//   useEffect(() => {
//     if (email) {
//       fetchInbox();
//     }
//   }, [email]);

//   return (
//     <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mt-6">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Inbox for {email}</h2>
//       <button
//         onClick={fetchInbox}
//         disabled={loading}
//         className={`px-6 py-3 rounded-lg text-white ${
//           loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
//         }`}
//       >
//         {loading ? 'Refreshing...' : 'Refresh Inbox'}
//       </button>

//       {loading ? (
//         <p className="mt-4 text-gray-500">Loading...</p>
//       ) : (
//         <ul className="mt-6 space-y-4">
//           {messages.map((message) => (
//             <li
//               key={message.id}
//               onClick={() => fetchMessageDetails(message.id)}
//               className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100"
//             >
//               <p className="font-semibold text-gray-800">
//                 <strong>From:</strong> {message.from}
//               </p>
//               <p className="text-gray-700">
//                 <strong>Subject:</strong> {message.subject}
//               </p>
//               <p className="text-gray-600">
//                 <strong>Date:</strong> {message.date}
//               </p>
//             </li>
//           ))}
//         </ul>
//       )}

//       {messageDetails && (
//         <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
//           <h3 className="text-xl font-semibold mb-4 text-gray-800">Message Details</h3>
//           {detailsLoading ? (
//             <p className="text-gray-500">Loading...</p>
//           ) : (
//             <div>
//               <p className="font-semibold text-gray-800">
//                 <strong>From:</strong> {messageDetails.from}
//               </p>
//               <p className="text-gray-700">
//                 <strong>Subject:</strong> {messageDetails.subject}
//               </p>
//               <p className="text-gray-600">
//                 <strong>Date:</strong> {messageDetails.date}
//               </p>
//               <div className="mt-4">
//                 <h4 className="text-lg font-semibold text-gray-800">Body:</h4>
//                 <div className="mt-2">
//                   <h5 className="font-medium text-gray-700">Text Body:</h5>
//                   <pre className="bg-gray-100 p-3 rounded border border-gray-300">{messageDetails.textBody || 'No text content'}</pre>
//                 </div>
//                 <div className="mt-4">
//                   <h5 className="font-medium text-gray-700">HTML Body:</h5>
//                   <div
//                     className="bg-gray-100 p-3 rounded border border-gray-300"
//                     dangerouslySetInnerHTML={{ __html: messageDetails.htmlBody || 'No HTML content' }}
//                   />
//                 </div>
//               </div>
//               {messageDetails.attachments && messageDetails.attachments.length > 0 && (
//                 <div className="mt-4">
//                   <h4 className="text-lg font-semibold text-gray-800">Attachments</h4>
//                   <ul className="mt-2 space-y-2">
//                     {messageDetails.attachments.map((attachment) => (
//                       <li key={attachment.filename} className="text-blue-600 hover:underline">
//                         <a
//                           href={`https://www.1secmail.com/api/v1/?action=download&login=${email.split('@')[0]}&domain=${email.split('@')[1]}&id=${messageDetails.id}&file=${attachment.filename}`}
//                           download={attachment.filename}
//                         >
//                           {attachment.filename}
//                         </a>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Inbox;
