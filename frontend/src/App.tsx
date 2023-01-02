import { Box } from '@mui/material';
import { HomePage } from './pages/HomePage';
import { UpdateUser } from './pages/UpdateUser';
import { Chats } from './pages/Chats';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Box>
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
          <Route path="/chats" element={<Chats />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
