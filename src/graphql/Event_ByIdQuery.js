import { gql } from 'apollo-boost'

export const EVENT_BY_ID_QUERY = gql`
  query ($eventId: ID!) {
  event: eventById (id: $eventId) {
    id
    event_timestamp
    event_timestamp_end
    event_type
    event_method
    x
    y
    datum
    comments
    source_app
    animals {
      id
      ind_id
      sex
      age_class
      n
      animal_status
      species {
        common_name
        species_name
      }
      marks {
        mark_type
        mark_color
        mark_id
        date_given
      }
      biometrics {
        measurement
        val
        units
      }
    }
  }
}
`
