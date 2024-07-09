
import CanvasJSReact from '@canvasjs/react-charts';
import { useContext, useEffect, useState } from 'react';
import { AuthContex } from '../../Provider/AuthProvider';
import { useSpring, animated } from '@react-spring/web'

const TodayQuestionReport = () => {
    const [grapDataTotalView, setGrapDataTotalView] = useState([])
    const [todayTotalAdded, setTodayTotalAdded] = useState(0)
    const {questions, reportQuestionData} = useContext(AuthContex);

    useEffect(()=>{
        const today = new Date().toISOString().split('T')[0]
        if(questions.length){
            const filterdToday = questions.filter(item => item.createdAt.slice(0,10) == today);
            setTodayTotalAdded(filterdToday.length);
        }
    }, [questions])

    useEffect(()=>{
        const today = new Date().toISOString().split('T')[0]
        if(reportQuestionData?.length){
            let arr= [];
            for(let i=0; i<reportQuestionData.length; i++){
                let questionData = reportQuestionData[i]?.questionsAdded;
                const filterdToday = questionData.filter(item => item.createdAt.slice(0,10) == today);
                const obj = {y:  Number(((filterdToday.length/todayTotalAdded)*100).toFixed(2)), label:`${reportQuestionData[i].createdBy} (${filterdToday.length})`};
                arr.push(obj)
                if(reportQuestionData.length == arr.length){
                    setGrapDataTotalView(arr)
                }
            }
        }

        
    },[reportQuestionData, todayTotalAdded])

    const options = {
        theme: "light1",
        animationEnabled: true,
        exportFileName: `daily_report_${new Date().toISOString().split('T')[0]}`,
        exportEnabled: true,
        data: [{
            type: "pie",
				indexLabel: "{label}: {y}%",		
				startAngle: 0,
            dataPoints: grapDataTotalView
        }]
    }

    const springs = useSpring({
        from: { y: 350 },
        to: { y: 0 },
    })


    return (
        <animated.div className="textbox my-4" style={{...springs}}>
            <div className="title_box">
                <h3>Today Question</h3>
            </div>
            {grapDataTotalView.length !=0 &&
            <div className="total_view_box">
                <CanvasJSReact.CanvasJSChart options = {options} width={"100px"}/>
            </div>}
        </animated.div>
    );
};

export default TodayQuestionReport;