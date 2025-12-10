import MeetupDetail from "../../components/meetups/MeetupDetail"
import { MongoClient, ObjectId} from "mongodb";
import Head from 'next/head'

function MeetupDetails(props){
    console.log(props)
return <>
 <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content='React meetup detail'/>
    </Head>
<MeetupDetail src={props.meetupData.image} title={props.meetupData.title} desc={props.meetupData.description} alt={props.meetupData.title} address={props.meetupData.address}/>

</>
}

export async function getStaticPaths() {

    const client = await MongoClient.connect(
          "mongodb+srv://Shruti:8YWnSGRcyOLd1AUc@cluster0.egi3lsf.mongodb.net/meetups?retryWrites=true&w=majority"
        );
    
        const db = client.db(); 
        const meetupsCollection = db.collection("meetups");
    
        const result = await meetupsCollection.find({},{_id: 1}).toArray();
        client.close();
    
     
    return {
        fallback: false,
        paths: result.map(meetup => ({ params: {meetupId: meetup._id.toString()}}))
       
    }
} 



export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;
    console.log(meetupId)


     const client = await MongoClient.connect(
          "mongodb+srv://Shruti:8YWnSGRcyOLd1AUc@cluster0.egi3lsf.mongodb.net/meetups?retryWrites=true&w=majority"
        );
    
        const db = client.db(); 
        const meetupsCollection = db.collection("meetups");
    
        const result = await meetupsCollection.findOne({_id: new ObjectId(meetupId)});
        client.close();
    
    return {
        props:{
            meetupData: {
                id: result._id.toString(),
                title: result.title,
                address: result.address,
                description: result.description,
                image: result.image
            }
        }
    }
}

export default MeetupDetails