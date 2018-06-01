import { gql } from 'apollo-boost'

export const CREATE_ACTIVITY_MUTATION = gql`
  mutation CreateActivityMutation($input: ActivityInput) {
    createActivity(input: $input) {
      id
      effort_id
      activity_name
      activity_type
      activity_start_date
      activity_duration
      activity_time_frame
      activity_description
    }
  }
`
