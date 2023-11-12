function Error() {
    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-md-6 text-center mt-5">
                    <h1 className="display-1">404</h1>
                    <h2 className="display-4">Page Not Found</h2>
                    <p className="lead mt-5">
                        The page you are looking for might have been removed, had its name changed or is temporarily
                        unavailable.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Error;
