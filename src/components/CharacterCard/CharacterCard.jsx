import { Link } from "react-router-dom";
import { Card, ImageListItem, ImageListItemBar } from "@mui/material";
import { styled } from "@mui/material/styles";

const HoverImage = styled("div")({
  img: {
    transition: "all 0.3s ease",
  },
  "&:hover img": {
    transform: "scale(1.1)",
    boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
  },
});

export function CharacterCard({ character: character }) {
  return (
    <Link
      to={`/character/${character.id}`}
      className="bg-white rounded-md shadow-md p-4 block hover:shadow-lg transition-shadow duration-200"
    >
      <ImageListItem key={character.image}>
        <HoverImage>
          <img
            srcSet={`${character.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${character.image}?w=248&fit=crop&auto=format`}
            alt={character.name}
            loading="eager"
          />
          <ImageListItemBar
            title={character.name}
            subtitle={<span>by: {character.status}</span>}
            position="below"
          />
        </HoverImage>
      </ImageListItem>
    </Link>
  );
}
