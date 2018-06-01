import { gql } from 'apollo-boost'

export const ALL_ACTIVITIES_QUERY = gql`
  query AllActivitiesQuery {
    activities {
      id
      effort_id
      activity_name
      activity_type
      activity_start_date
      activity_duration
      activity_time_frame
      activity_description
      created_at
      updated_at
    }
  }
`
