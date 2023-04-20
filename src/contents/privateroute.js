import { Redirect } from 'react-router-dom';

export default function PrivateRoute({ children }) {
    const authUser = sessionStorage.getItem('auth');
    if (!authUser) {
        console.log("Not logged in!")
        // not logged in so redirect to login page with the return url
        return <Redirect to="/Login" />
    }

    // authorized so return child components
    return children;
}