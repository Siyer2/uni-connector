import { PageLayout } from '../components/PageLayout';
import { AuthenticatedTemplate } from '@azure/msal-react';
import { ProfileContent } from '../components/ProfileContent';
import { Typography, Container, Box } from '@mui/material';
//import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';

export const HomePage = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  //const theme = useTheme();

  // TODO: figure out how to use theme for backgroundColor of a Box rather
  // than hard coding the value

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [windowWidth]);

  return (
    <Box bgcolor="#2185ef">
      {/*background color should be set by theme*/}
      <Container
        maxWidth={'md'}
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          color: '#fff',
        }}
      >
        <Typography
          variant="h1"
          textAlign={'center'}
          gutterBottom
          sx={windowWidth < 550 ? { fontSize: '4em', mt: 3 } : {}}
        >
          Lorem ipsum dolor sit amet consectetur.
        </Typography>
        <Typography
          variant="h4"
          textAlign={'center'}
          mb={10}
          sx={windowWidth < 550 ? { fontSize: '2em', mt: 3 } : {}}
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
