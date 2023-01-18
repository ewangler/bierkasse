import React from 'react'
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

type Props = {
  imgUrl: string | undefined
  key: string
  text: string
  onClick: any
}

const ImageBtn = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  width: '90%',
  margin: '5px',
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      backgroundColor: '#1565c0',
      boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

function ImageButton(props: Props) {
  let style = {}
  if (props.imgUrl) {
    style = { backgroundImage: `url(${props.imgUrl})` }
  }
  return <ImageBtn key={props.key} onClick={props.onClick}>
     <ImageSrc style={style} />
     <Typography
              component="span"
              variant="h4"
              color="white"
              sx={{
                backgroundColor: '#1976d2',
                borderRadius: '4px',
                boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
                position: 'relative',
                fontSize: '20px',
                fontWeight: '500',
                textTransform: 'uppercase',
                p: 2,
              }}
            >
              {props.text}
            </Typography>
    
  </ImageBtn>
}
export default ImageButton
