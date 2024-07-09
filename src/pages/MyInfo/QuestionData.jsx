import { useContext, useEffect, useState } from "react";
import { AuthContex } from "../../Provider/AuthProvider";
import { useSpring, animated } from '@react-spring/web'

const QuestionData = () => {
    const [todayQuestions, setTodayQuestion] = useState([])
    const [thisMonthQuestions, setThisMonthQuestions] = useState([])
    const {questions} = useContext(AuthContex);

    useEffect(()=>{
        const today = new Date().toISOString().split('T')[0]
        if(questions?.length){
            const filterdToday = questions.filter(item => item.createdAt.slice(0,10) == today);
            const filterdThisMonth = questions.filter(item => item.createdAt.slice(5,7) == today.slice(5,7));
            setThisMonthQuestions(filterdThisMonth.length)
            setTodayQuestion(filterdToday.length)
        }
    }, [questions])

    const springs = useSpring({
        from: { y: 350 },
        to: { y: 0 },
    })

    return (
        <animated.div className="textbox my-4" style={{...springs}}>
            <div className="title_box">
                <h3>Question</h3>
            </div>
            <div className="total_view_box">
                <div className="view_box">
                    <p>Today</p>
                    <p className="amount">{todayQuestions || 0}</p>
                </div>
                <div className="view_box">
                    <p>This Month</p>
                    <p className="amount">{thisMonthQuestions || 0}</p>
                </div>
                <div className="view_box">
                    <p>Total Added</p>
                    <p className="amount">{questions.length || 0}</p>
                </div>
            </div>
        </animated.div>
    );
};

export default QuestionData;