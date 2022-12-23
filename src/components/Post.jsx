import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Post = () => {
  const [newPost, setNewPost] = useState([]);
  const [updatedPost, setUpdatedPost] = useState({});
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const folder = "http://localhost:3001/upload/";

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get("/posts");
      setNewPost(res.data);
    }
    fetchPost()
  }, []);

  const removePost = async (id) => {
    try {
      await axios.delete(`/delete/${id}`);
    } catch (error) {
      console.log(error)
    }
    setTimeout(() => {
      window.location.reload();
    }, 400);
  };

  const updatePost = (post) => {
    setUpdatedPost(post);
    console.log(updatedPost);
    setModal(true);
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUpdatedPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const updatedPostSave = async () => {
    try {
      await axios.put(`/update/${updatedPost._id}`, updatedPost);
    } catch (error) {
      console.log(error.message)
    }

    window.location.reload();
    setModal(false);
  };

  return (
    <>
      <Container>
        <h1 className="title">Contacts Page</h1>
        {newPost &&
          newPost.map((post, i) => (
            <div className="post" key={i}>
              <h1>First Name : {post.fName}</h1>
              <h1>Last Name : {post.lName}</h1>
              <img src={folder + post.photo} alt="newImage" />
              <Buttons>
                <Button onClick={() => updatePost(post)}>Update</Button>
                <Button onClick={() => removePost(post._id)}>Delete</Button>
              </Buttons>
            </div>
          ))}
        <Button onClick={() => navigate(-1)}>Back</Button>
      </Container>
      <Modal modal={modal}>
        <button onClick={() => setModal(false)} className="close">
          X
        </button>
        <div className="form">
          <input
            type="text"
            placeholder="update..."
            value={updatedPost.fName ? updatedPost.fName : ""}
            name="fName"
            onChange={onChangeHandler}
          />
          <input
            type="text"
            placeholder="update..."
            value={updatedPost.lName ? updatedPost.lName : ""}
            name="lName"
            onChange={onChangeHandler}
          />
          <button onClick={updatedPostSave}>Submit</button>
        </div>
      </Modal>
    </>
  );
};

export default Post;

const Container = styled.div`
  width: 30rem;
  margin: 0 auto;
  border: 1px solid #000;
  border-radius: 5px;
  padding: 1rem;
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .title {
    text-align: center;
    font-weight: 600;
    padding-bottom: 1rem;
  }

  .post {
    border: 1px solid #000;
    border-radius: 5px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    h1 {
      font-size: 1rem;
      text-transform: capitalize;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.6rem;
  cursor: pointer;
`;

const Modal = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  display: ${(props) => (props.modal ? "flex" : "none")};

  .form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 20rem;

    input {
      padding: 0.5rem;
      outline: none;
      width: 100%;
    }

    button {
      cursor: pointer;
      padding: 0.4rem;
    }
  }

  .close {
    color: #fff;
    position: absolute;
    top: 2rem;
    right: 3rem;
    cursor: pointer;
    background-color: transparent;
    font-size: 2rem;
    border: none;
  }
`;
