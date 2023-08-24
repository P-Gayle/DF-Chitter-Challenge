import { useEffect, useState } from "react";
import PeepDetails from '../components/Peep/PeepDetails';
import WhatsHappening from "../components/WhatsHappening/Whatshappening";
import { Link } from "react-router-dom";
import { useAuthContext } from '../hooks/useAuthContext'
import { fetchPeeps } from '../utils/fetchPeeps';

const Home = () => {
    const [peeps, setPeeps] = useState(null)
    const [loading, setLoading] = useState(true);
    const {user} = useAuthContext()

    useEffect(() => {
  
        const fetchPeepsAndSetState = async () => {
            try {
                const fetchedPeeps = await fetchPeeps(); // Call the fetchPeeps function
                setPeeps(fetchedPeeps);
            } catch (error) {
                console.error(error);         
            } finally {
                setLoading(false);
            }
        }   

        fetchPeepsAndSetState();
    }, [])

    if (loading) {
        return <p style={{ color: 'rgb(13, 209, 243)' }}>Hang tight! Peeps are loading. May take up to 30 seconds...</p>;
    }

    return (
        <div className="home">
            <div className="peeps">

                {/* only maps if there are peeps */}
                {peeps && peeps.map((peep) => (
                    <PeepDetails key={peep._id} peep={peep} />  
                ))}
                    <Link to="/add"><button className="addPeep-button">Add Peep</button></Link>       
            </div>
            
            <WhatsHappening />              
        </div>   
    )
}

export default Home;