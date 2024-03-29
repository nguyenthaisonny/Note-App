import React, { useState } from "react";
import { CardContent, List, Typography, Card, Box } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import NewFolder from "./NewFolder";
export default function FolderList({ folders }) {
  const { folderId } = useParams;
  const [activeFolderId, setActiveFolderId] = useState(folderId);
  return (
    <List
      sx={{
        height: "100%",
        width: "100",
        bgcolor: "#7D9D9C",
        padding: "10px",
        textAlign: "left",
        overflowY: "auto",
      }}
      subheader={
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography sx={{ fontWeight: "bold", color: "#fff" }}>
            Folders
          </Typography>
          <NewFolder/>
        </Box>
      }
    >
      {folders.map(({ id, name }) => (
        <Link
          key={id}
          to={`folders/${id}`}
          style={{ textDecoration: "none" }}
          onClick={() => setActiveFolderId(id)}
        >
          <Card
            sx={{
              mb: "5px",
              bgcolor: id === activeFolderId ? "rgb(255,211,140)" : null,
            }}
          >
            <CardContent
              sx={{ "&:last-child": { pb: "10px" }, padding: "10px" }}
            >
              <Typography sx={{fontSize: 16, fontWeight: 'bold'}}>{name}</Typography>
            </CardContent>
          </Card>
        </Link>
      ))}
    </List>
  );
}
