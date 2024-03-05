import { NoteAddOutlined } from '@mui/icons-material';
import {
  Card,
  CardContent,
  Grid,
  IconButton,
  List,
  Tooltip,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
  Link,
  Outlet,
  useParams,
  useLoaderData,
  useSubmit,
  useNavigate,
} from 'react-router-dom';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { deleteNote } from '../utils/noteUtils';

export default function NoteList() {
  const { noteId, folderId } = useParams();
  const [activeNoteId, setActiveNoteId] = useState(noteId);
  const { folder } = useLoaderData();
  const noteList = folder.notes
  const submit = useSubmit();
  const navigate = useNavigate();
  console.log('afterRenrender',folder);

  useEffect(() => {
    

    if (noteId) {
      setActiveNoteId(noteId);
      return;
    }

    // if (folder?.notes[0]) {
    //   navigate(`note/${folder.notes[0].id}`);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteId]);
  
  const handleAddNewNote = () => {
    submit(
      {
        content: '',
        folderId,
      },
      { method: 'post', action: `/folders/${folderId}` }
    );
    
    
  };
  const handleDeleteNote = async (deleNoteId) => {
    console.log('handleDeleteNote', deleNoteId);
      
      const removeNote = await deleteNote({noteId: deleNoteId, folderId})
      const newNotes = removeNote.deleteNote
      console.log('newNotes',newNotes);

      if(noteId===deleNoteId) {
        navigate(`/folders/${folderId}`)
        return;
      }
      navigate(`/folders/${folderId}`)
      
      
      
    }
    console.log('folderafterdelelte', folder);

  return (
    <Grid container height='100%'>
      <Grid
        item
        xs={4}
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: '#F0EBE3',
          height: '100%',
          overflowY: 'auto',
          padding: '10px',
          textAlign: 'left',
        }}
      >
        <List
          subheader={
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography sx={{ fontWeight: 'bold' }}>Notes</Typography>
              <Tooltip title='Add Note' onClick={handleAddNewNote}>
                <IconButton size='small'>
                  <NoteAddOutlined />
                </IconButton>
              </Tooltip>
            </Box>
          }
        >
          {noteList.map(({ id, content, updatedAt }) => {
            return (
              <Link
                key={id}
                to={`note/${id}`}
                style={{ textDecoration: 'none' }}
                onClick={() => setActiveNoteId(id)}
              >
                <Card
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: '5px',
                    backgroundColor:
                      id === activeNoteId ? 'rgb(255 211 140)' : null,
                  }}
                >
                  <CardContent
                    sx={{ '&:last-child': { pb: '10px' }, padding: '10px' }}
                  >
                    <div
                      style={{ fontSize: 14, fontWeight: 'bold' }}
                      dangerouslySetInnerHTML={{
                        __html: `${content.substring(0, 30) || 'Empty'}`,
                      }}
                    />
                    <Typography sx={{ fontSize: '10px' }}>
                      {moment(updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
                    </Typography>
                  </CardContent>
                      <Link key={id} onClick={() => {handleDeleteNote(id)}}>  
                        <RemoveCircleOutlineIcon />
                      </Link>
                </Card>
              </Link>
            );
          })}
        </List>
      </Grid>
      <Grid item xs={8}>
        <Outlet />
      </Grid>
    </Grid>
  );
}