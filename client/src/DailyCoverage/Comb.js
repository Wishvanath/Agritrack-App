import React, { Component } from 'react';
import Dailycov from "../DailyCoverage/DailyCov";
import Select from "../DailyCoverage/Select";

class Comb extends Component{
    constructor(){
        super();
    }
   
    
    handleAddid(id){
        console.log(id);
        this.render()
            return(
                <div>
                    <h1>hello</h1>
                    </div>
            )
   
    }
    render(){ 
        console.log();
        <Dailycov pro={this.handleAddid.bind(this)}/>
        return(
            <div>
                <Dailycov pro={this.handleAddid.bind(this)}/>
                <Select />
                </div>
        )
    }
}

export default Comb;