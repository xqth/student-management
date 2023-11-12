import { Link } from 'react-router-dom';

function UserCard({ user, onDelete }) {
    return (
        <div className="col-md-6 mb-3">
            <div className="card">
                <div className="card-body">
                    <img
                        src={user.avatar}
                        className="img-fluid rounded-circle mb-3"
                        alt="User Avatar"
                        style={{ width: '100px', height: '100px' }}
                    />
                    <h5 className="card-title">{user.name}</h5>
                    <p className="card-text">
                        <strong>ID:</strong> {user.id}
                    </p>
                    <p className="card-text">
                        <strong>Email:</strong> {user.email}
                    </p>
                    <p className="card-text">
                        <strong>Role:</strong> {user.role[0].toUpperCase() + user.role.slice(1)}
                    </p>
                    <p className="card-text">
                        <strong>Gender:</strong> {user.gender[0].toUpperCase() + user.gender.slice(1)}
                    </p>
                    <p className="card-text">
                        <strong>Birthday:</strong> {user.birthday}
                    </p>
                    <p className="card-text">
                        <strong>Address:</strong> {user.address}
                    </p>
                    <p className="card-text">
                        <strong>Phone:</strong> {user.phone}
                    </p>
                    <Link className="btn btn-primary" to={`/users/${user.id}`} style={{ marginRight: '5px' }}>
                        Edit
                    </Link>
                    <button className="btn btn-danger" onClick={() => onDelete(user.id)}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserCard;
