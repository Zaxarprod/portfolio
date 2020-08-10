import React, {useState} from "react"
import style from '../../../MyContainer.module.scss'
import RightSquareOutlined from "@ant-design/icons/lib/icons/RightSquareOutlined";
import InstagramOutlined from "@ant-design/icons/lib/icons/InstagramOutlined";
import GoogleOutlined from "@ant-design/icons/lib/icons/GoogleOutlined";
import FacebookOutlined from "@ant-design/icons/lib/icons/FacebookOutlined";
import GithubOutlined from "@ant-design/icons/lib/icons/GithubOutlined";
import LeftSquareOutlined from "@ant-design/icons/lib/icons/LeftSquareOutlined";
import CloseSquareOutlined from "@ant-design/icons/lib/icons/CloseSquareOutlined";

const SN = () => {
    const [isClosed, setIsClosed] = useState(false)
    const [isAnim, setIsAnim] = useState(false)
    return (
        <div className={style.SNblock}>
            <div className={style.SNbutton}
                 onClick={()=>{
                     if(!isAnim && isClosed){

                     }
                     else if(!isAnim){
                         setIsClosed(!isClosed)
                         setTimeout(()=>{
                             setIsAnim(!isAnim)
                         },800)
                     }
                     else{
                         setIsClosed(!isClosed)
                         setIsAnim(!isAnim)
                     }

                 }}>
                {(isClosed && isAnim)?<RightSquareOutlined />:<CloseSquareOutlined />}
            </div>
            <div className={style.SNlist + ` ${!isClosed?style.SNlistFull:style.SNlistShort}`}>
                <a href={'#'}>
                    <GithubOutlined />
                </a>
                <a href={'#'}>
                    <InstagramOutlined />
                </a>
                <a href={'#'}>
                    <GoogleOutlined />
                </a>
                <a href={'#'}>
                    <FacebookOutlined />
                </a>
            </div>
        </div>
    )
}

export default SN