import { gql } from 'apollo-boost'

// export const ALL_EFFORTS_QUERY = gql`query AllEffortsQuery {
//   efforts {
//     id
//     effort_name
//     effort_status
//     effort_agency
//     effort_purpose
//   }
// }
// `

export const ALL_EFFORTS_QUERY = gql`
  query AllEffortsQuery {
    efforts {
      id
      effort_name
      effort_status
      effort_purpose
      effort_agency
      activities {
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
  }
`
