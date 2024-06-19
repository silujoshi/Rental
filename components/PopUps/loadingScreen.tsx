import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

const LoadingScreen = () => {
    const loadingScreen = useSelector((state: RootState) => state.payPop.loadingScreen)

    const loadingScreenStyle:any={
        width:"fitContent",
        height:"fitContent",
        display:loadingScreen?"block":"none",
        position:"fixed",
        top:"50%",
        left:"50%",
        bottom:"50%",
        right:"50%",
        zIndex:"5",
    }
    return (
        <div style={loadingScreenStyle}>
            <div className="spinner-border" role="status">
                <span className="sr-only"></span>
            </div>
        </div>
    )
}

export default LoadingScreen