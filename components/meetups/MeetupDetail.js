

import classes from './MeetupDetail.module.css'

function MeetupDetail(props){
    console.log("Meetupdetail",props)
    return <section className={classes.detail}>
        <img src={props.src} alt={props.alt}/>
        <h1>{props.title}</h1>
        <address>{props.address}</address>
        <p>{props.desc}</p>
    </section>
}


export default MeetupDetail