import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useStore } from "../../stores/store";
import { useEffect } from "react";
import InitialLoader from "../../components/InitialLoader";
import './style.css';

const Theatres = () => {
    const { theatreStore } = useStore();
    const { getTheatres, loading, theatres, deleteTheatre } = theatreStore;

    useEffect(() => {
        getTheatres();
    }, []);

    if (loading) return <InitialLoader adding="theatres"/>

    return (
        <div className="allTheatresContainer">
            <table className="table table-dark table-striped">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Phone number</th>
                        <th scope="col">Year of creation</th>
                        <th scope="col">Manager's email</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        theatres.length > 0 ? (
                            theatres.map(theatre => (
                                <tr key={theatre.id}>
                                    <td>{theatre.name}</td>
                                    <td>{theatre.address}</td>
                                    <td>{theatre.phoneNumber}</td>
                                    <td>{theatre.yearOfCreation}</td>
                                    <td>{theatre.managerEmail}</td>
                                    <td>
                                        <Link className="btn btn-outline-light tableButtons" to={`/admin/theatres/${theatre.id}/edit`}>Edit</Link>
                                        <button className="btn btn-outline-light tableButtons" onClick={() => deleteTheatre(theatre.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6}>No theatres found</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default observer(Theatres);