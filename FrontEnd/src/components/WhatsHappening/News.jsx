const News = (props) => {

    return (
        
        <div className="newsCard"> 
                    
            <p data-testid="headline-title" className='headline-title'> 
            {props.headline} </p>
     

        </div>
    )
}

export default News;