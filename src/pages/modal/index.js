import React from 'react'

export default class Modals extends React.Component{
   state={
       visible:false
   };
   showModal=()=>{
       this.setState({
           visible:true
       })
   }
   handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
    render(){
        return(
            <div>
                a
            </div>
        )
    }
}