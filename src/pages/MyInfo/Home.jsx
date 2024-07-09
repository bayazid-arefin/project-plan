import { useContext, useState } from "react";
import { AuthContex } from "../../Provider/AuthProvider";
import QuestionData from "./QuestionData";
import StartSpeach from "./StartSpeach";
import ThisMonthQuesiton from "./ThisMonthQuesiton";
import TodayQuestionReport from "./TodayQuestionReport";

const Home = () => {
    const {logOut} = useContext(AuthContex);
    const [count, setCount] = useState(0);
    
    const handelCount = num =>{
        setCount(num)
    }
    const {questions, reportQuestionData} = useContext(AuthContex);

    
    return (
        <>
        {questions?.length && reportQuestionData.length ? 
        <section>
            <header className="text-center text-white bg-dark p-5 m-0">
                <h1>My Project</h1>
                <div className="button_box mt-4">
                    <button className="btn btn-secondary" onClick={()=>{handelCount(count - 1)}} disabled={count == 0}>Previous Page</button>
                    <button className="btn btn-primary" onClick={()=>{handelCount(count + 1)}} disabled={count == 3}>Next Page</button>
                </div>
            </header>
            <div className="container py-5">
                {count == 0 && <StartSpeach/>}
                {count == 1 && <QuestionData/>}                      
                {count == 2 && <TodayQuestionReport/>}            
                {count == 3 && <ThisMonthQuesiton/>}            
            </div>
            <footer className="text-center mt-3 text-white bg-dark p-5 m-0">
                <p className="m-0"><span onClick={logOut} style={{"cursor":"pointer"}}>Log Out</span></p>
            </footer>
        </section>
        :
        <h3 className="mt-5 text-center text-secondary">Loading ...</h3> 
        }
        </>
        
    );
};

export default Home;