import { useContext } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { AuthContex } from "./AuthProvider";

const PrivetRoute = ({children}) => {
    const {user, loading} = useContext(AuthContex);
    if (loading){
        return <h3 className="mt-5 text-center text-secondary">Loading ...</h3> ;
    }
    if (user){
        return children;
    }
    return <Navigate to="/login"></Navigate>
};

export default PrivetRoute;
PrivetRoute.propTypes ={
    children: PropTypes.node
}