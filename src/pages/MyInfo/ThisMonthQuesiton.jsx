
import CanvasJSReact from '@canvasjs/react-charts';
import { useContext, useEffect, useState } from 'react';
import { AuthContex } from '../../Provider/AuthProvider';
import { useSpring, animated } from '@react-spring/web'

const ThisMonthQuesiton = () => {
    const [grapDataTotalView, setGrapDataTotalView] = useState([])
    const [thisMonthTotalAdded, setThisMonthTotalAdded] = useState(0)
    const {questions, reportQuestionData} = useContext(AuthContex);
    
    useEffect(()=>{
        const today = new Date().toISOString().split('T')[0]
        if(questions.length){
            const filterdThisMonth = questions.filter(item => item.createdAt.slice(5,7) == today.slice(5,7));
            setThisMonthTotalAdded(filterdThisMonth.length);
        }
    }, [questions])

    useEffect(()=>{
        const today = new Date().toISOString().split('T')[0]
        if(reportQuestionData?.length){
            let arr= [];
            for(let i=0; i<reportQuestionData.length; i++){
                let questionData = reportQuestionData[i]?.questionsAdded;
                const filterdThisMonth = questionData.filter(item => item.createdAt.slice(5,7) == today.slice(5,7));
                const obj = {y: Number(((filterdThisMonth.length/thisMonthTotalAdded)*100).toFixed(2)), label:`${questionData[questionData.length-1].createdBy} (${filterdThisMonth.length})`};
                arr.push(obj)
                if(reportQuestionData.length == arr.length){
                    setGrapDataTotalView(arr)
                }
            }
        }

        
    },[reportQuestionData, thisMonthTotalAdded])
    const options = {
        theme: "light1",
        animationEnabled: true,
        exportFileName: `Monthly Report - ${Date.parse(window.Date())}`,
        exportEnabled: true,
        data: [{
            type: "pie",
            indexLabelFontSize: 16,		
            startAngle: 90,
            dataPoints: grapDataTotalView
        }]
    }
    const springs = useSpring({
        from: { x: -350 },
        to: { x: 0 },
    })

    return (
        <animated.div className="textbox my-4" style={{...springs}}>
            <div className="title_box">
                <h3>This Month Question</h3>
            </div>
            {grapDataTotalView.length !=0 &&
            <div className="total_view_box grap">
                <CanvasJSReact.CanvasJSChart options = {options}/>
            </div>}
        </animated.div>
    );
};

export default ThisMonthQuesiton;