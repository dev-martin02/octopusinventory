export function AlertMessage({ message }: { message: string }){
    return(
        message === 'update'? 
          <div role="alert" className="alert alert-info absolute top-12 w-96">
            <span>A product has been updated!!</span>
          </div> 
          : message === 'success' ?
            <div role="alert" className="alert alert-info absolute top-12 w-96">
              <span>New product has been added it!</span>
            </div> 
          : <div role="alert" className="alert alert-error absolute top-12 w-96">
              <span>There was an error</span>
              <span>{message}</span>
            </div> 
        )
}
