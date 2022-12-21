import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const PostShare = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState({});

  const [post, setPost] = useState({
    fName: "",
    lName: "",
  });

  console.log(image);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      navigate("posts");
      await axios.post("http://localhost:3001/create", post);
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      window.location.reload();
    }, 400);
  };

  return (
    <>
      <Container>
        <h1>Create new Post</h1>
        <Form>
          <input
            name="fName"
            value={post.fName}
            onChange={handleChange}
            type="text"
            placeholder="firstName..."
          />
          <input
            name="lName"
            value={post.lName}
            onChange={handleChange}
            type="text"
            placeholder="lastName..."
          />
          <input
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
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
