
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
   
}
export class Users extends React.Component<IProps, IState> 
{
    constructor(props: IProps) {
        super(props);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.addUser = this.addUser.bind(this);
        this.removeUser = this.removeUser.bind(this);
        this.state = {
            newUser : '',
            pickedUser: '',
            users : [],
            pickedUsers: []
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
        newUser : ''
       })
    }   
   };
   removeUser(_value: React.ReactNode){
    var array = [...this.state.users]; // make a separate copy of the array
    var index = array.indexOf(_value)
    // if (index == -1) {
      array.splice(index, 1);
      this.setState({users: array});
    // }
    var pickedArray = [...this.state.pickedUsers]; // make a separate copy of the array
    var pickedIndex = pickedArray.indexOf(_value)
    // if (index == -1) {
    pickedArray.splice(pickedIndex, 1);
    this.setState({pickedUsers: pickedArray});
   };
   pickedUser(_value: React.ReactNode){     
     var users = [...this.state.users];
     var usersLength = users.length;
     // if(usersLength != 0){
       var pickedUser = users[Math.floor(Math.random()*users.length)];
       var userVal = pickedUser.username;
       var pickedUsers = [...this.state.pickedUsers];
       var userLength = pickedUsers.length;
       if(userLength == 0){
        pickedUsers.push({
             'username' : userVal
            });
            this.setState({
                pickedUsers : pickedUsers,
                pickedUser : ''
           })
        }else{
           for(var j = 0; j < userLength; j++){           
             if(pickedUsers[j]['username'] != userVal){
                 pickedUsers.push({
                 'username' : userVal
                });
                this.setState({
                    pickedUsers : pickedUsers,
                    pickedUser : ''
               })
             }else{
               return;
             }
        }
      }     
   };
   handleUserNameChange (e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            newUser : e.target.value
        });

   }
    public render(): JSX.Element
    {
      const { username,submitted} = this.state;
        return (
            <div className="container">
                <br></br>
            <div className="row">
                <div className="col-md-4">
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
                          <div className="help-block">This value is required.</div>}
                           </div>
                            <button type="button" onClick={this.addUser} className="btn btn-md btn-primary">Add</button>
                    
                        </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                <div className="card">
                    <div className="card-header">
                    <h5>Users List</h5>
                    </div>
                    <div className="">
                    <ul className="list-group">
                        {this.state.users.map((user: { username: React.ReactNode; }) => 
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                         <p onClick={() => this.pickedUser(user.username)}>{user.username}</p>
                            <button className="btn btn-sm btn-primary" onClick={() => this.removeUser(user.username)}>Remove</button>
                            </li>
                            )}
                        </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-1">
               
                    <button className="btn btn-sm btn-primary" onClick={() => this.pickedUser(this.state.pickedUsers)}>Random</button>
                
                </div>
                <div className="col-md-3">
                <div className="card">
                    <div className="card-header">
                    <h5>Picked User</h5>
                    </div>
                    <div className="">
                    <ul className="list-group">
                        {this.state.pickedUsers.map((user: { username: React.ReactNode; }) => 
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                         {user.username}
                            </li>
                            )}
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}
