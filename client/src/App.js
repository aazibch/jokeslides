import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import CreateNewJoke from './pages/CreateNewJoke/CreateNewJoke';
import EditJoke from './pages/EditJoke/EditJoke';
import Logout from './pages/Logout/Logout';
import Layout from './components/Layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner/LoadingSpinner';
import Modal from './components/UI/Modal/Modal';
import PageOffsetContainer from './components/UI/PageOffsetContainer/PageOffsetContainer';
import AuthContext from './store/auth-context';

function App() {
    const authCtx = useContext(AuthContext);

    return (
        <Layout>
            {authCtx.loadingUser ? (
                <PageOffsetContainer>
                    <LoadingSpinner />
                </PageOffsetContainer>
            ) : (
                <Routes>
                    <Route path="/">
                        <Route path=":id" element={<Home />} />
                        <Route path="" element={<Home />} />
                    </Route>
                    {!authCtx.loggedInUser && (
                        <Route path="/login" element={<Login />} />
                    )}
                    {authCtx.loggedInUser && (
                        <>
                            <Route path="/logout" element={<Logout />} />
                            <Route
                                path="create-new-joke"
                                element={<CreateNewJoke />}
                            />
                            <Route path="/:id/edit" element={<EditJoke />} />
                        </>
                    )}
                    <Route
                        path="*"
                        element={
                            <Modal
                                title="Error"
                                content="The page you are looking for does not exist."
                            />
                        }
                    />
                </Routes>
            )}
        </Layout>
    );
}

export default App;
