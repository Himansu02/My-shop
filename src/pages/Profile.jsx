import { Link, useParams } from "react-router-dom";
import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { useReducer, useRef, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { userRequest } from "../redux/requestMethods";
import { UpdateUser } from "../redux/apiCalls";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@mui/icons-material";

export default function Profile() {
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const id = useParams().userId;

  const user = useSelector((state) => state.user.currentUser);
  const userToken = useSelector((state) => state.user.token);
  // console.log(user)

  const usernameRef = useRef();
  const fullnameRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const numberRef = useRef();
  const dobRef = useRef();

  const [file, setFile] = useState(null);

  // console.log(user)

  const handleImage = (e) => {
    setFile(e.target.files[0]);
  };

  const handleClick = (e) => {
    e.preventDefault();
    let updatedUser = {};
    let update = false;
    if (usernameRef.current.value.trim().length > 0) {
      update = true;
      updatedUser = { ...updatedUser, username: usernameRef.current.value };
    }
    if (fullnameRef.current.value.trim().length > 0) {
      update = true;
      updatedUser = { ...updatedUser, fullname: fullnameRef.current.value };
    }
    if (dobRef.current.value.trim().length > 0) {
      update = true;
      updatedUser = { ...updatedUser, dob: dobRef.current.value };
    }
    if (emailRef.current.value.trim().length > 0) {
      update = true;
      updatedUser = { ...updatedUser, email: emailRef.current.value };
    }
    if (addressRef.current.value.trim().length > 0) {
      update = true;
      updatedUser = { ...updatedUser, address: addressRef.current.value };
    }
    if (numberRef.current.value.trim().length > 0) {
      update = true;
      updatedUser = { ...updatedUser, number: numberRef.current.value };
    }

    if (!update && !file) {
      return;
    }

    if (file) {
      setUploading(true)
      const fileName = new Date().getTime() + file.name;

      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          setUploading(false)
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const newUser = { ...updatedUser, img: downloadURL };
            // updateUser(id, newUser, dispatch);
            UpdateUser(id, userToken, newUser, dispatch);

            setUploading(false);
            // console.log(product);
          });
        }
      );
    } else {
      UpdateUser(id, userToken, updatedUser, dispatch);
    }
    setFile(null);
    usernameRef.current.value = "";
    fullnameRef.current.value = "";
    emailRef.current.value = "";
    addressRef.current.value = "";
    numberRef.current.value = "";
    dobRef.current.value = "";
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">Profile</h1>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img
                src={
                  user?.img
                    ? user?.img
                    : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                }
                alt=""
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">
                  {user?.fullname ? user?.fullname : user?.username}
                </span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">{user?.username}</span>
              </div>
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">
                  {user?.dob ? user?.dob : "N/A"}
                </span>
              </div>
              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">
                  {user?.number ? user?.number : "N/A"}
                </span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{user?.email}</span>
              </div>
              <div className="userShowInfo">
                <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">
                  {user?.address ? user?.address : "N/A"}
                </span>
              </div>
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder="annabeck99"
                    className="userUpdateInput"
                    ref={usernameRef}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Anna Becker"
                    className="userUpdateInput"
                    ref={fullnameRef}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="annabeck99@gmail.com"
                    className="userUpdateInput"
                    ref={emailRef}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Phone</label>
                  <input
                    type="number"
                    placeholder="+1 123 456 67"
                    className="userUpdateInput"
                    ref={numberRef}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    placeholder="dd-mm-yyyy"
                    className="userUpdateInput"
                    ref={dobRef}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Address</label>
                  <input
                    type="text"
                    placeholder="New York | USA"
                    className="userUpdateInput"
                    ref={addressRef}
                  />
                </div>
              </div>
              <div className="userUpdateRight">
                <div>
                  <div className="userUpdateUpload">
                    {!uploading && (
                      <img
                        className="userUpdateImg"
                        src={
                          user?.img
                            ? user?.img
                            : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                        }
                        alt=""
                      />
                    )}
                    {uploading && <span>Uploading...</span>}
                    <label htmlFor="file">
                      <Publish className="userUpdateIcon" />
                    </label>
                    <input
                      type="file"
                      id="file"
                      style={{ display: "none" }}
                      onChange={handleImage}
                    />
                  </div>
                  {file && (
                    <div className="successContainer">
                      <span className="success">Click Update To Change.</span>
                    </div>
                  )}
                </div>
                <button className="userUpdateButton" onClick={handleClick}>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
