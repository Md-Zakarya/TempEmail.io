import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import LoadingBar from 'react-top-loading-bar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCopy, faSync, faDownload } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import myphoto from './assets/myimage.jpg';

const App = () => {
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messageDetails, setMessageDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isPhotoHovered, setIsPhotoHovered] = useState(false);

  const loadingBarRef = useRef(null);
  const timeoutRef = useRef(null);

  const generateEmail = async () => {
    setLoading(true);
    loadingBarRef.current.continuousStart();
    try {
      const response = await axios.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1");
      setEmail(response.data[0]);
      setCopied(false);
    } catch (error) {
      console.error("Error generating email:", error);
    }
    setLoading(false);
    loadingBarRef.current.complete();
  };

  const fetchInbox = async () => {
    setLoading(true);
    loadingBarRef.current.continuousStart();
    try {
      const [login, domain] = email.split("@");
      const response = await axios.get(`https://www.1secmail.com/api/v1/?action=getMessages&login=${login}&domain=${domain}`);
      setMessages(response.data);
      setSelectedMessage(null);
      setMessageDetails(null);
    } catch (error) {
      console.error("Error fetching inbox:", error);
    }
    setLoading(false);
    loadingBarRef.current.complete();
  };

  const fetchMessageDetails = async (id) => {
    setDetailsLoading(true);
    loadingBarRef.current.continuousStart();
    try {
      const [login, domain] = email.split("@");
      const response = await axios.get(`https://www.1secmail.com/api/v1/?action=readMessage&login=${login}&domain=${domain}&id=${id}`);
      setMessageDetails(response.data);
    } catch (error) {
      console.error("Error fetching message details:", error);
    }
    setDetailsLoading(false);
    loadingBarRef.current.complete();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (email) {
      fetchInbox();
    }
  }, [email]);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsPhotoHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsPhotoHovered(false);
    }, 300); // Adjust the delay as needed
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 text-gray-900">
      <LoadingBar color="#8B5CF6" ref={loadingBarRef} />
      <header className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-8 shadow-xl">
        <div className="container mx-auto flex flex-col items-center">
          <motion.h1
            className="text-5xl text-center font-extrabold tracking-tight mb-2 font-mono"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            TempEmail.io
          </motion.h1>
          <p className="text-lg mb-6 font-mono text-center">Generate and manage your temporary disposable emails effortlessly.</p>
          <p className="text-lg mb-6 font-mono">A small project by:</p> 
          <div
            className="relative group cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <a href="https://mohammadzakaryaportfolio.netlify.app/" target="_blank" rel="noopener noreferrer">
              <motion.img
                src={myphoto}
                alt="Your Photo"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                initial={{ scale: 1 }}
                animate={{ scale: isPhotoHovered ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
              />
            </a>
            {isPhotoHovered && (
              <motion.div
                className="absolute transform -translate-x-1/2 top-full mt-4 p-4 bg-white rounded-lg shadow-lg w-48 text-center z-50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                <a
                  href="https://www.linkedin.com/in/md-zakarya-98a913233/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:underline mb-2"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/Md-Zakarya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:underline"
                >
                  GitHub
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </header>
      <main className="p-6 md:p-12 max-w-5xl mx-auto">
        <section className="mb-12">
          <motion.button
            onClick={generateEmail}
            disabled={loading}
            className={`w-full py-4 rounded-lg shadow-lg transition-transform transform ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-500 to-pink-500 hover:scale-105"} text-white font-bold text-lg flex items-center justify-center`}
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon icon={faEnvelope} className="mr-3" />
            {loading ? 'Generating...' : 'Generate Temporary Email'}
          </motion.button>
        </section>
        {email && (
          <section className="bg-white p-8 rounded-lg shadow-lg mb-12 border border-gray-200">
            <div className="mb-6">
              <p className="text-xl font-semibold">Your Email:</p>
              <p className="text-2xl font-bold text-blue-600">{email}</p>
              <motion.button
                onClick={handleCopy}
                className="mt-3 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FontAwesomeIcon icon={faCopy} className="mr-2" />
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </motion.button>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Inbox for {email}</h2>
              <motion.button
                onClick={fetchInbox}
                disabled={loading}
                className={`w-full py-4 rounded-lg shadow-lg transition-transform transform ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-500 to-pink-500 hover:scale-105"} text-white font-bold text-lg flex items-center justify-center`}
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <FontAwesomeIcon icon={faSync} className="mr-3" />
                {loading ? 'Refreshing...' : 'Refresh Inbox'}
              </motion.button>
            </div>
            {loading ? (
              <p className="text-center text-lg">Loading...</p>
            ) : (
              <ul className="space-y-4">
                {messages.map((message) => (
                  <motion.li
                    key={message.id}
                    onClick={() => fetchMessageDetails(message.id)}
                    className="p-5 bg-gray-50 rounded-lg shadow-md hover:bg-gray-100 cursor-pointer transition"
                    whileHover={{ scale: 1.02, backgroundColor: "#f1f5f9" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <p className="font-medium">
                      <strong>From:</strong> {message.from}
                    </p>
                    <p>
                      <strong>Subject:</strong> {message.subject}
                    </p>
                    <p>
                      <strong>Date:</strong> {message.date}
                    </p>
                  </motion.li>
                ))}
              </ul>
            )}
            {messageDetails && (
              <div className="mt-8 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                <h3 className="text-xl font-semibold mb-4">Message Details</h3>
                {detailsLoading ? (
                  <p className="text-center text-lg">Loading...</p>
                ) : (
                  <>
                    <div className="mb-4">
                      <p><strong>From:</strong> {messageDetails.from}</p>
                      <p><strong>Subject:</strong> {messageDetails.subject}</p>
                      <p><strong>Date:</strong> {messageDetails.date}</p>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold">Body:</h4>
                      <div className="mt-2">
                        <h5 className="font-medium">Text Body:</h5>
                        <pre className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap">
                          {messageDetails.textBody || 'No text content'}
                        </pre>
                      </div>
                      <div className="mt-2">
                        <h5 className="font-medium">HTML Body:</h5>
                        <div
                          className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap"
                          dangerouslySetInnerHTML={{ __html: messageDetails.htmlBody || 'No HTML content' }}
                        />
                      </div>
                    </div>
                    {messageDetails.attachments && messageDetails.attachments.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-lg font-semibold">Attachments</h4>
                        <ul className="mt-2 space-y-2">
                          {messageDetails.attachments.map((attachment) => (
                            <li key={attachment.filename}>
                              <a
                                href={`https://www.1secmail.com/api/v1/?action=download&login=${email.split('@')[0]}&domain=${email.split('@')[1]}&id=${messageDetails.id}&file=${attachment.filename}`}
                                download={attachment.filename}
                                className="text-blue-600 hover:underline flex items-center"
                              >
                                <FontAwesomeIcon icon={faDownload} className="mr-2" />
                                {attachment.filename}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default App;
