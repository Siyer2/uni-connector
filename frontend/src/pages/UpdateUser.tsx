import {
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
  FormControl,
} from '@mui/material';
import Background from '../components/Background';
import { useState } from 'react';

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
    // TODO:
    // Hit the correct API to successfully store info to the db
    const res = await fetch('http://dynamodb:8000/updateUser', {
      method: 'POST',
    });
    const data = await res.json();
    console.log(data);
  };

  const baseFlexStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <Background bgcolor={'#fff'}>
      <Grid item xs={12} sx={baseFlexStyles}>
        <Typography variant={'h5'}>This is...</Typography>
        <Typography variant={'h2'}>TuesHey</Typography>
        <Typography variant={'h4'} mb={7}>
          Let's get to know you ✌️😙✌️
        </Typography>

        <div style={{ margin: '1em 0' }}>
          <InputLabel sx={{ marginBottom: '8px' }}>
            Describe yourself in 3 emojis!
          </InputLabel>
          <TextField
            onChange={handleChange}
            value={userDetails.emojis}
            placeholder={'😎 ⚽ 🍔'}
            name="emojis"
          />
        </div>
        <div style={{ margin: '1em 0' }}>
          <InputLabel sx={{ marginBottom: '8px' }}>
            What Faculty are you in?
          </InputLabel>
          <FormControl>
            <Select
              value={userDetails.faculty}
              label="Choose Faculty"
              onChange={handleChange}
              displayEmpty
              defaultValue=""
              name="faculty"
            >
              <MenuItem value={'Arts, Design & Architecture'}>
                Arts, Design & Architecture
              </MenuItem>
              <MenuItem value={'Business School'}>Business School</MenuItem>
              <MenuItem value={'Engineering'}>Engineering</MenuItem>
              <MenuItem value={'Law'}>Law</MenuItem>
              <MenuItem value={'Medicine'}>Medicine</MenuItem>
              <MenuItem value={'Science'}>Science</MenuItem>
              <MenuItem value="">Choose your Faculty</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div style={{ margin: '1em 0' }}>
          <InputLabel sx={{ marginBottom: '8px' }}>
            What's the best place to eat on campus?
          </InputLabel>
          <TextField
            value={userDetails.bestEat}
            placeholder={'Guzman y Gomez'}
            onChange={handleChange}
            name="bestEat"
          />
        </div>
        <div style={{ margin: '1em 0' }}>
          <InputLabel sx={{ marginBottom: '8px' }}>I'm into...</InputLabel>
          <TextField
            value={userDetails.interests}
            placeholder={'hip-hop, Simpsons'}
            onChange={handleChange}
            name="interests"
          />
        </div>
        <Button variant={'contained'} onClick={handleSubmit}>
          Submit!
        </Button>
      </Grid>
    </Background>
  );
};
