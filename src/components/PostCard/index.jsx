import './styles.css';

export const PostCard = ({ title, body, id, cover }) => (
    //const { post } = props; one way

    < div className='post' >
        <img src={cover} alt={title} />
        <strong className='red'>The foto it is gonna be here</strong>
        <div className='post-content'>
            <h2>{title}</h2>
            <p>{body}</p>
        </div>
    </div >
);
