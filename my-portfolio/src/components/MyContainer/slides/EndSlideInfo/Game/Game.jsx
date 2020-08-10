import React, {createRef, Fragment} from 'react'
import style from '../../../MyContainer.module.scss'
import rect from "../../../../../common/images/rect.png";
import Button from "antd/es/button";

class Graphic extends React.PureComponent {
    constructor(props) {
        super(props);
        this.paint = this.paint.bind(this);
        this.state = {
            isEnd: this.props.isEnd,
        }
    }
    componentDidMount(){
        this.paint();
    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps.isEnd !== this.props.isEnd){
            this.setState({
                isEnd: this.props.isEnd,
            });
        }
        this.paint();
    }

    paint() {
        function inRad(num) {
            return num * Math.PI / 180;
        }
        const { width, height, yPos, pipe, xPos } = this.props
        const context = this.refs.canvas.getContext("2d")
        context.clearRect(0, 0, width, height)
        if(this.state.isEnd){
            context.font = '30pt Muller'
            context.fillStyle = "white"
            context.fillText('START GAME',20,50)
            context.font = '15pt Muller'
            context.fillText('Click for jump',20,100)
        }
        else{
            for(let i = 0; i < pipe.length; i++) {
                context.fillRect(pipe[i].x, pipe[i].y, 50, 50)
            }
            context.save()
            context.fillStyle = "white"
            context.fillRect(xPos, yPos, 50, 50)
            context.fillStyle = "orange"
            context.fillRect(xPos, yPos, 50, 10)
            context.fillStyle = "blue"
            context.fillRect(xPos + 30, yPos + 20, 10, 10)
            context.fillStyle = "white"
            context.fillText(`JOB`, 520, 32)
            context.beginPath();
            context.moveTo(580,25);
            context.lineTo(570,35);
            context.lineTo(570,15);
            context.fill();
            context.fillText(`Score: ${this.props.score}`, 20, 30)
            context.restore()
        }
    }

    render() {
        const { width, height } = this.props;
        return (
            <canvas
                ref="canvas"
                width={width}
                height={height}
                onClick={this.props.handleClick}
                className={style.game}
            />
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pipe: [
                {
                    x : 600,
                    y : 150,
                },
                {
                    x : 900,
                    y : 150,
                },
            ],
            yPos: 150.3,
            xPos: 50,
            grav: 1.5,
            jump: false,
            isEnd: true,
            score: 0,
        }
        this.tick = this.tick.bind(this)
        this.pushPipe = this.pushPipe.bind(this)
        this.setEnd = this.setEnd.bind(this)
        this.start = this.start.bind(this)
    }
    setEnd(){
        this.setState({
            isEnd: true,
        })
    }
    start(){
        this.setState({
            isEnd: false,
        })
    }

    componentDidMount() {
        requestAnimationFrame(this.tick)
    }
    componentDidUpdate(prevProps,prevState) {
        if (prevProps.isEnd !== this.props.isEnd) {
            this.setState({
                isEnd: this.props.isEnd,
            });
        }
    }

    moveUp = () => {
        if(this.state.yPos>=150){
          this.setState({
                grav: -1.8,
                jump: true,
            })
            setTimeout( ()=>{this.setState({
                grav: 1.5,
                jump: false
            })}, 1100)
        }
    }

    tick() {
        if(!this.state.isEnd) {
            if (((((this.state.xPos + 50) <= (this.state.pipe[0].x + 50)) && ((this.state.xPos + 50) >= (this.state.pipe[0].x))) ||
                ((this.state.xPos >= this.state.pipe[0].x) && (this.state.xPos <= (this.state.pipe[0].x + 50)))) &&
                (((this.state.yPos + 50) >= (this.state.pipe[0].y)) && (this.state.yPos !== 150))) {
                this.setEnd()
                this.setState({
                    pipe: [
                        {
                            x : 600,
                            y : 150,
                        },
                        {
                            x : 900,
                            y : 150,
                        },
                    ],
                    yPos: 150.3,
                    xPos: 50,
                    grav: 1.5,
                    jump: false,
                    isEnd: true,
                    score: 0,
                })
            }
            const yPos = (this.state.yPos < 150 || this.state.grav < 0) ? (this.state.yPos + this.state.grav) : this.state.yPos
            this.setState({yPos})
            for (let i = 0; i < this.state.pipe.length; i++) {
                this.setState({
                    pipe: this.state.pipe.map((pipe) => {
                        if (pipe !== this.state.pipe[i]) {
                            return pipe
                        } else {
                            return {
                                x: this.state.pipe[i].x - 2.2,
                                y: this.state.pipe[i].y
                            }
                        }
                    })
                })
                if (this.state.pipe[i].x <= -50) {
                    this.pushPipe()
                    this.setState({
                        score: this.state.score + 1,
                    })
                }
            }
        }
        requestAnimationFrame(this.tick)
    }

    pushPipe() {
        this.setState({
            pipe: [this.state.pipe[this.state.pipe.length - 1], {
                x: 600,
                y: 150,
            } ]
        })
    }

    render() {
        return <div className={style.gameBlock + ` ${this.props.animationFlag?style.Anim:style.AnimExit}`}>
                    <Graphic width={600} height={200}
                             yPos={this.state.yPos}
                             xPos={this.state.xPos}
                             pipe={this.state.pipe}
                             isEnd={this.state.isEnd}
                             handleClick={this.moveUp}
                             pushPipe={this.pushPipe}
                             score={this.state.score}
                    />
                    <br/>
                    <Button onClick={()=>{
                            this.setState({
                                isEnd: !this.state.isEnd,
                            })
                    }}>
                        {this.state.isEnd?'Start':'Pause'}
                    </Button>
            </div>
    }
}

export default Game