import React, { Component } from 'react';
class FieldEdit extends Component{
    constructor(){
        super();
        this.state = {
            data: []
        }
    }
    componentDidMount(){
        var id=this.props.id;
        console.log(id);
        console.log(12345672123456);
        fetch(`/fm/${id}`)
        .then(res =>res.json())
        .then(data => this.setState({data},() => console.log('Data Fetched.. ',data)));
   } 
//  select farm_details.farm_id,farmer_details.mobile_no,farm_details.state,farm_details.district,
//     farm_details.taluka,farm_details.village,farm_details.area,farm_details.contract_id,executive_details.executive_id,
//    executive_details.name,executive_details.executive_mobile_no
    render(){ 
        return( 
            <div>
                {this.state.data.map(data =>
                <div key={data.farm_id}>
                <h2>Farm Details</h2>
                <leble>Farmer Name: {data.farmer_name} </leble><br/>
                <leble>Mobile_No: {data.mobile_no} </leble><br/>
                <leble>State: {data.state} </leble><br/>
                <leble>District: {data.district} </leble><br/>
                <leble>Taluka: {data.taluka} </leble><br/>
                <leble>Village: {data.village} </leble><br/>
                <leble>Area: {data.area} </leble><br/>
                <leble>Contract_id: {data.contract_id} </leble><br/>
                
                <h2>Executive Details</h2>
                
                    <leble>Executive Name: {data.name}</leble><br/>
                    <leble>Executive Id: {data.executive_mobile_no}</leble><br/>
                    <leble>Executive Mobile_No: {data.executive_id}</leble>
                    </div>
                )}
            </div>
            
                
        )
        }

}

export default FieldEdit ;