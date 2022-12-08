import { PageLayout } from '../components/PageLayout';
import Background from '../components/Background';
import { AuthenticatedTemplate } from '@azure/msal-react';
import { ProfileContent } from '../components/ProfileContent';
import { Grid, Typography } from '@mui/material';

export const HomePage = () => {
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
      >
        <Typography variant="h1" gutterBottom textAlign={'center'} color="#fff">
          Lorem ipsum dolor sit amet consectetur.
        </Typography>
        <Typography
          variant="h4"
          textAlign={'center'}
          color="#fff"
          mb={6}
          mx={10}
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui neque
          quos enim praese
        </Typography>
        <PageLayout>
          <AuthenticatedTemplate>
            <ProfileContent />
          </AuthenticatedTemplate>
        </PageLayout>
      </Grid>
    </Background>
  );
};
