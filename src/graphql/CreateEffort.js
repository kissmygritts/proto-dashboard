import { gql } from 'apollo-boost'

export default gql`
  mutation CreateEffort ($input: EffortInput!) {
    createEffort(input: $input) {
      id
      effort_name
      effort_status
      effort_agency
      effort_purpose
    }
  }
`
