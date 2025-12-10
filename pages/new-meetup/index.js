import NewMeetupForm from '../../components/meetups/NewMeetupForm'
import {useRouter} from 'next/router'
import Head from 'next/head'

function NewMeetup(){

    const router = useRouter();

    async function addMeetupHandler(enteredMeetupdata){
        const response = await fetch('/api/new-meetup',{
            method: 'POST',
            body: JSON.stringify(enteredMeetupdata),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        // console.log('res', response)
        const data = await response.json()
        console.log(data)

        router.push('/')
    }

    return <>
    <Head>
        <title>Add a new Meetup</title>
        <meta name="description" content='Add your own React meetups'/>
    </Head>
    <NewMeetupForm onAddMeetup={addMeetupHandler}/>
    </>
    
}


export default NewMeetup