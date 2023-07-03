import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { useEffect } from "react";
import InitialLoader from "../../components/InitialLoader";
import './style.css';
import { Link } from "react-router-dom";

const AdminFestivals = () => {
    const { festivalStore } = useStore();
    const { getFestivals, loading, festivals, deleteFestival } = festivalStore;

    useEffect(() => {
        getFestivals();
    }, []);

    if (loading) return <InitialLoader adding="festivals"/>

    return (
        <div style={{ minHeight: "100vh" }}>
            <table className="table table-dark table-striped">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Start Date</th>
                        <th scope="col">End Date</th>
                        <th scope="col">City</th>
                        <th scope="col">Zip code</th>
                        <th scope="col">Organizing theatre name</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        festivals.length > 0 ? (
                            festivals.map(festival => (
                                <tr key={festival.id}>
                                    <td>{festival.name}</td>
                                    <td>{festival.startDate.toLocaleDateString()}</td>
                                    <td>{festival.endDate.toLocaleDateString()}</td>
                                    <td>{festival.city}</td>
                                    <td>{festival.zipCode}</td>
                                    <td>
                                        {
                                            festival.organizer ?
                                            festival.organizer.name :
                                            "No theatre"
                                        }
                                    </td>
                                    <td>
                                        <Link className="btn btn-outline-light tableButtons" to={`/admin/festivals/${festival.id}/edit`}>Edit</Link>
                                        <button className="btn btn-outline-light tableButtons" onClick={() => deleteFestival(festival.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6}>No festivals found</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default observer(AdminFestivals);