/* eslint-disable no-use-before-define */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { API } from 'aws-amplify';
import LoaderButton from '../../components/LoaderButton/LoaderButton';
import onError from '../../lib/errorLib';
import s3Upload from '../../lib/awsLib';
import config from '../../config';
import './NewNote.css';

export default function NewNote() {
  const file = useRef(null);
  const nav = useNavigate();
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return content.length > 0;
  }

  function handleFileChange(e) {
    file.current = e.target.files[0];
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${
          config.MAX_ATTACHMENT_SIZE / 1000000
        } MB.`
      );
      return;
    }

    setIsLoading(true);

    try {
      const attachment = file.current ? await s3Upload(file.current) : null;

      await createNote({ content, attachment });
      nav('/');
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function createNote(note) {
    return API.post('notes', '/notes', {
      body: note,
    });
  }

  return (
    <div className='NewNote'>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group controlId='content'>
          <Form.Control
            value={content}
            as='textarea'
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mt-2' controlId='file'>
          <Form.Label>Attachment</Form.Label>
          <Form.Control onChange={(e) => handleFileChange(e)} type='file' />
        </Form.Group>
        <LoaderButton
          block
          type='submit'
          size='lg'
          variant='primary'
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
      </Form>
    </div>
  );
}
