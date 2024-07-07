import React,{Component} from "react";

class Counter extends Component {

    constructor(props) {
        super(props);
        this.state = {
             count :0
        }
    }

    increment() {

        this.setState((prev) => ({
            count : prev.count + 1
        }),() => console.log("the callbacak value:" + this.state.count));

        console.log("the counter at the end is :" + this.state.count)
    }
n
    incrementFive() {
        this.increment();
        this.increment();
        this.increment();
    }
    render() {
        return (
            <div>
                <div> Count - {this.state.count} </div>
                <button onClick={() => this.incrementFive()}>INcrement</button>
             </div>
        )
    }
}

export default Counter