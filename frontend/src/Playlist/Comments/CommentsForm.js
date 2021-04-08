import React from 'react'; 
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { create_comment } from '../../api';

function CommentsForm({playlist_id}) { 

 const [body, setBody] = useState("");
 const history = useHistory();

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
        //TODO: refresh playlist
        console.log("Commented!", resp);
      }
    });

    setBody("");
  }
  
    return (
        <Form inline onSubmit={onSubmit} >
            <Form.Label>Comment:</Form.Label>
            <Form.Control name="body"
                            type="text"
                            onChange={(ev) => setBody(ev.target.value)}
                            value={body} />
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
  }

  
export default CommentsForm;
  