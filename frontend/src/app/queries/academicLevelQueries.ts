import gql from 'graphql-tag';



export const QUERY_ACADEMIC_LEVELS = gql`
  query AcademicLevels{
    AcademicLevels{
    id
    name
  }
  }`;


export const MUTATION_CREATE_ACADEMIC_LEVEL = gql`
    mutation createAcademicLevel(
      $name:String,
    $bac_level:String
    ){
      createAcademicLevel(name: $name, bac_level: $bac_level){
        id
        name
        bac_level
      }
    }
  `;

export const MUTATION_UPDATE_ACADEMIC_LEVEL = gql`
mutation updateAcademicLevel($id:ID!,$name:String,$bac_level:String){
  updateAcademicLevel(id:$uid,name: $name, bac_level: $bac_level){
    id
    name
    bac_level
  }
}`;

export const MUTATION_DELETE_ACADEMIC_LEVEL = gql`
mutation deleteAcademicLevel($id:ID!){
  deleteAcademicLevel(id: $id){
    id
    name
    bac_level
  }
}
`;

export const QUERY_ACADEMIC_LEVEL = gql`
    query AcademicLevelId($id:ID!) {
      AcademicLevelId(id :$id){
      id
      name
    }
  }`;