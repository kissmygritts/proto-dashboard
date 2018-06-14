import { gql } from 'apollo-boost'

export const ALL_ENCOUNTERS_QUERY = gql`
  query {
    encounters: encounters {
      activity_id
      activity_name
      event_id
      animal_id
      species_id
      common_name
      species_name
      event_timestamp
      event_timestamp_end
      event_type
      event_method
      x
      y
      datum
      source_app
      ind_id
      sex
      age_class
      n
      animal_status
      reencounter
      observer
      comments
      grouping
      t_phylum
      t_class
      t_order
      t_family
      genus
      species
      created_at
      updated_at
    }
  }
`
