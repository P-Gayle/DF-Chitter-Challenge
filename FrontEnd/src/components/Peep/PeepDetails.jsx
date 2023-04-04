import '../Peep/peep.css'

//date fns to format the date in each peep
import { formatDistanceToNow, format, isBefore } from 'date-fns';

const PeepDetails = ({ peep }) => {
    const messageDate = new Date(peep.createdAt);
    const currentDate = new Date();

    const formattedDate =
        isBefore(messageDate, currentDate - 86400000)
        //86400000 is the number of milliseconds in 24 hours
      ? format(messageDate, 'MMMM d, yyyy h:mm aa')
      : formatDistanceToNow(messageDate, { addSuffix: true });

    return (
        <div className="peep-details">
            <p>{formattedDate}</p>
            <p>{peep.message}</p>            

        </div>
    )
}

export default PeepDetails;