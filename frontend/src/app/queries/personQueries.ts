import gql from 'graphql-tag';



export const QUERY_PERSONS = gql`
  query Persons{
    Persons{
    id
    first_name
    last_name
  }
  }`;


export const MUTATION_CREATE_PERSON = gql`
    mutation createPerson($first_name:String,$last_name:String){
      createPerson(first_name: $first_name, last_name: $last_name){
        id
        first_name
        last_name
      }
    }
  `;

export const MUTATION_UPDATE_PERSON = gql`
mutation updatePerson($id:ID!,$first_name:String,$last_name:String){
  updatePerson(id:$id,first_name: $first_name, last_name: $last_name){
    id
    first_name
    last_name
  }
}`;

export const MUTATION_DELETE_PERSON = gql`
mutation deletePerson($id:ID!){
  deletePerson(id: $id){
    id
    first_name
    last_name
  }
}
`;

export const QUERY_PERSON = gql`
    query PersonId($id:ID!) {
      PersonId(id :$id){
      id
      first_name
      last_name
    }
  }`;