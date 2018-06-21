import { gql } from 'apollo-boost'

// export const BULK_UPLOAD_MUTATION = gql`
//   mutation BulkUploads (
//     $events: [EventInput],
//     $animals: [AnimalInput]
//   ) {
//     bulkEvent: batchCreateEvent (input: $events) {
//       id
//       event_timestamp
//     }

//     bulkAnimal: batchCreateAnimal (input: $animals) {
//       id
//       event_id
//       ind_id
//     }
//   }
// `

export const BULK_UPLOAD_MUTATION = gql`
  mutation BulkUploads (
    $events: [EventInput],
    $animals: [AnimalInput],
    $labids: [LabidInput],
    $marks: [MarkInput],
    $biometrics: [BiometricInput]
  ) {
    bulkEncounter: batchCreateEncounters (
      events: $events,
      animals: $animals,
      labids: $labids,
      biometrics: $biometrics
      marks: $marks
    ) {
      ind_id
    }
  }
`
