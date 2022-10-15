import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Layout from './components/Layout/Layout';

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/">
                    <Route path=":id" element={<Home />} />
                    <Route path="" element={<Home />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </Layout>
    );
}

export default App;
