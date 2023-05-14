import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:4000";

export default function MainScreen() {
  const [user, setUser] = useState("");
  const [messageData, setMessageData] = useState("");
  const [delay, setDelay] = useState(localStorage.getItem("delay") || 1);
  const [message, setMessage] = useState("");
  const inputRef = useRef();

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [displayImage, setDisplayImage] = useState(null);
  const [commonInputRef, setCommonInputRef] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const base64String = event.target.result;
      setImageUrl(base64String);
      setImage(file);
    };

    reader.readAsDataURL(file);
  };

  const handleUpload = () => {
    if (image) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const base64String = event.target.result;
        commonInputRef.emit("image", base64String);
      };

      reader.readAsDataURL(image);
    }
  };

  useEffect(() => {
    if (commonInputRef) {
      commonInputRef.on("buffer", (buffer) => {
        console.log(buffer);
        setDisplayImage(buffer);
      });

      return () => {
        commonInputRef.disconnect();
      };
    }
  }, [commonInputRef]);

  useEffect(() => {
    inputRef.current = io(SOCKET_SERVER_URL, {
      query: {
        delay: localStorage.getItem("delay"),
      },
    });

    setCommonInputRef(inputRef.current);
  }, [delay]);

  useEffect(() => {
    if (commonInputRef) {
      commonInputRef.emit("addmessage", "This is the first Message");

      commonInputRef.on("newmessage", (message) => {
        setMessage((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        commonInputRef.off("message");
      };
    }
  }, [commonInputRef]);

  const addMessage = (content) => {
    commonInputRef.emit("addmessage", content);
    inputRef.current.value = "";
    setMessageData("");
  };

  const addDelay = async (delay) => {
    try {
      await axios
        .post("http://localhost:4000/api/v1/addmessagedelay", { delay: delay })
        .then(function (response) {
          if (response.data.success) {
            setDelay(delay);
            localStorage.setItem("delay", delay);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {}
  };

  useEffect(() => {
    async function fetchData() {
      axios.defaults.headers = {
        authorization: localStorage.getItem("token"),
      };
      await axios
        .get("http://localhost:4000/api/v1/getuser")
        .then(function (response) {
          if (response.data.success) {
            setUser(response.data.result);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    fetchData();
  }, []);

  return (
    <div
      style={{
        paddingBottom: "150px",
        height: "100%",
        minHeight: "100vh",
        background: `linear-gradient(239.26deg,#DDEEED 63.17%,#FDF1E0 94.92%)`,
      }}
    >
      <div className="flex flex-row border-b-2 justify-between mx-2 border-black">
        <div className="flex space-x-2 items-center">
          <input
            onChange={(e) => {
              setDelay(e.target.value);
              localStorage.setItem("delay", e.target.value);
            }}
            value={delay}
            type="text"
            className="
        form-control
        block
        w-[200px]
        px-3
        h-10
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
            id="exampleFormControlInput1"
            placeholder="Set Message Delay"
          />
          <button
            className="mx-1  h-10 rounded-md text-white py-1 px-2 bg-green-500"
            onClick={() => {
              addDelay(delay);
            }}
          >
            Submit
          </button>
        </div>
        <div className="flex flex-row  h-20 justify-center py-2">
          <img
            alt="profilephoto"
            className="h-16 w-16 rounded-full"
            src={user.profilePhoto}
          />
          <a className="ml-4 my-auto" href="/uploadphoto">
            <button className="px-2 py-2 rounded-md bg-slate-500 text-white">
              Upload User Photo
            </button>
          </a>
        </div>
      </div>
      <div className="flex mx-auto justify-center w-48 py-4">
        <input
          onChange={(e) => {
            setMessageData(e.target.value);
          }}
          ref={inputRef}
          value={messageData}
          type="text"
          className="
        form-control
        block
        w-[200px]
        px-3
        h-10
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
          id="exampleFormControlInput1"
          placeholder="Add Bubble"
        />
        <button
          className="mx-1 h-10 rounded-md text-white py-1 px-2 bg-green-500"
          onClick={() => {
            addMessage(messageData);
          }}
        >
          Submit
        </button>
        <div>
          <input type="file" onChange={handleFileChange} />
          {imageUrl && <img src={imageUrl} alt="preview" />}
          <button onClick={handleUpload}>Upload Image</button>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="flex flex-col">
          {message &&
            message.map((chat, i) => {
              return (
                <div
                  style={{
                    backgroundColor: user.bubbleColor,
                    maxWidth: "300px",
                  }}
                  className="px-6 py-4 my-4 rounded-xl w-max"
                >
                  <div className="flex justify-start">
                    <img
                      alt="Bubble"
                      className="h-8 w-8 rounded-full"
                      src={`https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png`}
                    />
                  </div>
                  <div>{chat}</div>
                </div>
              );
            })}
          {displayImage && (
            <>
              <img className="h-32 y-32" src={displayImage} alt="uploaded" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
