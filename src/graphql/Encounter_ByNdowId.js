import { gql } from 'apollo-boost'

export const ENCOUNTER_BY_NDOWID_QUERY = gql`
  query ($ndowId: Int!) {
    encounters: encountersByNdowId(ndowId: $ndowId) {
      animal_id
      activity_id
      activity_name
      event_id
      event_timestamp
      event_type
      event_method
      x
      y
      source_app
      ind_id
      sex
      age_class
      ind_id
      animal_status
      reencounter
      comments
      common_name
      species_name
      grouping
      created_at
      updated_at
      labids {
        labid
      }
      biometrics {
        measurement
        val
      }
      marks {
        mark_color
        mark_id
      }
    }
  }
`
