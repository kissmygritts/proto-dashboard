import { gql } from 'apollo-boost'

export default gql`query AllEffortsQuery {
  efforts {
    id
    effort_name
    effort_status
    effort_agency
    effort_purpose
  }
}
`
