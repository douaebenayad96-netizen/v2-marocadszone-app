import { Grid } from 'react-loader-spinner'

const PageLoader = () => {
  return (
    <Grid
      height="50"
      width="50"
      ariaLabel="grid-loading"
      radius="12.5"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      color="#005187"
    />
  )
}

export default PageLoader