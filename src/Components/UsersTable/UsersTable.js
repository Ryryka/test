import React, { Component } from 'react';
import axios from 'axios';
import './usersTable.css'

/** Component representing a TableHeader.*/
const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>Фамилия</th>
                <th>Имя</th>
                <th>Отчество</th>
                <th>Телефон</th>
                <th>E-mail</th>
            </tr>
        </thead>
    );
}

/** Component representing a TableBody.*/
const TableBody = props => {
    const rows = props.users.map((user, index) => {
        return (
            <tr key={index}>
                <td>{user.last_name}</td>
                <td>{user.first_name}</td>
                <td>{user.middle_name}</td>
                <td>{user.phone_numbers.map(num => num.number)}</td>
                <td>{user.email}</td>
            </tr>
        );
    });
    return <tbody>{rows}</tbody>;
}
/** Component representing a Table with users data. */
class UsersTable extends Component {
    /**    
    * @param {string} type - The request type.
    * @param {string} token - The token received at login.
    * @param {number} count - The count of users.
    * @param {number} skip - The number of users from the beginning of the list to skip.
    * @param {number} limit - The number of users to display.
    */
    constructor(props) {
        super(props);

        const user = JSON.parse(localStorage.getItem('user'));

        this.initialState = {
            type: 'count_user',
            token: user.token,
            count: '',
            skip: 0,
            limit: 18,
            users: []
        };
        this.state = this.initialState;
    }

    componentDidMount() {     
        const { type, token } = this.state;
       
        axios.post('http://194.187.110.62:20001/command', { type, token })
            .then(res => {
                const count = res.data.count;
                this.setState({ limit: count, count });
            })
            .then(() => {
                const { skip, limit } = this.state;
                const type = "read_user"
                axios.post('http://194.187.110.62:20001/command', { type, token, skip, limit })
                    .then(res => {
                        const users = res.data.data;
                        this.setState({ users });
                    })
            });
    }
    render() {
        const { users } = this.state
        return (
            <div>
                <p className="users-count"> Общее число пользователей: {this.state.count}</p>
                <table className="users-table">
                    <TableHeader />
                    <TableBody users={users} />
                </table>
            </div>

        );
    }
}
export default UsersTable