import { Box } from '@mui/material';
import { HomePage } from './pages/HomePage';
import { UpdateUser } from './pages/UpdateUser';
import { Chats } from './pages/Chats';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Box>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/update-user" element={<UpdateUser />} />
          <Route path="/chats" element={<Chats />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
