import { Discuss } from 'react-loader-spinner'

const ChatLoader = () => {
  return (
    <Discuss
      visible={true}
      height="80"
      width="80"
      ariaLabel="discuss-loading"
      wrapperStyle={{}}
      wrapperClass="discuss-wrapper"
      colors={["#005187", "#4d82bc"]}
    />
  )
}

export default ChatLoader