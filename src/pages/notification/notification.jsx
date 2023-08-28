import React, { useState, useEffect } from 'react';
import Layout from "../../layout";
import navigateToLogin from '../../utils/routes/navigateToLogin';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { collection, query, onSnapshot, getDoc, doc } from "firebase/firestore";
import UserList from '../../assets/components/userList';

const Notification = () => {
  const navigate = useNavigate();
  const [logedUser, setLogedUser] = useAuthState(auth);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!logedUser) {
      navigateToLogin(navigate);
      return;
    }

    // Reference to the user's notifications collection
    const notificationsRef = collection(db, 'users', logedUser.uid, 'notifications');

    // Query for the notifications
    const querySnapshot = query(notificationsRef);

    // Set up a listener to get real-time updates
    const unsubscribe = onSnapshot(querySnapshot, async (snapshot) => {
      const newNotifications = [];

      for (const docSnapshot of snapshot.docs) {
        const notificationData = docSnapshot.data();

        // Fetch sender details from the "users" collection
        const senderDocRef = doc(db, 'users', notificationData.senderId);
        const senderDoc = await getDoc(senderDocRef);

        if (senderDoc.exists()) {
          const senderDetails = senderDoc.data();

          // Fetch post details using postId
          const postDocRef = doc(db, 'posts', notificationData.postId);
          const postDoc = await getDoc(postDocRef);

          if (postDoc.exists()) {
            const postDetails = postDoc.data();

            // Add sender details and post details to the notification data
            const notificationWithDetails = {
              ...notificationData,
              senderDetails: senderDetails,
              postDetails: postDetails,
            };

            newNotifications.push(notificationWithDetails);
          }
        }
      }

      setNotifications(newNotifications);
    });

    return () => unsubscribe(); // Clean up the listener when component unmounts
  }, [logedUser, navigate]);

  return (
    <Layout>
      {notifications.length > 0 ? (
        <div>
          {notifications.map((notification, index) => (
            <UserList key={index}
              username={notification.message}
              userId={notification.senderDetails.userId}
              image={notification.senderDetails.photoURL}
              text={notification.postDetails.description}
              >
            </UserList>
          ))}
        </div>
      ) : (
        <p>No notifications yet.</p>
      )}
    </Layout>
  );
}

export default Notification;
