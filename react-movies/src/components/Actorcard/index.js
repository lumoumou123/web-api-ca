import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function ActorCard({ actor }) {
  console.log("Generated Link:", `/actor/${actor.id}`);  // 打印链接的URL，检查actor.id

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 500 }}
        image={
          actor.profile_path
            ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
            : 'https://image.tmdb.org/t/p/w500/dNsFLihmWfA2KCENbZCtq9AjSob.jpg' // Placeholder image
        }
        title={actor.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          <Link to={`/actor/${actor.name}`}>{actor.name}</Link> {/* 确保每个演员链接唯一 */}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {actor.character}
        </Typography>
      </CardContent>
    </Card>
  );
}
