import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function check (num,x)  {
    if(num < Math.pow(10,x-1)) {
        const tmp = Math.pow(10,x-1).toString().slice(1);
        return tmp + num.toString();
    } else {
        return num.toString();
    }
}

class Hello extends React.Component {
    render() {
        return (
            <h1>Hello, Visitor! Welcome to my site! </h1>
        );
    }
}

class ShowWorks extends React.Component {
    render() {
        let list = this.props.content.link.map( x =>
            <div>
                <a href={ x.url }>Click here to Enter { x.description } version</a>
                <br />
            </div>
        )
        return (
            <div className="show">
                <p>Project: { this.props.content.name }</p>
                { list }
            </div>
        );
    }
}

class FormattedDate extends React.Component {

    render() {
        const date = this.props.date;
        const year =  date.getFullYear().toString();
        const month = check(date.getMonth()+1,2);
        const day = check(date.getDate(),2);
        const hour = check(date.getHours(),2);
        const minute = check(date.getMinutes(),2);
        const second = check(date.getSeconds(),2);
        const timeOut = year + "/" + month + "/"
            + day + "  " + hour + ":"
            + minute + ":" + second;
        return <h3>{ timeOut }</h3>;
    }
}

class Clock extends React.Component {

    //初始化state为当前日期
    constructor(props) {
        super(props);
        this.state = { date: new Date()};
    }

    //当Clock组件挂载（mount）时，设置一个名为timerID的计时器，内容为timer函数的，间隔为1秒
    componentDidMount() {
        this.timerID = setInterval(
            () => this.timer(),
            1000
        );
    }

    //当Clock组件卸载（unmount）时，清除计时器timerID
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    //定义timer函数，用于获取当前时间
    timer() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div>
                <FormattedDate date = {this.state.date}/>
            </div>
        )
    }
}

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRunning: false,
            icon: "START",
            h: 0,
            m: 0,
            sec: 0,
            msec:0,
            record: []
        }
    }

    count = time => {
        let h = time.h;
        let m = time.m;
        let s = time.sec;
        let ms = time.msec;
        ms += 1;
        if(ms === 100) {
            s++;
            ms = 0;
        }
        if (s === 60) {
            m++;
            s = 0;
        }
        if (m === 60) {
            h++;
            m = 0;
        }
        this.setState(() => ({
            h: h,
            m: m,
            sec: s,
            msec: ms
        }))
    }

    outTime = () => {
        return (
            check(this.state.h, 2).toString()
            + ":" + check(this.state.m, 2).toString()
            + ":" + check(this.state.sec, 2).toString()
            + "." + check(this.state.msec, 2).toString()
        );
    }

    handleClickStart = () => {
        if(!this.state.isRunning) {
            this.timeID = setInterval(
                () => this.count(this.state),
                10
            );
            this.setState(() => ({
                isRunning: true,
                icon: "PAUSE"
            }))

        } else {
            clearInterval(this.timeID);
            this.setState(() => ({
                isRunning: false,
                icon: "START"
            }))
        }
    }

    handleClickRecord = () => {
        let tmp = this.state.record;
        tmp.push(this.outTime());
        this.setState(() => ({
            record: tmp
        }))
    }

    handleClickReset = () => {
        clearInterval(this.timeID);
        this.setState(() => ({
            isRunning: false,
            icon:"START",
            h:0,
            m:0,
            sec:0,
            msec:0,
            record:[]
        }))
    }

    render() {
        const out = this.state.record.map( x => <p key={x.toString()}>{ x }</p>);

        return (
            <div>
                <button onClick={ this.handleClickStart }>
                    { this.state.icon }
                </button>
                <button onClick={ this.handleClickRecord }>
                    RECORD
                </button>
                <button onClick={ this.handleClickReset }>
                    RESET
                </button>
                <h2> { this.outTime() }</h2>
                { out }
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: [
                {
                    name: "pickCardFgo",
                    link: [
                        {
                            description: "Vue",
                            url:"http://pickcard.net-labo.icu:2334"
                        },
                        {
                            description: "React",
                            url:"http://pickcard.net-labo.icu:2333"
                        }
                    ]
                },
                {
                    name: "ArkMelon",
                    link: [
                        {
                            description: "React",
                            url:"http://pickcard.net-labo.icu:3333"
                        },
                        {
                            description: "NotReady",
                            url:"/"
                        }
                    ]
                },

            ]
        }
    }
    render() {
        return(
            <div>
                <Hello />
                <Clock />
                <ShowWorks content={ this.state.content[0] }/>
                <ShowWorks content={ this.state.content[1] } />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
);