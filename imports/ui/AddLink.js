import React from 'react';
import Model from 'react-modal';
import { Meteor } from  'meteor/meteor';
export default class AddLink extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      url:'',
      isOpen: false,
      error: ''

    }
  }
  
  onLogout (){
         Accounts.logout();
  }
  onSubmit(e){

      const {url} = this.state;
    

     e.preventDefault();

 
        Meteor.call('links.insert',url,(err,res)=>{
          if(!err){
            this.handleModelClose()
          } else {
            this.setState({error: err.reason});
          }
        })
    

   

  }
  onChange (e){
      
      this.setState({
        url: e.target.value.trim()
      })
  }


  handleModelClose(){

    this.setState({
      url:'',
      isOpen: false,
       error: ''})

  }

  render(){
        return (
            <div>
              <button className='button' onClick={()=> this.setState({isOpen: true})}> + Add Link </button>
             <Model 
               isOpen={this.state.isOpen}
               contentLabel="Add link"
               onAfterOpen={()=> this.refs.url.focus()}
               onRequestClose={this.handleModelClose.bind(this)}
               className="boxed-view__box"
               overlayClassName='boxed-view boxed-view--modal'
               >
               <h1> Add Link </h1>
                {this.state.error ? <p>{this.state.error}</p> : undefined}
            <form className='boxed-view__form' onSubmit={this.onSubmit.bind(this)}>
              <input
               type='text' 
               placeholder='URL' 
               ref="url"
               value={this.state.url}
               onChange={this.onChange.bind(this)} />
              <button className='button '> Add Link </button>
               <button type='button' className='button button--secondary' onClick={this.handleModelClose.bind(this)}> Cancel </button>
            </form>
           
             </Model>
            </div>
        )
    }
    
}