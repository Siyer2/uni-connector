import {
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
} from '@mui/material';
import Background from '../components/Background';
import { useState } from 'react';

// TODO
// - Correct handle submit function
// - Fix and finish styling for inputs

export const UpdateUser = () => {
  const [userDetails, setUserDetails] = useState<{
    emojis: string;
    faculty: string;
    bestEat: string;
    interests: string;
  }>({ emojis: '', faculty: '', bestEat: '', interests: '' });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    console.log(userDetails);
    const res = await fetch('/updateUser');
    const data = await res.json();
    console.log(data);
  };

  return (
    <Background>
      <Grid
        item
        xs={12}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        color="#fff"
      >
        <Typography variant={'h5'}>This is...</Typography>
        <Typography variant={'h2'}>TuesHey</Typography>
        <Typography mb={3} variant={'h4'}>
          Let's get to know you ✌️😙✌️
        </Typography>

        <TextField
          label={'Describe yourself in 3 emojis!'}
          sx={{ input: { color: '#fff' } }}
        />

        <InputLabel>What Faculty are you in</InputLabel>
        <Select onChange={handleChange} name="faculty">
          <MenuItem value={'Arts, Design & Architecture'}>
            Arts, Design & Architecture
          </MenuItem>
          <MenuItem value={'Business School'}>Business School</MenuItem>
          <MenuItem value={'Engineering'}>Engineering</MenuItem>
          <MenuItem value={'Law'}>Law</MenuItem>
          <MenuItem value={'Medicine'}>Medicine</MenuItem>
          <MenuItem value={'Science'}>Science</MenuItem>
        </Select>
        <Button variant={'contained'} onClick={handleSubmit}>
          Submit!
        </Button>
      </Grid>
    </Background>
  );
};
