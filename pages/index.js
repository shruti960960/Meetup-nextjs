import MeetupList from "../components/meetups/MeetupList"
import Head from 'next/head'
import { MongoClient } from "mongodb"



function HomePage(props){

const meetups = props.meetups || []
    

    return <>
    <Head>
        <title>React Meetups</title>
        <meta name="description" content='Browse a list of active React meetups'/>
    </Head>
        <MeetupList meetups={meetups}/>

    </>
    
    
}

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }
export async function getStaticProps(){


    const client = await MongoClient.connect(
      "mongodb+srv://Shruti:8YWnSGRcyOLd1AUc@cluster0.egi3lsf.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const db = client.db(); 
    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.find().toArray();
    client.close();

 


    return {
        props: {
            meetups: result.map(meetup => ({
                title: meetup.title,
                image: meetup.image,
                address: meetup.address,
                id: meetup._id.toString()
            }))
        },
        revalidate: 10
    };
}

export default HomePage