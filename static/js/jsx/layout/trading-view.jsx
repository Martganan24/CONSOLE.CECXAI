import React, { useEffect} from 'react';
import { createChart } from 'lightweight-charts';
import io from 'socket.io-client';
import { useAppContext } from '../../AppContext';
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css'

// const backgroundRef = React.useRef(null); // Ref for the background element

const ChartComponent = () => {

  const { setCountdownText, setIsButtonDisabled, userData, resultData} = useAppContext();
  
  useEffect(() => {
    resultData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const chartContainerRef = React.useRef(null);
  let countdownInterval;

  useEffect(() => {
    const socket = io('https://chart-socket.dgccx.pro', {transports: ['websocket']});

    const chart = createChart(chartContainerRef.current, {
        layout: {
            textColor: '#d2d4cf',
            background: { type: 'solid', color: 'transparent' },
        },
        grid: {
            vertLines: {
                visible: false,
            },
            horzLines: {
                color: 'rgba(42, 46, 57, 0.5)',
                height: 100,
            },
        },
        rightPriceScale: {
            scaleMargins: {
              top: 0.3, // Adjust as needed to leave space for candles
              bottom: 0.3, // Adjust as needed to leave space for candles
            },
          },
          handleScroll: false, // Disable scrolling behavior
          handleScale: false, // Disable scaling behavior
          handleScaleSlider: false, // Disable the scaling slider
          timeScale: {
            timeVisible: true,
            secondsVisible: false,
            dateVisible: true,
            rightOffset: 5,
            
        },
        handleHover: false,
    });

    const candlestickSeries = chart.addCandlestickSeries();

    const volumeSeries = chart.addHistogramSeries({
        color: '#26a69a',
        // set the positioning of the volume series
        scaleMargins: {
            top: 0.8, // highest point of the series will be 70% away from the top
            bottom: 0,
        },
        priceLineVisible: false,
        priceLineSource: false,
        handleHover: false,
        priceFormat: {
          type: 'volume',
      },
      priceScaleId: '',
    });

    volumeSeries.priceScale().applyOptions({
        scaleMargins: {
            top: 0.8, // highest point of the series will be 70% away from the top
            bottom: 0,
        },
    });

    

    const sma6 = chart.addLineSeries({
      color: 'rgba(184, 23, 93, 1)',
      lineWidth: 2,
      priceLineVisible: false,
      priceLineSource: false,
      handleHover: false,
    });

    const sma12 = chart.addLineSeries({
      color: 'rgba(58, 180, 185, 1)',
      lineWidth: 2,
      priceLineVisible: false,
      priceLineSource: false,
      handleHover: false,
    });

    chart.timeScale().applyOptions({
      barSpacing: 20,
    })

     const handleREzise = () => {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
      });
     }

     window.addEventListener('resize', handleREzise);
    
    socket.on('candlestickData', (data) => {

      const candlestickData = data.map((item) => ({

        volume: item.volume,
        time: item.timestamp / 1000,
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
        disabled: item.disabled,
      }));

      updateCountdown(data[data.length - 1].timestamp, candlestickData);
      setIsButtonDisabled(data[data.length - 1].disabled);

      candlestickSeries.setData(candlestickData);
      volumeSeries.setData(candlestickData.map((item) => item.volume));
      sma6.setData(calculateSMA(candlestickData, 6));
      sma12.setData(calculateSMA(candlestickData, 12));
    });

    return () => {
      clearInterval(countdownInterval);
      if (chart) {
        chart.remove();
      }
      if (socket) {
        socket.disconnect();
      }
      window.removeEventListener('resize', handleREzise);
    };


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updateCountdown(lastTimestamp, candlestickData) {
    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
      const currentTime = Date.now();
      const timeUntilNextInterval = lastTimestamp + 30000 - currentTime;
      userData();
      resultData();
      
      if (timeUntilNextInterval <= 0) {
        clearInterval(countdownInterval);
        userData();
        

      } else {
        const seconds = Math.floor((timeUntilNextInterval / 1000) % 60);
        setCountdownText(seconds);
      }
    }, 1000);
  }
  
  function calculateSMA(data, count){
    var avg = function(data) {
      var sum = 0;
      for (var i = 0; i < data.length; i++) {
         sum += data[i].close;
      }
      return sum / data.length;
    };
    var result = [];
    for (var i=count - 1, len=data.length; i < len; i++){
      var val = avg(data.slice(i - count + 1, i));
      result.push({ time: data[i].time, value: val});
    }
    return result;
  }
  
  return (
    <div className="col-xl-9 col-lg-8 col-md-12 col-xxl-8 ph-mo animate__animated animate__fadeInDown" style={{position: 'relative'}}>
        <div style={{margin: '10px 0px 0px 10px', position: 'absolute', zIndex: '5', display: 'flex'}}>
            <p style={{color: 'white', fontFamily: 'sans-serif', marginRight: '10px', backgroundColor: '#2b304d', padding: '2px 5px 2px 5px', borderRadius: '5px'}}>BTC/USDT</p>
            <p style={{color: 'white', fontFamily: 'sans-serif',backgroundColor: '#2b304d', padding: '2px 5px 2px 5px', borderRadius: '5px'}}>30s</p>
        </div>
        <div className="card chart-container no-gutters" ref={chartContainerRef} style={{width: '100%', height: "472px", position: 'relative'}} />
        
        <div className='child-logo no-gutters' />
    </div>
  );
};

export default ChartComponent;