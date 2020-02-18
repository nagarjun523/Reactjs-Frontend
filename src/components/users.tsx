import * as React from "react";


interface IProps {
    user? : string;
}

interface IState {
    newUser?: string;
    pickedUser?: string;
    users?: any;
    pickedUsers?: any;
    username?: any;
    submitted?:any;
    errMsg? : string;
    emptyUserList? :boolean;
    pickedUserEmpty? : boolean;
   
}
export class Users extends React.Component<IProps, IState> 
{
    constructor(props: IProps) {
        super(props);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.addUser = this.addUser.bind(this);
        this.removeUser = this.removeUser.bind(this);
        this.pickedUser = this.pickedUser.bind(this);
        this.state = {
            newUser : '',
            pickedUser: '',
            users : [],
            pickedUsers: [],
            errMsg : 'This value is required.',
            emptyUserList : true,
            pickedUserEmpty : true
            
        };
      }
   addUser(){
      this.setState({ submitted: true });
       if(this.state.newUser){
         let users = this.state.users.slice();
         users.push({
             'username' : this.state.newUser
            });
       this.setState({
        users : users,
        newUser : '',
        emptyUserList : false
       })
    }   
   };
   removeUser(_value: React.ReactNode){
    var list = [];
    var array = this.state.users; // make a separate copy of the array
    var arrayLenth =  array.length;
    for(var k = 0; k< arrayLenth; k++){
      list.push(array[k]['username']);
    }
    var index = list.indexOf(_value);
    array.splice(index, 1);
    this.setState({users: array});
    var pickedArray = [...this.state.pickedUsers]; // make a separate copy of the array
    var pickedIndex = pickedArray.indexOf(_value)
    pickedArray.splice(pickedIndex, 1);
    this.setState({pickedUsers: pickedArray});
   };
   pickedUser(e:React.ReactNode){     
     var users = this.state.users;
     var usersLength = users.length;
     // if(usersLength != 0){
        //  this.setState({
        //      pickedUsers : []
        //  })
        //var pickedUsers = [...this.state.pickedUsers];
    if(!this.state.pickedUser){
        var pickedUsers = [...this.state.users];
    }else{
        var pickedUsers = [...this.state.pickedUsers];
       
    }
    if(pickedUsers.length !=0){
        var pickedUser = pickedUsers[Math.floor(Math.random() * pickedUsers.length)];
        var userVal = pickedUsers.splice(pickedUser,1);
        this.setState({
            pickedUserEmpty : false,
            pickedUsers : pickedUsers,
            pickedUser: userVal[0].username
        })  
    }else{

    }
  
   };
   handleUserNameChange (e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            newUser : e.target.value,
            errMsg : ''
        });

   }
    public render(): JSX.Element
    {
      const { username,submitted} = this.state;
        return (
            <div className="container bg-light">
                <br></br>
                <h3 className="mb-5 text-primary">React-Typescript-Webpack Frontend Test Task</h3>
            <div className="row">
                <div className="col-md-6">
                <div className="card">
                    <div className="card-header">
                    <h5>Add User</h5>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" name="username" value={this.state.newUser} onChange={this.handleUserNameChange} className="form-control" id="username" aria-describedby="eusernameHelp" />
                                {submitted && !username &&
                                <div className="help-block text-danger">{this.state.errMsg}</div>}
                           </div>
                            <button type="button" onClick={this.addUser} className="btn btn-md btn-primary">Add</button>
                    
                        </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                <div className="card">
                    <div className="card-header">
                    <h5>Users List</h5>
                    </div>
                    <div className="">
                    <ul className="list-group">
                        {this.state.users.map((user: { username: React.ReactNode; }, i: React.ReactText) => 
                        <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                         <p >{user.username}</p>
                            <button className="btn btn-sm btn-primary" onClick={() => this.removeUser(user.username)}>Remove</button>
                            </li>
                            )}
                            { this.state.emptyUserList ?
                            (<span className="mx-2 mt-2 alert alert-danger"> Users not found. Please add it</span>) : 
                            (<span></span>)
                            }
                        </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-5 mb-5 offset-md-4 col-md-5">
               
                    <button className="btn btn-lg btn-primary" onClick={this.pickedUser}>Click here to pick user randomly</button>
                
                </div>
                <div className="offset-md-3 col-md-6">
                <div className="card">
                    <div className="card-header">
                    <h5>Picked User</h5>
                    </div>
                    <div className="">
                    <ul className="list-group">
                    
                            
                            { this.state.pickedUserEmpty ? 
                         (<span className="mx-2 mt-2 alert alert-danger">Not picked any users. Please click on random button</span>) :
                         ( <li className="list-group-item d-flex justify-content-between align-items-center">
                         {this.state.pickedUser}
                            </li>)    
                        }
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}
