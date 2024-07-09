import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import auth from "./firebase.init";

export const AuthContex = createContext(null);
const AuthProvider = ({children}) => {
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] =useState(true);
    // const [loggedUser, setLoggedUser] = useState('');

    const signInUser = (email, password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            unsubscribe()
        }
    },[])

    const logOut = () =>{
        setLoading(true);
        signOut(auth);
    }

    const [questions, setQuestions] = useState([]);
    useEffect(()=>{
        fetch("https://ae-mgmt.arefins-classroom.com/questions/all/admin-panel")
        .then(res => res.json())
        .then(data => {
            if(data.length){
                setQuestions(data)
            }})
    },[])

    const [reportQuestionData, setReportQuestionData] = useState([])
    useEffect(()=>{
        fetch("https://ae-mgmt.arefins-classroom.com/users/view")
        .then(res => res.json())
        .then(data => {
            if(data.length){
                let arr= [];
                for(let i=0; i<data.length; i++){
                    fetch(`https://ae-mgmt.arefins-classroom.com/question/employee-profile/${data[i]._id}`)
                    .then(res => res.json())
                    .then(itemData =>{
                        const obj = {createdBy: itemData[itemData.length-1]?.createdBy, questionsAdded: itemData}
                        arr.push(obj)
                        if(data.length == arr.length){
                            setReportQuestionData(arr)
                        }
                        
                    })
                }
            }
        })
    },[])


    const authInfo = {user, signInUser, logOut, loading, questions, reportQuestionData};
    return (
        <AuthContex.Provider value={authInfo}>
            {children}
        </AuthContex.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes ={
    children: PropTypes.node
}