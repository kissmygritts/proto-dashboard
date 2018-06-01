import { gql } from 'apollo-boost'

export const CREATE_EFFORT_MUTATION = gql`
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
