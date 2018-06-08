import React, { Component } from 'react';


class Executive extends Component {
    constructor() {
        super();
        this.state = {
          data: []
        }; 
    }

    componentDidMount() {
        fetch('/allexecutive')
          .then( 
            res =>res.json()
          )
          .then(data => this.setState({data}, () => console.log('Data fetched...', data)));
    }
  
    render() {
        return (
            <div>
              <div className="center">
                <table className="center">
                  <tbody>
                    <tr>
                     <th>Ser.no</th>
                     <th>Name</th>
                     <th>Mobile No.</th>
                     <th>Employee ID</th>
                    </tr>
                     {this.state.data.map(data =>
                      <tr key={data.id}>
                        <td>  {data.id}</td>
                        <td>  {data.name} </td>
                        <td>  {data.executive_mobile_no}</td>
                        <td>  {data.executive_id}</td>
                      </tr>
                        )}
                  </tbody>
                </table>
              </div>
            </div>
        )
    }
}
export default Executive;