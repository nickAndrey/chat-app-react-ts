export function useChat() {
  /**
   * before all steps system will have to authenticate user, and fetch all related rooms
   *
   * 1. user will have to create a new room
   * 2. system have to check if room exists
   * 3. if room exist - load message for active room and establish connection with socket
   * 4. if room does not exist - create a new room and establish connection with socket
   * 5. client will send messages using post requests, server will create a message and then trigger the socket to return a new message
   * 6. system will check user messages and other's users messages to render user messages on the right side of chat and rest messages on the left
   */
  // useEffect(() => {
  //   const socket = io('http://localhost:3000');
  //   socket.connect();
  //   // socket.emit("joinRoom", roomId);
  //   socket.on('newMessage', (message) => {
  //     console.log('📨 New message received:', message);
  //   });
  //   return () => {
  //     socket.off('newMessage');
  //     socket.disconnect();
  //   };
  // }, []);
  // return { messages, sendMessage };
}
