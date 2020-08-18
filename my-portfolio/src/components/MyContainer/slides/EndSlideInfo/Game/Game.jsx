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
        const { width, height, yPos, pipe, xPos, wPlayer, hPlayer } = this.props
        const context = this.refs.canvas.getContext("2d")
        context.clearRect(0, 0, width, height)
        if(this.state.isEnd && !this.props.isDied){
            context.font = `${window.innerWidth>670?'30pt':'5vw'} Muller`
            context.fillStyle = "white"
            context.fillText('START GAME',(20/620)*width,0.25*height)
            context.font = `${window.innerWidth>670?'15pt':'3vw'} Muller`
            context.fillText('Click for jump',(20/620)*width,0.5*height)
        }
        else if(!this.state.isEnd && !this.props.isDied){
            for(let i = 0; i < pipe.length; i++) {
                context.fillStyle = "white"
                context.fillRect(pipe[i].x, pipe[i].y, pipe[i].w, pipe[i].h)
            }
            context.save()
            context.fillStyle = "white"
            context.fillRect(xPos, yPos, wPlayer, hPlayer)
            context.fillStyle = "orange"
            context.fillRect(xPos, yPos, wPlayer, hPlayer*0.2)
            context.fillStyle = "blue"
            context.fillRect(xPos + wPlayer*0.6, yPos + hPlayer*0.4, wPlayer*0.2, hPlayer*0.2)
            context.fillStyle = "white"
            context.font = `${window.innerHeight<450?'12pt':window.innerWidth>670?'15pt':'3vw'} Muller`
            context.fillText(`JOB`, (520/620)*width, (32/200)*height)
            context.beginPath();
            context.moveTo((580/620)*width,(25/200)*height);
            context.lineTo((570/620)*width,(35/200)*height);
            context.lineTo((570/620)*width,(15/200)*height);
            context.fill();
            context.fillText(`Score: ${this.props.score}`, (20/620)*width, (30/200)*height)
            context.fillText(`Record: ${this.props.highScore}`, (120/620)*width, (30/200)*height)
            context.restore()
        }
        else{
            context.font = `${window.innerWidth>670?'30pt':'5vw'} Muller`
            context.fillStyle = "red"
            context.fillText('YOU DIED',(20/620)*width,0.25*height)
            context.font = `${window.innerWidth>670?'15pt':'3vw'} Muller`
            context.fillText('Try again',(20/620)*width,0.5*height)
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
        this.height = window.innerHeight<450?window.innerHeight*0.5:
            (window.innerWidth>670)?200:window.innerWidth*0.88*(200/620)
        this.width = window.innerHeight<450?window.innerHeight*0.5*3.1:
            (window.innerWidth>670)?620:window.innerWidth*0.88
        this.state = {
            pipe: [
                {
                    x : this.width,
                    y : (160/200)*this.height,
                    w: (40/620)*this.width,
                    h: (40/200)*this.height,
                    name: 'laziness',
                },
            ],
            wPlayer: this.height*0.25,
            hPlayer: this.height*0.25,
            yPos: 0.75*this.height + 0.3,
            xPos: this.height*0.25,
            grav: 0.0075 * this.height,
            jump: false,
            isEnd: true,
            score: 0,
            highScore: 0,
            problems: ['laziness','unemployment','competition','bad luck'],
            isDied: false,
        }
        this.tick = this.tick.bind(this)
        this.pushPipe = this.pushPipe.bind(this)
        this.setEnd = this.setEnd.bind(this)
        this.start = this.start.bind(this)
    }
    setEnd(){
        this.setState({
            isEnd: true,
            isDied: true,
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
        if(this.state.yPos>=(this.height*0.75)){
          this.setState({
                grav: -(this.height*0.025),
                jump: true,
            })
            setTimeout( ()=>{this.setState({
                grav: (this.height*0.025),
                jump: false
            })}, 400)
        }
    }

    tick() {
        if(!this.state.isEnd) {
            if (((((this.state.xPos + this.state.wPlayer) <= (this.state.pipe[0].x + this.state.pipe[0].w)) && ((this.state.xPos + this.state.wPlayer) >= (this.state.pipe[0].x))) ||
                ((this.state.xPos >= this.state.pipe[0].x) && (this.state.xPos <= (this.state.pipe[0].x + this.state.pipe[0].w)))) &&
                (((this.state.yPos + this.state.hPlayer) >= (this.state.pipe[0].y)) && (this.state.yPos !== (this.state.hPlayer*3)))) {
                this.setEnd()
                this.setState({
                    pipe: [
                        {
                            x : this.width,
                            y : (160/200)*this.height,
                            w: (40/620)*this.width,
                            h: (40/200)*this.height,
                            name: this.state.problems[this.getRandomInt(3)],
                        },
                    ],
                    yPos: this.height*0.75 + 0.3,
                    xPos: this.height*0.25,
                    grav: 0.0075 * this.height,
                    jump: false,
                    isEnd: true,
                    score: 0,
                    problems: ['laziness','unemployment','competition','bad luck']
                })
            }
            const yPos = (this.state.yPos < (this.height*0.75) || this.state.grav < 0) ? (this.state.yPos + this.state.grav) : this.state.yPos
            this.setState({yPos})
            for (let i = 0; i < this.state.pipe.length; i++) {
                this.setState({
                    pipe: this.state.pipe.map((pipe) => {
                        if (pipe !== this.state.pipe[i]) {
                            return pipe
                        } else {
                            return {
                                x: this.state.pipe[i].x - (this.width*0.0064516129),
                                y: this.state.pipe[i].y,
                                w: this.state.pipe[i].w,
                                h: this.state.pipe[i].h,
                                name: this.state.pipe[i].name,
                            }
                        }
                    })
                })
                if (this.state.pipe[i].x <= -this.state.pipe[i].w) {
                    this.pushPipe(i)
                    this.setState({
                        score: this.state.score + 1,
                        highScore: ((this.state.score+1)>this.state.highScore)?(this.state.score + 1):this.state.highScore,
                    })
                }
            }
        }
        requestAnimationFrame(this.tick)
    }
    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    }
    pushPipe(i){
        let deltaX = +(this.getRandomInt(100))
        let deltaY_1 = (+(this.getRandomInt(12))/200)*this.height
        let pipe = this.state.pipe
        pipe.push({
            x: pipe[pipe.length-1].x + 0.88709677419*this.width + (deltaX/620)*this.width,
            y :(163/200)*this.height - deltaY_1,
            w: (40/620)*this.width,
            h: (37/200)*this.height + deltaY_1,
            name: this.state.problems[this.getRandomInt(3)]
        })
        //alert(pipe[pipe.length-1].name)
        pipe.splice(i,1)
        let deltaY_2 = (+(this.getRandomInt(12))/200)*this.height
        pipe.push({
            x: pipe[pipe.length-1].x + (300/620)*this.width + (this.getRandomInt(200)/620)*this.width,
            w: (40/620)*this.width,
            h: (37/200)*this.height + deltaY_2,
            y: (163/200)*this.height - deltaY_2,
            name: this.state.problems[this.getRandomInt(3)]
        })
        console.log(deltaX)
        this.setState({
            pipe: pipe,
        })
    }

    render() {
        return <div className={style.gameBlock + ` ${this.props.animationFlag?style.Anim:style.AnimExit}`}>
                    <Graphic width={this.width}
                             height={this.height}
                             yPos={this.state.yPos}
                             xPos={this.state.xPos}
                             pipe={this.state.pipe}
                             isEnd={this.state.isEnd}
                             handleClick={this.moveUp}
                             pushPipe={this.pushPipe}
                             score={this.state.score}
                             highScore={this.state.highScore}
                             isDied={this.state.isDied}
                             wPlayer={this.state.wPlayer}
                             hPlayer={this.state.hPlayer}
                    />
                    <br/>
                    <Button onClick={()=>{
                            this.setState({
                                isEnd: !this.state.isEnd,
                                isDied: false,
                            })
                    }}>
                        {this.state.isEnd?'Start':'Pause'}
                    </Button>
            </div>
    }
}

export default Game