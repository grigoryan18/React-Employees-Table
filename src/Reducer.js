export default function reducer (state, action) {
  switch (action.type) {
    case "CREATE_EMPLOYEE":
      return {
        person: [...state.person, action.payload]
      }
    case "DELETE_EMPLOYEE":
      return {
        ...state,
        person: state.person.filter(item => item?.id !== action.payload)
      }
  }
}