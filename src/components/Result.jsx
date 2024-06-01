import React,{useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactConfetti from 'react-confetti';
import { FaArrowRight } from "react-icons/fa";

function Result() {

  const location = useLocation();
  const { data } = location.state;
  const [showResult, setShowResult] = useState(false);

  const navigate = useNavigate();

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
    const handleClick = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:4000/api/v1/fetch-data');
            const data = await response.json();
            setMessage(data.message);
            
            navigate('/courses')

        } catch (error) {
            console.error('Error fetching data from backend:', error);
            setMessage('Failed to fetch data');
        }
    };

  const [windowDimension, setDimension] = useState({width: window.innerWidth, height: window.innerHeight});

  const detectSize = () =>{
    setDimension({width: window.innerWidth, height: window.innerHeight});
  }
    useEffect (() =>{
    window.addEventListener('resize', detectSize);
    return ()=>{
    window.removeEventListener('resize', detectSize);
    }
    }, [windowDimension]);

    const resultHandler = () => {
      setShowResult(!showResult);
    }
    return (
    <>
    < ReactConfetti
    width={windowDimension.width}
    height={windowDimension.height}
    tweenDuration={100} />

    <div className='flex justify-center items-center flex-col gap-4 '>
      {
        loading ? (
          <div className="spinner flex justify-center items-center"></div>
        ):(
          <><h1 className='text-white font-semibold text-[30px]'>Prediction Results</h1><button className='group px-12 py-2 mt-12 w-fit rounded-full bg-richblack-800 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none overflow-x-hidden'
                  onClick={resultHandler}>
                  <p>Tap to see Results</p>
                </button>
      {
        showResult && <p className='text-richblack-100 text-[35px] overflow-x-hidden m-6'>{data}</p>
      }
      <button className='group flex justify-center px-16 py-3 mt-12 w-fit rounded-full bg-yellow-100 font-bold text-richblack-700 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none overflow-x-hidden '
      onClick={handleClick}>
        Click Here to Checkout courses <FaArrowRight className='mt-[5px] mx-2' />
    </button>
    </>
        )
      }
      
    </div>

    
    </>
  );
}

export default Result;
