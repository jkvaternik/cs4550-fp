import React from 'react'; 
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react'
import { create_comment } from '../../api';

function CommentsForm({playlist_id, updatePlaylist}) { 

 const [body, setBody] = useState("");

  function onSubmit(ev) {
    ev.preventDefault();

    let comment = {
        body: body,
        playlist_id: playlist_id,
    };

    create_comment(comment).then((resp) => {
      if (resp["errors"]) {
        console.log("errors", resp.errors);
      }
      else {
        updatePlaylist();
      }
    });

    setBody("");
  }
  
    return (
        <Form onSubmit={onSubmit} >
            <h6>Comment:</h6>
            <Form.Control name="body"
                            type="text"
                            onChange={(ev) => setBody(ev.target.value)}
                            value={body} />
            <Button style={{ marginTop: "16px", marginBottom: "16px", width: "100%" }} variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
  }

  
export default CommentsForm;
  