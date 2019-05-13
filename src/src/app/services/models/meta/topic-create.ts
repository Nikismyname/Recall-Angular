export interface ITopicCreate {
    name: string,

    description: string,

    criteriaForBelonging: string,
    
    parentTopicId: number,
}