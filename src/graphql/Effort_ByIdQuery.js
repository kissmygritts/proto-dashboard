import { gql } from 'apollo-boost'

export const EFFORT_BY_ID_QUERY = gql`
  query GetEffort($effortId: ID!) {
    effortById(id: $effortId) {
      id
      effort_name
      effort_status
      effort_purpose
      effort_agency
      created_at
      updated_at
      activities {
        id
        activity_name
        activity_type
        activity_start_date
        activity_duration
        activity_time_frame
        activity_description
      }
    }
  }
`
