import React,{Component} from "react";


class Footer extends Component {

    constructor(props) {
        super(props);
        this.state= {
            count : props.total
        }
    }
  changeMessage() {

      console.log(this.state.count);
      this.setState({
          count : this.state.count +1
      })
  }


    render() {
        return (
            <div>
                <button onClick={() => this.changeMessage()}>Subscribe</button>
            </div>
        )
    }



}

export default  Footer