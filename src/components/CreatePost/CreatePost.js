import React, { useState } from "react";
import "../../styles/CreatePost/CreatePost.css";
import CreatePostInput from "./CreatePostInput";
import CreatePostRadio from "./CreatePostRadio";
import Button from "../signUpCompontents/Button";
import axios from "axios";
import Cookies from "js-cookie";

function CreatePost() {
  const TypeOfPostArr = ["Job", "Project", "Blog"];
  const [isActiveTitle, setActiveTitle] = useState(false);
  const [isActiveDescription, setActiveDescription] = useState(false);
  const [isActiveLink, setActiveLink] = useState(false);

  const [postDetails, setPostDetails] = useState({
    postTitle: "",
    postDescription: "",
    jobLink: "",
    typeOfPost: "",
    attachedImgs: [],
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "attachedImgs") {
      setPostDetails({
        ...postDetails,
        [name]: e.target.files,
      });
    } else {
      setPostDetails({ ...postDetails, [name]: value });
    }
    // console.log(postDetails);
  };

  const handleTextChange = (e) => {
    handleInput(e);

    if (e.target.name === "postTitle") {
      if (e.target.value !== "") {
        setActiveTitle(true);
      } else {
        setActiveTitle(false);
      }
    }
    if (e.target.name === "postDescription") {
      if (e.target.value !== "") {
        setActiveDescription(true);
      } else {
        setActiveDescription(false);
      }
    }
    if (e.target.name === "jobLink") {
      if (e.target.value !== "") {
        setActiveLink(true);
      } else {
        setActiveLink(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(postDetails);
    const attachedImgs = postDetails.attachedImgs;
    let imageHeights = [];
    let imageWidths;

    if (attachedImgs.length !== 0) {
      console.log(attachedImgs);
      Array.prototype.forEach.call(attachedImgs, function (file, index) {

        let reader = new FileReader();
        reader.readAsDataURL(file);

        imageHeights[index] = 5
        console.log(reader.readAsDataURL(file));
      });

    }
    console.log(imageHeights);

    const postData = new FormData();
    postData.append("title", postDetails.postTitle);
    postData.append("description", postDetails.postDescription);
    postData.append("jobLink", postDetails.jobLink);
    postData.append("photos", postDetails.attachedImgs);
    postData.append("imageHeights", imageHeights);
    postData.append("imageWidths", imageWidths);

    // try {
    //   const token = Cookies.get("token");

    //   if (token) {
    //     const getDetailsRes = await axios.post(`/home/addpost`, {
    //       headers: {
    //         Authorization: `${token}`,
    //       },
    //     });

    //   }
    // } catch (error) {
    //   return alert(`${error.response.data.error}`);
    // }
  };

  return (
    <div className="PostMainContainer">
      <form action="" onSubmit={handleSubmit}>
        <CreatePostInput
          inputType="text"
          inputName="postTitle"
          inputValue={postDetails.postTitle}
          onChangeFunction={handleTextChange}
          labelContent="Post Title"
          isActive={isActiveTitle}
          isInput={true}
        />
        <CreatePostInput
          inputType="text"
          inputName="postDescription"
          inputValue={postDetails.postDescription}
          onChangeFunction={handleTextChange}
          labelContent="Post Description"
          isActive={isActiveDescription}
        />
        <div
          style={{
            display: "inline-block",
            marginBottom: "1vw",
          }}
        >
          <CreatePostRadio
            RadioHeading="Type Of Post"
            RadioOptions={TypeOfPostArr}
            RadioName="typeOfPost"
            onChangeFunction={handleInput}
            RadioValue={postDetails.typeOfPost}
          />
        </div>
        <CreatePostInput
          inputType="text"
          inputName="jobLink"
          inputValue={postDetails.jobLink}
          onChangeFunction={handleTextChange}
          labelContent="Job Link"
          isActive={isActiveLink}
          isInput={true}
        />
        <input
          type="file"
          id="attachedImgs"
          name="attachedImgs"
          accept=".png , .jpg , .jpeg "
          onChange={handleInput}
          multiple
        />
        <Button />
      </form>
    </div>
  );
}

export default CreatePost;
