import { gql } from 'apollo-boost'

export const EFFORT_SELECTION_LIST_QUERY = gql`
  query {
    effortSelectionList: efforts {
      id
      effort_name
    }
  }
`
