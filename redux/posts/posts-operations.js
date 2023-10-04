import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../firebase/firebaseConfig";
import {
  setDoc,
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  increment,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async (uid, { rejectWithValue }) => {
    try {
        const posts = [];
    //   const querySnapshot = await getDocs(collection(db, "posts"));
    //    querySnapshot.docs.forEach((doc) => {
    //     const post ={ ...doc.data(), id: doc.id}
    //    return posts.push(post);
    // });
    // console.log("posts:", posts)
    //  const postUser = posts.filter(post => post.userId === uid);
    //   return postUser
    const postsRef = query(
        collection(db, 'posts'),
        where('userId', '==', uid)
      );
      const querySnapshot = await getDocs(postsRef);
       querySnapshot.forEach((doc) => posts.push(doc.data()) );

      return posts

    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const uploadPhotoToServer = async (capturedPhoto) => {
  try {
    const response = await fetch(capturedPhoto);
    const file = await response.blob();
    const uniqueImageId = Date.now().toString();

    const dataRef = await ref(storage, `images/${uniqueImageId}`);

    await uploadBytesResumable(dataRef, file);

    const processedPhoto = await getDownloadURL(
      ref(storage, `images/${uniqueImageId}`)
    );

    return processedPhoto;
  } catch (error) {
    console.log(error);
  }
};

const addPost = createAsyncThunk(
  "posts/addPost",
  async ({ uid, newPost }, { rejectWithValue }) => {

    try {
      setDoc(doc(db, "posts", newPost.id), newPost);

      return newPost;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);



const addComment = createAsyncThunk(
  "posts/addComment",
  async ({ currentId, comment }, { rejectWithValue }) => {
    
    try {
      await updateDoc(doc(db, "posts", currentId), {
        comments: arrayUnion(comment),
      });

      // const unsub = onSnapshot(doc(db, "posts", currentId), (doc) => {
      //   const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      //   // console.log(source, " data: ", doc.data());
      //   return doc.data()
      // });

      return { currentId, comment };
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);

const addLike = createAsyncThunk(
  "posts/addLike",
  async ( {postId, uid }, { rejectWithValue }) => {
    
    try {
      await updateDoc(doc(db, "posts", postId), {
        likes: increment(1),
      });

      await updateDoc(doc(db, "posts", postId), {
        likeUserId: arrayUnion(uid),
      });

      return {postId, uid};
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);

const setCurrentPostId = createAction("posts/setCurrentPostId", (id) => ({
  payload: { id },
}));

export { fetchAllPosts, addPost, addComment, addLike };
