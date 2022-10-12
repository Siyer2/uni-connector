import { PageLayout } from '../components/PageLayout';
import { AuthenticatedTemplate } from '@azure/msal-react';
import { ProfileContent } from '../components/ProfileContent';
import { Typography, Container, Box } from '@mui/material';
//import { useTheme } from '@mui/material/styles';

export const HomePage = () => {
  //const theme = useTheme();

  // TODO: figure out how to use theme for backgroundColor of a Box rather
  // than hard coding the value

  // NOTE: border and spacing starts to go funny below 523px

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
          //sx={{ fontSize: { lg: '3em', sm: '10em' } }}
        >
          Lorem ipsum dolor sit amet consectetur.
        </Typography>
        <Typography variant="h4" textAlign={'center'} mb={10}>
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
