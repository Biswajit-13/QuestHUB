const updateName = async () => {

    const updateDisplayNameInArrays = async (userId, editedName) => {
      try {
        const postsQuerySnapshot = await getDocs(collection(db, "posts"));
        const batch = writeBatch(db);

        postsQuerySnapshot.forEach((postDoc) => {
          const postData = postDoc.data();

          if (postData.likes && Array.isArray(postData.likes)) {
            const updatedLikes = postData.likes.map((like) => {
              if (like.userId === userId) {
                return { ...like, displayName: editedName };
              }
              return like;
            });

            if (!arrayEquals(postData.likes, updatedLikes)) {
              const postRef = doc(db, "posts", postDoc.id);
              batch.update(postRef, { likes: updatedLikes });
            }
          }

          if (postData.comments && Array.isArray(postData.comments)) {
            const updatedComments = postData.comments.map((comment) => {
              if (comment.userId === userId) {
                return { ...comment, displayName: editedName };
              }
              return comment;
            });

            if (!arrayEquals(postData.comments, updatedComments)) {
              const postRef = doc(db, "posts", postDoc.id);
              batch.update(postRef, { comments: updatedComments });
            }
          }
        });

        await batch.commit();

        console.log("Display name updated in likes and comments!", editedName);
      } catch (error) {
        console.error("Error updating display name in arrays:", error);
      }
    };

    const updateDisplayNameInUsers = async () => {
      try {
        // Update displayName in the user document
        const docRef = doc(db, "users", logedUser.uid);
        await updateDoc(docRef, { displayName: editedName });
        console.log("Display name updated in users");
      } catch (error) {
        console.error("Error updating display name in user:", error);
      }
    };


    const updateDisplayNameInPosts = async (userId, editedName) => {
      try {
        const postsQuerySnapshot = await getDocs(collection(db, "posts"));
        const batch = writeBatch(db);

        postsQuerySnapshot.forEach((postDoc) => {
          const postData = postDoc.data();
          if (postData.userId === userId) {
            const postRef = doc(db, "posts", postDoc.id);
            batch.update(postRef, { displayName: editedName });
          }
        });

        await batch.commit();

        console.log("Display name updated in posts!", editedName);
      } catch (error) {
        console.error("Error updating display name in posts:", error);
      }
    };

    const updateDisplayNameInFollowArrays = async (userId, editedName) => {
      try {
        const usersQuerySnapshot = await getDocs(collection(db, "users"));
        const batch = writeBatch(db);
    
        usersQuerySnapshot.forEach((userDoc) => {
          const userData = userDoc.data();
    
          console.log("User Data:", userData);
    
          const updatedFollowers = userData.followers.map((follower) => {
            if (follower.userId === userId) {
              return { ...follower, displayName: editedName };
            }
            return follower;
          });
    
          const updatedFollowing = userData.following.map((follow) => {
            if (follow.userId === userId) {
              return { ...follow, displayName: editedName };
            }
            return follow;
          });
    
          console.log("Updated Followers:", updatedFollowers);
          console.log("Updated Following:", updatedFollowing);
    
          if (!arrayEquals(userData.followers, updatedFollowers) || !arrayEquals(userData.following, updatedFollowing)) {
            const userRef = doc(db, "users", userDoc.id);
            batch.update(userRef, { followers: updatedFollowers, following: updatedFollowing });
          }
        });
    
        await batch.commit();
    
        console.log("Display name updated in followers and following arrays!");
      } catch (error) {
        console.error("Error updating display name in followers and following arrays:", error);
      }
    };
    

    try {
      await updateDisplayNameInPosts(logedUser.uid, editedName);
      await updateDisplayNameInUsers();
      await updateDisplayNameInArrays(logedUser.uid, editedName);
     await updateDisplayNameInFollowArrays(logedUser.uid, editedName);
    } catch (error) {
      console.error("Error updating display name", error)
    }


    setIsEditMode(false);

  };