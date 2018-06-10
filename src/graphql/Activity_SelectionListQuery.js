import { gql } from 'apollo-boost'

export const ACTIVITY_SELECTION_LIST_QUERY = gql`
  query AllActivitiesQuery {
    activitySelectionList: activities {
      id
      effort_id
      activity_name
    }
  }
`
