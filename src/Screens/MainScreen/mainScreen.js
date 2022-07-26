import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MainScreen() {
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState("");
  const [messageData, setMessageData] = useState("");
  const [gradientFrom, setGradientFrom] = useState("#DDEEED");
  const [gradientTo, setGradientTo] = useState("#FDF1E0");
  const [bubbleColor, setBubbleColor] = useState("");

  const addMessage = async (content) => {
    try {
      await axios.post("http://localhost:4000/api/v1/newmessage", {
        content: content,
      });
      window.location.href = "/maincontent";
    } catch (error) {
      console.log("Error in adding new message");
    }
  };

  const temp = "#DDEEED";

  useEffect(() => {
    async function fetchData() {
      axios.defaults.headers = {
        authorization: localStorage.getItem("token"),
      };
      await axios
        .get("http://localhost:4000/api/v1/getmessage")
        .then(function (response) {
          if (response.data.success) {
            setChats(response.data.result);
          }
        })
        .catch(function (error) {
          console.log(error);
          // window.location.href = "/";
        });

      await axios
        .get("http://localhost:4000/api/v1/getuser")
        .then(function (response) {
          if (response.data.success) {
            setUser(response.data.result);
          }
        })
        .catch(function (error) {
          console.log(error);
          // window.location.href = "/";
        });
    }
    fetchData();
  }, []);

  const selectGradient = async () => {
    const toSendData = {
      gradientFrom: gradientFrom,
      gradientTo: gradientTo,
    };
    await axios.post(
      "http://localhost:4000/api/v1/updategradientcolor",
      toSendData
    );
    window.location.href = "/maincontent";
  };

  const selectBubbleColor = async () => {
    const toSendData = {
      bubbleColor: bubbleColor,
    };
    await axios.post(
      "http://localhost:4000/api/v1/updatebubblecolor",
      toSendData
    );
    window.location.href = "/maincontent";
  };

  return (
    <div
      style={{
        paddingBottom: "150px",
        background: `linear-gradient(239.26deg, ${user.gradientFrom} 63.17%,${user.gradientTo} 94.92%)`,
      }}
    >
      <div className="flex justify-center border-b-4 border-black">
        <div>
          <label for="cars">Choose Gradient From : </label>
          <select
            onChange={(e) => {
              setGradientFrom(e.target.value);
            }}
            id="gfrom"
            name="gfrom"
          >
            <option value=""></option>
            <option value="#DDEEED">#DDEEED</option>
            <option value="#DEEDDD">#DEEDDD</option>
            <option value="#EDEDED">#EDEDED</option>
            <option value="#DEDDDD">#DEDDDD</option>
          </select>

          <label for="cars">Choose Gradient To : </label>
          <select
            onChange={(e) => {
              setGradientTo(e.target.value);
            }}
            id="gto"
            name="gto"
          >
            <option value=""></option>
            <option value="#DDEEED">#DDEEED</option>
            <option value="#FDF1E0">#FDF1E0</option>
            <option value="#FDFe21">#FDFe21</option>
            <option value="#FDF340">#FDF340</option>
          </select>

          <button
            onClick={() => {
              selectGradient();
            }}
            className="ml-2 px-2 py-1 bg-blue-500 rounded-md"
          >
            Submit
          </button>
          <label className="ml-8" for="cars">
            Choose Bubble Color:{" "}
          </label>
          <select
            onChange={(e) => {
              setBubbleColor(e.target.value);
            }}
            id="bubbleColor"
            name="bubbleColor"
          >
            <option value=""></option>
            <option value="#fff">#fff</option>
            <option value="#DEEDDD">#DEEDDD</option>
            <option value="#EDEDED">#EDEDED</option>
            <option value="#DEDDDD">#DEDDDD</option>
          </select>
          <button
            onClick={() => {
              selectBubbleColor();
            }}
            className="ml-2 px-2 py-1 bg-blue-500 rounded-md"
          >
            Submit
          </button>

          <div className="flex flex-row  h-20 justify-center py-2">
            <img className="h-16 w-16 rounded-full" src={user.profilePhoto} />
            <a className="ml-4 my-auto" href="/uploadphoto">
              <button className="px-2 py-2 rounded-md bg-slate-500 text-white">
                Upload User Photo
              </button>
            </a>
          </div>
        </div>
      </div>
      <div className="flex mx-auto w-48 py-4">
        <input
          onChange={(e) => {
            setMessageData(e.target.value);
          }}
          type="text"
          className="
        form-control
        block
        w-full
        px-3
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
          className="mx-1 rounded-md py-1 px-2 bg-green-500"
          onClick={() => {
            addMessage(messageData);
          }}
        >
          Submit
        </button>
      </div>

      <div className="flex justify-center">
        <div className="flex flex-col">
          {chats.map((chat) => {
            return (
              <div
                style={{ backgroundColor: user.bubbleColor, maxWidth: "300px" }}
                className="px-6 py-4 my-4 rounded-xl w-max"
              >
                <div className="flex justify-start">
                  <img className="h-8 w-8 rounded-full" src={chat.photo} />
                </div>
                <div>{chat.content}</div>
              </div>
            );
          })}
          <div>
            <div
              style={{ backgroundColor: user.bubbleColor, maxWidth: "300px" }}
              className="px-6 py-4 my-4 rounded-r-lg rounded-b-lg w-max"
            >
              <div>Can I Help?</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
