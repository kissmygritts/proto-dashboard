import { gql } from 'apollo-boost'

export const ACTIVITY_BY_ID_QUERY = gql`
  query ($activityId: ID!) {
  activity: activityById (id: $activityId) {
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
      encounters {
        ind_id
        common_name
        species_name
        event_timestamp
        event_type
        x
        y
        datum
        sex
        age_class
        n
        animal_status
        reencounter
      }
    }
  }
`
