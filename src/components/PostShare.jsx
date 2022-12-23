import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const PostShare = () => {
  const navigate = useNavigate();
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [imageUpload, setImageUpload] = useState(null);


  const handleClick = async (e) => {
    e.preventDefault();

    const posts = {
      fName: fName,
      lName: lName,
    };

    if (imageUpload) {
      let formData = new FormData();
      let fileName = Date.now() + imageUpload.name;
      formData.append("name", fileName);
      formData.append("image", imageUpload);
      posts.photo = fileName;
      
      try {
        await axios.post("/upload", formData);
      } catch (error) {
        console.log(error)
      }
    }

    try {
      navigate("posts");
      await axios.post("/createPost", posts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <h1>Create new Post</h1>
        <Form>
          <input
            name="fName"
            value={fName}
            onChange={(e) => setFName(e.target.value)}
            type="text"
            placeholder="firstName..."
          />
          <input
            name="lName"
            value={lName}
            onChange={(e) => setLName(e.target.value)}
            type="text"
            placeholder="lastName..."
          />
          <input
            type="file"
            name="image"
            filename="imageUpload"
            onChange={(e) => setImageUpload(e.target.files[0])}
          />
          <Button onClick={handleClick} className="submit">
            Submit
          </Button>
        </Form>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </Container>
    </>
  );
};

export default PostShare;


const Container = styled.div`
  width: 80%;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  padding: 3rem 0;
`;
const Button = styled.button`
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;

  input {
    width: 18rem;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    outline: none;
  }

  .submit {
    width: 18rem;
  }
`;
