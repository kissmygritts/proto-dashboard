import { gql } from 'apollo-boost'

export const ALL_SPECIES_QUERY = gql`
  query {
    species {
      id
      grouping
      genus
      common_name
      species_name
    }
  }
`
