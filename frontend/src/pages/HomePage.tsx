import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { AuthenticatedTemplate } from '@azure/msal-react';
import { ProfileContent } from '../components/ProfileContent';
import { Typography, Container, Box } from '@mui/material';

//import { useTheme } from '@mui/material/styles';

export const HomePage = () => {
  //const theme = useTheme();

  // TODO: figure out how to use theme for backgroundColor of a Box rather
  // than hard coding the value

  return (
    <Box sx={{ backgroundColor: '#2185ef' }}>
      {/*background color should be set
		by theme*/}
      <Container
        maxWidth={'lg'}
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          color: '#fff',
        }}
      >
        <Typography variant="h1" textAlign={'center'} gutterBottom>
          Lorem ipsum dolor sit amet consectetur.
        </Typography>
        <Typography
          variant="h4"
          textAlign={'center'}
          sx={{ mb: 10 }}
          gutterBottom
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui neque
          quos enim praese
        </Typography>
        <PageLayout>
          <AuthenticatedTemplate>
            <ProfileContent />
          </AuthenticatedTemplate>
        </PageLayout>
      </Container>
    </Box>
  );
};
