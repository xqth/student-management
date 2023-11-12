import { Link } from 'react-router-dom';

function ClassCard({ classData, onDelete }) {
    return (
        <div className="col-md-6">
            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">{classData.name}</h5>
                    <p className="card-text">
                        <strong>ID:</strong> {classData.id}
                    </p>
                    <p className="card-text">
                        <strong>Code:</strong> {classData.code}
                    </p>
                    <p className="card-text">
                        <strong>Teacher ID:</strong> {classData.teacher_id}
                    </p>
                    <Link className="btn btn-primary" to={`/classes/${classData.id}`} style={{ marginRight: '5px' }}>
                        Edit
                    </Link>
                    <button className="btn btn-danger" onClick={() => onDelete(classData.id)}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ClassCard;
