import { Box } from '@mui/material';
import { HomePage } from './pages/HomePage';
import { UpdateUser } from './pages/UpdateUser';
import { Chats } from './pages/Chats';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <Box>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/update-user"
              element={
                <PrivateRoute>
                  <UpdateUser />
                </PrivateRoute>
              }
            />
            <Route
              path="/chats"
              element={
                <PrivateRoute>
                  <Chats />
                </PrivateRoute>
              }
            />
          </Routes>
        </QueryClientProvider>
      </Box>
    </Router>
  );
}

export default App;
